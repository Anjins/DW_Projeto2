class CustomCursor {
    constructor() {
        // Verifica se é dispositivo touch e sai se for
        if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;
        
        this.cursor = null;
        this.mouseX = 0;
        this.mouseY = 0;
        this.prevX = 0;
        this.prevY = 0;
        this.velocityX = 0;
        this.velocityY = 0;
        this.isClicked = false;
        
        this.init();
    }
    
    init() {
        this.createCursor();
        this.setupEventListeners();
        this.animate();
    }
    
    createCursor() {
        this.cursor = document.createElement('div');
        this.cursor.className = 'custom-cursor';
        document.body.appendChild(this.cursor);
    }
    
    setupEventListeners() {
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
            
            // Calcula velocidade baseada na diferença de posições
            this.velocityX = this.mouseX - this.prevX;
            this.velocityY = this.mouseY - this.prevY;
            
            this.prevX = this.mouseX;
            this.prevY = this.mouseY;
        });
        
        document.addEventListener('mousedown', () => {
            this.isClicked = true;
            this.cursor.classList.add('clicked');
        });
        
        document.addEventListener('mouseup', () => {
            this.isClicked = false;
            this.cursor.classList.remove('clicked');
        });
    }
    
    calculateTilt() {
        // Calcula velocidade total usando distância euclidiana
        const speed = Math.sqrt(this.velocityX * this.velocityX + this.velocityY * this.velocityY);
        
        if (speed > 1) {
            // Inclinação proporcional à velocidade horizontal
            const tiltAngle = -this.velocityX * 2;
            this.cursor.style.setProperty('--tilt-angle', `${tiltAngle}deg`);
            this.cursor.classList.add('dragging');
        } else {
            this.cursor.style.setProperty('--tilt-angle', '0deg');
            this.cursor.classList.remove('dragging');
        }
    }
    
    animate() {
        if (this.cursor) {
            // Atualiza posição via CSS variables para performance
            this.cursor.style.setProperty('--pos-x', `${this.mouseX}px`);
            this.cursor.style.setProperty('--pos-y', `${this.mouseY}px`);
            this.calculateTilt();
        }
        requestAnimationFrame(this.animate.bind(this));
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.customCursor = new CustomCursor();
    });
} else {
    window.customCursor = new CustomCursor();
}
