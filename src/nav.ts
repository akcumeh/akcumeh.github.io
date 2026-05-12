export function initNav(): void {
    const hamburger = document.querySelector<HTMLButtonElement>('.nav-hamburger');
    const sheet     = document.getElementById('nav-sheet');
    const navEl     = document.querySelector<HTMLElement>('nav');
    const hero      = document.querySelector<HTMLElement>('.hero, .page-hero');

    // reveal the brand name once the hero scrolls out of view
    if (navEl && hero) {
        const observer = new IntersectionObserver(
            ([entry]) => navEl.classList.toggle('scrolled', !entry.isIntersecting),
            { threshold: 0 },
        );
        observer.observe(hero);
    } else if (navEl) {
        // no hero on this page — always show the name
        navEl.classList.add('scrolled');
    }

    if (!hamburger || !sheet) return;

    function open(): void {
        sheet!.classList.add('open');
        hamburger!.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    }

    function close(): void {
        sheet!.classList.remove('open');
        hamburger!.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    // toggle on hamburger click
    hamburger.addEventListener('click', () => {
        hamburger.getAttribute('aria-expanded') === 'true' ? close() : open();
    });

    // close when any sheet link is tapped (hash links scroll without a page load)
    sheet.querySelectorAll('a').forEach(a => a.addEventListener('click', close));

    // close on Escape
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') close();
    });

    // close on backdrop tap (tapping the dark overlay behind the links)
    sheet.addEventListener('click', e => {
        if (e.target === sheet) close();
    });
}
