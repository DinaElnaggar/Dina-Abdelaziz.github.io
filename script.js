const header = document.querySelector('[data-header]');
const navToggle = document.querySelector('[data-nav-toggle]');
const navMenu = document.querySelector('[data-nav-menu]');
const navLinks = [...document.querySelectorAll('.nav-link')];
const sections = [...document.querySelectorAll('main section[id]')];
const revealItems = [...document.querySelectorAll('.reveal')];
const backToTop = document.querySelector('[data-back-to-top]');

function setMenu(open) {
    if (!navToggle || !navMenu) return;

    navToggle.classList.toggle('is-active', open);
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
    navMenu.classList.toggle('is-open', open);
    document.body.classList.toggle('nav-open', open);
}

function updateHeader() {
    const isScrolled = window.scrollY > 24;
    header?.classList.toggle('is-scrolled', isScrolled);
    backToTop?.classList.toggle('is-visible', window.scrollY > 420);
}

function updateActiveLink() {
    const activeSection = sections
        .filter((section) => window.scrollY >= section.offsetTop - 140)
        .pop();

    navLinks.forEach((link) => {
        link.classList.toggle('active', activeSection && link.hash === `#${activeSection.id}`);
    });
}

function initReveal() {
    if (!('IntersectionObserver' in window)) {
        revealItems.forEach((item) => item.classList.add('is-visible'));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    });

    revealItems.forEach((item) => observer.observe(item));
}

navToggle?.addEventListener('click', () => {
    setMenu(!navMenu.classList.contains('is-open'));
});

navLinks.forEach((link) => {
    link.addEventListener('click', () => setMenu(false));
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        setMenu(false);
    }
});

window.addEventListener('scroll', () => {
    updateHeader();
    updateActiveLink();
}, { passive: true });

backToTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

updateHeader();
updateActiveLink();
initReveal();
