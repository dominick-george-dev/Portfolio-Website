// Previous/next buttons for every .gallery-wrap on the page.
// Slides snap into place via CSS scroll-snap, so each click moves one slide.
document.querySelectorAll('.gallery-wrap').forEach((wrap) => {
    const gallery = wrap.querySelector('.gallery');
    const back = wrap.querySelector('.carousel-btn--prev');
    const next = wrap.querySelector('.carousel-btn--next');
    if (!gallery || !back || !next) {
        return;
    }

    const step = () => gallery.clientWidth;
    back.addEventListener('click', () => gallery.scrollBy({ left: -step(), behavior: 'smooth' }));
    next.addEventListener('click', () => gallery.scrollBy({ left: step(), behavior: 'smooth' }));
});
