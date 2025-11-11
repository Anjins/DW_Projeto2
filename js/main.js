document.addEventListener('DOMContentLoaded', async () => {
    if (window.NavigationManager) {
        window.NavigationManager.init();
    }
    
    if (document.getElementById('projectsGrid')) {
        console.log('A inicializar página de projetos');
        
        if (window.FiltersManager) {
            window.FiltersManager.init();
        }
        
        if (window.ProjectsManager) {
            await window.ProjectsManager.init();
        }
        
        if (window.PopupManager) {
            window.PopupManager.init();
        }
    }
});
