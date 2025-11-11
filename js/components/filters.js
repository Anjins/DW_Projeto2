class Filters {
    constructor() {
        this.selectedFilters = ["All"];
        this.filtersGrid = document.getElementById("filtersGrid");
    }
  
    init() {
        this.render();
    }
  
    render() {
        if (!this.filtersGrid) return;
        
        this.filtersGrid.innerHTML = "";
        filterOptions.forEach(filter => {
            const btn = document.createElement("button");
            btn.className = "filter-btn";
            btn.textContent = filter;
            if (this.selectedFilters.includes(filter)) btn.classList.add("active");
            btn.addEventListener("click", () => this.toggle(filter));
            this.filtersGrid.appendChild(btn);
        });
    }
  
    toggle(filter) {
        if (filter === "All") {

            this.selectedFilters = ["All"];
        } else {

            if (this.selectedFilters.includes("All")) {
                this.selectedFilters = [];
            }

            this.selectedFilters = this.selectedFilters.includes(filter)
                ? this.selectedFilters.filter(f => f !== filter)
                : [...this.selectedFilters, filter];

            if (this.selectedFilters.length === 0) this.selectedFilters = ["All"];
        }
        this.render();
  
        // Notifica o ProjectsManager para atualizar a exibição dos projetos
        if (window.ProjectsManager) {
            window.ProjectsManager.render();
        }
    }
  
    getSelected() {
        return this.selectedFilters;
    }
  }

  window.FiltersManager = new Filters();