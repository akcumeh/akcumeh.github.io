export function initFilter(): void {
    const grid     = document.getElementById('projects-grid');
    const countEl  = document.getElementById('count-num');
    const buttons  = document.querySelectorAll<HTMLButtonElement>('.filter-btn');

    if (!grid || !countEl || !buttons.length) return;

    function applyFilter(filter: string): void {
        const cards  = grid!.querySelectorAll<HTMLElement>('article.proj-card');
        const groups = grid!.querySelectorAll<HTMLElement>('[data-group]');

        let visible = 0;

        // show / hide cards
        cards.forEach(card => {
            const cats    = (card.dataset.cat ?? '').split(' ');
            const isArchive = cats.includes('archive');
            const show    = filter === 'all' || cats.includes(filter);

            card.hidden = !show;

            if (show) visible++;
        });

        countEl!.textContent = String(visible);

        // hide group-head rows whose section has no visible cards; update count pills
        groups.forEach(group => {
            let sibling = group.nextElementSibling as HTMLElement | null;
            let hasVisible = false;
            let groupCount = 0;

            while (sibling && !sibling.hasAttribute('data-group')) {
                if (sibling.tagName === 'ARTICLE' && !sibling.hidden) {
                    hasVisible = true;
                    groupCount++;
                }
                sibling = sibling.nextElementSibling as HTMLElement | null;
            }

            group.hidden = !hasVisible;

            const pill = group.querySelector<HTMLElement>('.count-pill');
            if (pill) pill.textContent = String(groupCount);
        });
    }

    // compute count on load so it's never shown as 0
    applyFilter('all');

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            applyFilter(btn.dataset.filter ?? 'all');
        });
    });
}
