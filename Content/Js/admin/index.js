const btnDashboards = $$('.btn-dashboard');

btnDashboards.forEach((button) => {
    button.addEventListener('click', () => {
        const ulElement = button.nextElementSibling;
        const btnDashboardsIcon = button.querySelector('i');

        if (ulElement && ulElement.tagName.toLowerCase() === 'ul') {
            RootTypeClass.class('toggle', ulElement, 'active');
            RootTypeClass.class('toggle', btnDashboardsIcon, 'fa-angle-down');
            RootTypeClass.class('toggle', btnDashboardsIcon, 'fa-angle-up');
        };
    });
});
