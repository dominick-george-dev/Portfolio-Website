const responsiveMenuButton = document.getElementById('responsiveMenuToggleButton');
const navBarLinks = document.getElementById('primaryMenu');

if (responsiveMenuButton && navBarLinks) {
    const setOpen = (open) => {
        navBarLinks.classList.toggle('open', open);
        responsiveMenuButton.classList.toggle('open', open);
        responsiveMenuButton.setAttribute('aria-expanded', String(open));
    };

    responsiveMenuButton.addEventListener('click', () => {
        setOpen(!navBarLinks.classList.contains('open'));
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navBarLinks.classList.contains('open')) {
            setOpen(false);
            responsiveMenuButton.focus();
        }
    });
}
