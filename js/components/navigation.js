class Navigation {
    constructor() {
        this.bottomNavWrapper = document.querySelector('.bottom-nav-wrapper');
        this.bottomNav = document.getElementById("bottomNav");
        this.navToggle = document.getElementById("navToggle");
    }

    init() {
        this.initBottomNav();
        
        // Só aplica o hide no topo na homepage
        if (this.isHomepage()) {
            this.initHomepageTopHide();
        }
    }

    isHomepage() {
        // Detecta homepage pela presença de sections específicas
        const hasHomeHero = document.querySelector('.home-hero') !== null;
        const hasAboutSection = document.querySelector('.about-section') !== null;
        return hasHomeHero || hasAboutSection;
    }

    initBottomNav() {
        if (!this.bottomNav || !this.navToggle) return;
        
        this.navToggle.addEventListener("click", e => {
            e.stopPropagation();
            this.bottomNav.classList.toggle("expanded");
        });
        
        document.addEventListener("click", e => {
            if (!this.bottomNav.contains(e.target)) {
                this.bottomNav.classList.remove("expanded");
            }
        });
    }

    initHomepageTopHide() {
        if (!this.bottomNavWrapper) return;

        const updateNavbar = () => {
            const scrolled = window.scrollY;
            
            if (scrolled <= 10) {
                this.bottomNavWrapper.classList.add("hidden");
            } else {
                this.bottomNavWrapper.classList.remove("hidden");
            }
        };

        window.addEventListener("scroll", updateNavbar);
        updateNavbar();
    }
}

window.NavigationManager = new Navigation();