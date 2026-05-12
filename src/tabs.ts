export function initTabs(): void {
    const tabLinks  = document.querySelectorAll<HTMLAnchorElement>('.page-tab');
    const filterBar = document.getElementById('projects-filter-bar');

    if (!tabLinks.length) return;

    tabLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const target = link.dataset.tab ?? '';

            tabLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            const projectsPanel  = document.getElementById('tab-projects');
            const altschoolPanel = document.getElementById('tab-altschool');

            if (projectsPanel)  projectsPanel.hidden  = target !== 'projects';
            if (altschoolPanel) altschoolPanel.hidden  = target !== 'altschool';
            if (filterBar)      filterBar.hidden       = target !== 'projects';
        });
    });
}
