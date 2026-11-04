(() => {
  document.querySelectorAll('[data-project-showcase]').forEach((showcase) => {
    showcase.querySelectorAll('[data-confirm-download]').forEach((link) => {
      link.addEventListener('click', (event) => {
        if (!window.confirm(`Download ${link.getAttribute('download')}?`)) event.preventDefault();
      });
    });
    const panels = [...showcase.querySelectorAll('[data-showcase-panel]')];
    if (!panels.length) return;
    const links = [...showcase.querySelectorAll('.showcase-nav a')];
    const navigation = showcase.querySelector('.showcase-nav');
    const select = showcase.querySelector('.showcase-select');
    const header = showcase.querySelector('.showcase-header');
    const sidebar = showcase.querySelector('.showcase-sidebar');

    let offset = 128;
    let frame = null;
    const pageTop = element => element.getBoundingClientRect().top + window.scrollY;

    function measure() {
      const headerBottom = header.getBoundingClientRect().bottom;
      const mobile = getComputedStyle(select).display !== 'none';
      offset = headerBottom + (mobile ? sidebar.getBoundingClientRect().height : 0);
      showcase.style.setProperty('--showcase-header-bottom', `${headerBottom}px`);
      showcase.style.setProperty('--showcase-offset', `${offset}px`);
      document.documentElement.style.setProperty('--showcase-offset', `${offset}px`);
      document.body.style.paddingTop = `${headerBottom}px`;
    }
    function highlight(index) {
      links.forEach((link, position) => {
        if (position === index) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
      select.value = panels[index].id;
      if (navigation && links[index] && getComputedStyle(navigation).display !== 'none') {
        const target = links[index].getBoundingClientRect();
        const origin = navigation.getBoundingClientRect();
        navigation.style.setProperty('--highlight-y', `${target.top - origin.top}px`);
        navigation.style.setProperty('--highlight-height', `${target.height}px`);
        navigation.classList.add('has-moving-highlight');
      }
    }
    function updateActive() {
      frame = null;
      const readingLine = window.scrollY + offset + Math.max(1, window.innerHeight - offset) / 3;
      let index = 0;
      panels.forEach((panel, position) => { if (pageTop(panel) <= readingLine) index = position; });
      highlight(index);
    }
    // Observe scrolling only. Links retain their native browser anchor behavior.
    window.addEventListener('scroll', () => {
      if (frame === null) frame = requestAnimationFrame(updateActive);
    }, { passive: true });
    select.addEventListener('change', () => {
      if (panels.some(panel => panel.id === select.value)) location.hash = select.value;
    });
    window.addEventListener('resize', () => { measure(); updateActive(); });
    measure();
    if ('ResizeObserver' in window) new ResizeObserver(() => { measure(); updateActive(); }).observe(header);

    updateActive();
  });
})();
