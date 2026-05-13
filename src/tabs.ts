const TAB_KEY = 'projects-active-tab';

function activateTab(target: string, tabLinks: NodeListOf<HTMLAnchorElement>, filterBar: HTMLElement | null): void {
    const projectsPanel  = document.getElementById('tab-projects');
    const altschoolPanel = document.getElementById('tab-altschool');

    tabLinks.forEach(l => l.classList.remove('active'));
    const match = Array.from(tabLinks).find(l => l.dataset.tab === target);
    if (match) match.classList.add('active');

    if (projectsPanel)  projectsPanel.hidden  = target !== 'projects';
    if (altschoolPanel) altschoolPanel.hidden  = target !== 'altschool';
    if (filterBar)      filterBar.hidden       = target !== 'projects';
}

export function initTabs(): void {
    const tabLinks  = document.querySelectorAll<HTMLAnchorElement>('.page-tab');
    const filterBar = document.getElementById('projects-filter-bar');

    if (!tabLinks.length) return;

    // restore last visited tab (default to 'projects')
    const saved = localStorage.getItem(TAB_KEY) ?? 'projects';
    activateTab(saved, tabLinks, filterBar);

    tabLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const target = link.dataset.tab ?? 'projects';
            activateTab(target, tabLinks, filterBar);
            localStorage.setItem(TAB_KEY, target);
        });
    });
}
