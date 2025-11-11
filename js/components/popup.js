class Popup {
    constructor() {
        this.detailsPopup = document.getElementById("detailsPopup");
        this.popupOverlay = document.getElementById("popupOverlay");
        this.popupTitle = document.getElementById("popupTitle");
        this.popupDescription = document.getElementById("popupDescription");
        this.popupGallery = document.getElementById("popupGallery");
        this.popupClose = document.getElementById("popupClose");
        
        this.init();
    }
  
    init() {
        if (!this.popupClose || !this.popupOverlay) return;
        
        this.popupClose.addEventListener('click', () => this.closePopup());
        this.popupOverlay.addEventListener('click', () => this.closePopup());
    }
  
    openPopup(project) {
        if (!this.detailsPopup) return;
        
        // Preenche os dados do projeto no popup
        this.popupTitle.textContent = `${project.title} - ${project.subtitle}`;
        this.popupDescription.innerHTML = `<p>${project.description}</p>`;
        
        this.popupGallery.innerHTML = "";
        project.galleryImages.forEach(imageUrl => {
            const galleryItem = document.createElement("div");
            galleryItem.className = "gallery-item";
            
            const img = document.createElement("img");
            img.src = imageUrl;
            img.alt = `${project.title} gallery image`;
            
            galleryItem.appendChild(img);
            this.popupGallery.appendChild(galleryItem);
        });
        
        // Ativa o popup e bloqueia scroll da página
        this.detailsPopup.classList.add("open");
        this.popupOverlay.classList.add("active");
        document.body.style.overflow = "hidden";
    }
  
    closePopup() {
        if (!this.detailsPopup) return;
        
        // Fecha popup e restaura scroll
        this.detailsPopup.classList.remove("open");
        this.popupOverlay.classList.remove("active");
        document.body.style.overflow = "";
    }
  }
  
  window.PopupManager = new Popup();