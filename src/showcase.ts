export function initShowcase(): void {
    const track = document.getElementById('work-track');
    if (!track) return;

    const cards = Array.from(track.children) as HTMLElement[];
    if (cards.length < 2) return;

    // clone the edge cards so scrolling past either end wraps seamlessly;
    // clones are aria-hidden so screen readers only announce the real cards
    const firstClone = cards[0].cloneNode(true) as HTMLElement;
    const lastClone  = cards[cards.length - 1].cloneNode(true) as HTMLElement;
    [firstClone, lastClone].forEach(c => c.setAttribute('aria-hidden', 'true'));
    track.append(firstClone);
    track.prepend(lastClone);

    const step = () => cards[0].offsetWidth + parseFloat(getComputedStyle(track).gap);
    // one full set of real cards; jumping by this lands on identical pixels
    const period = () => cards.length * step();

    // start one card in, on the first real card
    track.scrollLeft = step();

    track.addEventListener('scroll', () => {
        const max = track.scrollWidth - track.clientWidth;
        if (track.scrollLeft <= 1) track.scrollLeft += period();
        else if (track.scrollLeft >= max - 1) track.scrollLeft -= period();
    });

    const behavior: ScrollBehavior =
        matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';

    document.querySelector('.work-nav.next')?.addEventListener('click', () => {
        track.scrollBy({ left: step(), behavior });
    });
    document.querySelector('.work-nav.prev')?.addEventListener('click', () => {
        track.scrollBy({ left: -step(), behavior });
    });
}
