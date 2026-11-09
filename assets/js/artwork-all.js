(() => {
  const viewer = document.querySelector('[data-artwork-all]');
  if (!viewer) return;
  const photos = Array.from(viewer.querySelectorAll('[data-photo-src]'));
  const image = viewer.querySelector('[data-all-image]');
  const original = viewer.querySelector('[data-all-original]');
  const caption = viewer.querySelector('[data-all-caption]');
  const previous = viewer.querySelector('[data-all-previous]');
  const next = viewer.querySelector('[data-all-next]');
  let selected = 0;
  function show(index) {
    if (!photos.length) {
      previous.disabled = next.disabled = true;
      return;
    }
    selected = Math.max(0, Math.min(index, photos.length - 1));
    const photo = photos[selected];
    image.src = photo.dataset.photoSrc;
    image.alt = photo.dataset.photoName;
    image.hidden = original.hidden = false;
    original.href = photo.dataset.photoSrc;
    caption.textContent = `${selected + 1} / ${photos.length} — ${photo.dataset.photoName}`;
    photos.forEach((button, i) => button.setAttribute('aria-pressed', String(i === selected)));
    previous.disabled = selected === 0;
    next.disabled = selected === photos.length - 1;
  }
  photos.forEach((photo, i) => photo.addEventListener('click', () => show(i)));
  previous.addEventListener('click', () => show(selected - 1));
  next.addEventListener('click', () => show(selected + 1));
  viewer.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      show(selected + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });
  show(0);
})();
