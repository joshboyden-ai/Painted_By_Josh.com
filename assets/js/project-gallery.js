(() => {
  document.querySelectorAll('[data-project-gallery]').forEach(gallery => {
    const image = gallery.querySelector('[data-gallery-main]');
    const video = gallery.querySelector('[data-gallery-video]');
    const empty = gallery.querySelector('[data-gallery-empty]');
    const caption = gallery.querySelector('[data-gallery-caption]');
    const original = gallery.querySelector('[data-gallery-original]');
    const eraTitle = gallery.querySelector('[data-gallery-era]');
    const carousel = gallery.querySelector('[data-gallery-carousel]');
    const previous = gallery.querySelector('[data-gallery-previous]');
    const next = gallery.querySelector('[data-gallery-next]');
    const groupBanners = [...gallery.querySelectorAll('[data-gallery-group-title]')];
    const items = [...gallery.querySelectorAll('[data-gallery-photo]')];
    if (!items.length) return;
    let selection = 0;
    let current = null;

    function showNeighbor(button, item, label) {
      if (!button) return;
      const preview = button.querySelector('[data-neighbor-image]');
      const clip = button.querySelector('[data-neighbor-video]');
      const missing = button.querySelector('[data-neighbor-empty]');
      const cue = button.querySelector('[data-neighbor-cue]');
      if (cue) cue.hidden = Boolean(item);
      if (button.classList) button.classList.toggle('is-scroll-cue', !item);
      if (!item) {
        preview.hidden = true;
        preview.removeAttribute('src');
        clip.hidden = true;
        missing.hidden = true;
        const direction = label === 'Previous' ? 'right' : 'left';
        button.setAttribute('aria-label', `Scroll ${direction} to view more gallery items`);
        button.title = `Scroll ${direction}`;
        return;
      }
      const isVideo = item.dataset.mediaType === 'video';
      const src = item.dataset.previewSrc || item.dataset.photoSrc;
      preview.hidden = isVideo || !src;
      clip.hidden = !isVideo;
      missing.hidden = isVideo || Boolean(src);
      if (!isVideo && src) preview.src = src;
      else preview.removeAttribute('src');
      button.setAttribute('aria-label', `${label}: ${item.dataset.photoAlt}`);
      button.title = item.dataset.photoAlt;
    }
    function move(direction) {
      const index = items.indexOf(current);
      const target = Math.max(0, Math.min(items.length - 1, index + direction));
      if (target !== index) choose(items[target]);
    }

    function choose(item, updateUrl = true) {
      const token = ++selection;
      current = item;
      if (eraTitle) eraTitle.textContent = item.dataset.photoGroup || 'Gallery';
      groupBanners.forEach(banner => {
        if (banner.dataset.galleryGroupTitle === item.dataset.photoGroup) banner.setAttribute('aria-current', 'true');
        else banner.removeAttribute('aria-current');
      });
      const index = items.indexOf(item);
      showNeighbor(previous, items[index - 1], 'Previous');
      showNeighbor(next, items[index + 1], 'Next');
      items.forEach(button => button.setAttribute('aria-pressed', String(button === item)));
      // Stop and unload the previous clip before displaying any other item.
      video.pause();
      video.removeAttribute('src');
      video.load();
      video.hidden = true;
      image.hidden = true;
      image.removeAttribute('src');
      original.hidden = true;
      original.removeAttribute('href');
      const src = item.dataset.photoSrc;
      const isVideo = item.dataset.mediaType === 'video';
      empty.hidden = Boolean(src);
      caption.textContent = item.dataset.photoCaption;
      if (src && isVideo) {
        video.hidden = false;
        video.muted = true;
        video.playsInline = true;
        video.setAttribute('aria-label', item.dataset.photoAlt || 'Selected project video');
        video.src = src;
        original.href = src;
        video.load();
        const playing = video.play();
        if (playing && typeof playing.catch === 'function') playing.catch(error => {
          if (token !== selection || error.name === 'AbortError') return;
          if (error.name === 'NotAllowedError') {
            caption.textContent = `${item.dataset.photoCaption} — Press Play to start the video.`;
          } else {
            showVideoError();
          }
        });
      } else if (src) {
        image.alt = item.dataset.photoAlt;
        image.src = src;
        image.hidden = false;
      }
      if (updateUrl) history.replaceState(null, '', `#${item.dataset.photoId}`);
    }
    function showVideoError() {
      if (!current || current.dataset.mediaType !== 'video' || video.hidden) return;
      caption.textContent = 'This video cannot play in this browser. You can open the original file below.';
      original.hidden = false;
    }
    items.forEach(item => item.addEventListener('click', () => choose(item)));
    groupBanners.forEach(banner => banner.addEventListener('click', () => {
      const first = items.find(item => item.dataset.photoGroup === banner.dataset.galleryGroupTitle);
      if (first) choose(first);
    }));
    if (previous) previous.addEventListener('click', () => move(items.indexOf(current) === 0 ? 1 : -1));
    if (next) next.addEventListener('click', () => move(items.indexOf(current) === items.length - 1 ? -1 : 1));
    if (carousel) {
      carousel.addEventListener('keydown', event => {
        if (event.altKey || event.ctrlKey || event.metaKey || event.target.closest('video, audio, input, textarea, select')) return;
        if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
        event.preventDefault();
        move(event.key === 'ArrowRight' ? 1 : -1);
      });
      // Respond only to horizontal gestures. Vertical document scrolling stays native.
      let wheelDistance = 0;
      let wheelUsed = false;
      let wheelTimer;
      carousel.addEventListener('wheel', event => {
        if (event.ctrlKey || Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return;
        event.preventDefault();
        clearTimeout(wheelTimer);
        wheelTimer = setTimeout(() => { wheelDistance = 0; wheelUsed = false; }, 180);
        if (wheelUsed) return;
        const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? carousel.clientWidth : 1;
        wheelDistance += event.deltaX * unit;
        if (Math.abs(wheelDistance) >= 25) {
          wheelUsed = true;
          move(wheelDistance > 0 ? 1 : -1);
        }
      }, { passive: false });
      let pointerStart = null;
      carousel.addEventListener('pointerdown', event => {
        if (event.target.closest('video, button, a') || event.isPrimary === false) return;
        pointerStart = { x: event.clientX, y: event.clientY, id: event.pointerId };
      });
      carousel.addEventListener('pointerup', event => {
        if (!pointerStart || event.pointerId !== pointerStart.id) return;
        const dx = event.clientX - pointerStart.x;
        const dy = event.clientY - pointerStart.y;
        pointerStart = null;
        if (Math.abs(dx) >= 40 && Math.abs(dx) > Math.abs(dy)) move(dx < 0 ? 1 : -1);
      });
      carousel.addEventListener('pointercancel', () => { pointerStart = null; });
    }
    video.addEventListener('error', showVideoError);
    image.addEventListener('error', () => {
      if (!current || current.dataset.mediaType === 'video') return;
      image.hidden = true;
      empty.hidden = false;
      caption.textContent = 'This photo is currently unavailable.';
    });
    function followHash() {
      const selected = items.find(item => `#${item.dataset.photoId}` === location.hash);
      choose(selected || items.find(item => item.dataset.photoSrc) || items[0], false);
    }
    function fitThumbnails() {
      const collection = gallery.querySelector('.project-gallery-collection');
      if (!collection || window.innerWidth <= 900) return;
      const groups = [...collection.querySelectorAll('.project-gallery-group')];
      const width = collection.getBoundingClientRect().width;
      if (!width || !groups.length) return;
      const available = window.innerHeight - Math.max(16, collection.getBoundingClientRect().top) - 16;
      const gap = 3;
      const groupGap = 12;
      const headingHeight = groups.reduce((sum, group) => sum + group.querySelector('h2').getBoundingClientRect().height + 6, 0);
      const counts = groups.map(group => group.querySelectorAll('[data-gallery-photo]').length);
      const maxColumns = Math.max(3, Math.floor((width + gap) / (8 + gap)));
      let columns = 3;
      let thumbHeight;
      for (; columns <= maxColumns; columns++) {
        const thumbWidth = (width - gap * (columns - 1)) / columns;
        thumbHeight = (thumbWidth - 2) * .75 + 2;
        const gridHeight = counts.reduce((sum, count) => {
          const rows = Math.ceil(count / columns);
          return sum + rows * thumbHeight + Math.max(0, rows - 1) * gap;
        }, 0);
        if (headingHeight + gridHeight + (groups.length - 1) * groupGap <= available || columns === maxColumns) break;
      }
      collection.style.setProperty('--gallery-columns', String(columns));
      collection.style.setProperty('--gallery-thumb-height', `${thumbHeight}px`);
      collection.style.setProperty('--gallery-play-size', `${Math.max(7, thumbHeight * .55)}px`);
    }
    function balanceViewer() {
      const viewer = gallery.querySelector('.project-gallery-viewer');
      const stage = gallery.querySelector('.project-gallery-stage');
      const collection = gallery.querySelector('.project-gallery-collection');
      if (!viewer || !stage || !collection) return;
      if (window.innerWidth <= 900) {
        stage.style.setProperty('--gallery-stage-inset', '0px');
        stage.style.setProperty('--gallery-viewer-scale', '1');
        return;
      }
      const viewerRect = viewer.getBoundingClientRect();
      const stageRect = stage.getBoundingClientRect();
      const collectionRect = collection.getBoundingClientRect();
      const rightGap = Math.max(0, collectionRect.left - stageRect.right);
      // A negative inset may use the wide page margin on larger displays.
      const inset = rightGap - viewerRect.left;
      const originalWidth = stageRect.right - viewerRect.left;
      const scale = originalWidth > 0 ? Math.max(.1, (originalWidth - inset) / originalWidth) : 1;
      stage.style.setProperty('--gallery-stage-inset', `${inset}px`);
      stage.style.setProperty('--gallery-viewer-scale', String(scale));
    }
    function layoutGallery() { balanceViewer(); fitThumbnails(); }
    window.addEventListener('resize', layoutGallery);
    layoutGallery();
    if (document.fonts) document.fonts.ready.then(layoutGallery);
    // Leaving the page also stops playback, including browser back/forward caching.
    window.addEventListener('pagehide', () => { selection++; video.pause(); });
    window.addEventListener('hashchange', followHash);
    followHash();
  });
})();
