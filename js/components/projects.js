class Projects {
    constructor() {
        this.expandedId = null;
        this.projectsGrid = document.getElementById("projectsGrid");
        this.isInitialized = false;
    }
  
    async init() {

        if (!this.isInitialized) {
            await window.projectsDataReady;
            this.isInitialized = true;
        }
        this.render();
    }
  
    render() {
        if (!this.projectsGrid) return;
        
        this.projectsGrid.innerHTML = "";
        this.getFilteredProjects().forEach(project => {
            const card = this.createCard(project);
            this.projectsGrid.appendChild(card);
        });
    }
  
    getFilteredProjects() {

        const selected = window.FiltersManager.getSelected();
        return selected.includes("All")
            ? projects
            : projects.filter(p => selected.includes(p.subtitle));
    }
  
    createCard(project) {
        const isExpanded = this.expandedId === project.id;
        const card = document.createElement("div");
        card.className = "project-card";
        if (isExpanded) card.classList.add("expanded");
        card.dataset.projectId = project.id;
  
        const content = document.createElement("div");
        content.className = "project-card-content";
        content.addEventListener("click", () => this.toggle(project.id));
  
        const img = document.createElement("img");
        img.src = project.imageUrl;
        img.alt = project.title;
        img.className = "project-media";
        if (!isExpanded) img.classList.add("visible");
  
        const video = document.createElement("video");
        video.src = project.videoUrl;
        video.loop = true;
        video.muted = true;
        video.playsInline = true;
        video.className = "project-media";
        if (isExpanded) {
            video.classList.add("visible");
            setTimeout(() => video.play(), 100);
        }
  
        content.append(img, video);
        card.appendChild(content);
  
        const detailsBtn = document.createElement("button");
        detailsBtn.className = "project-details-btn";
        detailsBtn.textContent = "More Details";
        detailsBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            if (window.PopupManager) {
                window.PopupManager.openPopup(project);
            }
        });
        card.appendChild(detailsBtn);
  
        const info = document.createElement("div");
        info.className = "project-info";
        info.innerHTML = `
            <div class="project-title">${project.title} - ${project.subtitle}</div>
            <div class="project-year">${project.year}</div>
        `;
        card.appendChild(info);
  
        return card;
    }
  
    toggle(projectId) {
        const cards = [...document.querySelectorAll(".project-card")];
        const cardPositions = new Map();
  
        cards.forEach(c => {
            const rect = c.getBoundingClientRect();
            cardPositions.set(c, rect);
        });
  
        if (this.expandedId === projectId) this.expandedId = null;
        else this.expandedId = projectId;
  
        cards.forEach(c => {
            const id = parseInt(c.dataset.projectId);
            const img = c.querySelector("img");
            const video = c.querySelector("video");
  
            if (id === this.expandedId) {
                c.classList.add("expanded");
                img.classList.remove("visible");
                video.classList.add("visible");
                setTimeout(() => video.play(), 600);
            } else {
                c.classList.remove("expanded");
                img.classList.add("visible");
                video.classList.remove("visible");
                video.pause();
            }
        });
  
        this.animateCards(cards, cardPositions);
    }
  
    animateCards(cards, positions) {
        requestAnimationFrame(() => {
            cards.forEach(c => {
                const first = positions.get(c);
                const last = c.getBoundingClientRect();
                
                const dx = first.left - last.left;
                const dy = first.top - last.top;
                const dw = first.width / last.width;
                const dh = first.height / last.height;
  
                c.style.transformOrigin = "0 0";
                c.style.transform = `translate(${dx}px, ${dy}px) scale(${dw}, ${dh})`;
                c.style.transition = "none";
  
                requestAnimationFrame(() => {
                    c.style.transition = "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
                    c.style.transform = "translate(0, 0) scale(1, 1)";
                    setTimeout(() => {
                        c.style.transition = "";
                        c.style.transform = "";
                    }, 600);
                });
            });
        });
    }
  }
  
  window.ProjectsManager = new Projects();