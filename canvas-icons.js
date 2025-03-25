document.addEventListener('DOMContentLoaded', function() {
    // Configuration
    const iconCount = 30; // Number of icons to create
    const iconTypes = ['circle', 'square', 'triangle', 'star', 'dot'];
    const iconSizes = [3, 5, 7, 10, 15]; // Different possible sizes
    
    // Create canvas container
    const canvasContainer = document.createElement('div');
    canvasContainer.className = 'canvas-icons-container';
    canvasContainer.style.position = 'absolute';
    canvasContainer.style.top = '0';
    canvasContainer.style.left = '0';
    canvasContainer.style.width = '100%';
    canvasContainer.style.height = '100%';
    canvasContainer.style.pointerEvents = 'none'; // Make it non-interactive
    canvasContainer.style.zIndex = '1'; // Place behind content
    canvasContainer.style.overflow = 'hidden';
    document.body.appendChild(canvasContainer);
    
    // Create canvas element
    const canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvasContainer.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    
    // Array to store icon objects
    const icons = [];
    
    // Function to get theme colors
    function getThemeColors() {
        const theme = document.documentElement.getAttribute('data-theme') || 'dark';
        if (theme === 'dark') {
            return {
                primary: '#ffffff',
                secondary: '#ffd700',
                accent: '#ff69b4',
                background: 'rgba(255, 255, 255, 0.1)'
            };
        } else {
            return {
                primary: '#000000',
                secondary: '#ff69b4',
                accent: '#00bcd4',
                background: 'rgba(0, 0, 0, 0.1)'
            };
        }
    }
    
    // Create random icons
    function createIcons() {
        icons.length = 0; // Clear existing icons
        const colors = getThemeColors();
        
        for (let i = 0; i < iconCount; i++) {
            const type = iconTypes[Math.floor(Math.random() * iconTypes.length)];
            const size = iconSizes[Math.floor(Math.random() * iconSizes.length)];
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const color = [
                colors.primary,
                colors.secondary,
                colors.accent,
                colors.background
            ][Math.floor(Math.random() * 4)];
            
            const speed = 0.2 + Math.random() * 0.5;
            const direction = Math.random() * Math.PI * 2;
            const opacity = 0.1 + Math.random() * 0.5;
            
            icons.push({
                type,
                size,
                x,
                y,
                color,
                speed,
                direction,
                opacity,
                rotation: 0,
                rotationSpeed: (Math.random() - 0.5) * 0.02
            });
        }
    }
    
    // Draw a single icon
    function drawIcon(icon) {
        ctx.save();
        ctx.globalAlpha = icon.opacity;
        ctx.translate(icon.x, icon.y);
        ctx.rotate(icon.rotation);
        
        ctx.fillStyle = icon.color;
        
        switch(icon.type) {
            case 'circle':
                ctx.beginPath();
                ctx.arc(0, 0, icon.size, 0, Math.PI * 2);
                ctx.fill();
                break;
                
            case 'square':
                ctx.fillRect(-icon.size/2, -icon.size/2, icon.size, icon.size);
                break;
                
            case 'triangle':
                ctx.beginPath();
                ctx.moveTo(0, -icon.size);
                ctx.lineTo(icon.size, icon.size);
                ctx.lineTo(-icon.size, icon.size);
                ctx.closePath();
                ctx.fill();
                break;
                
            case 'star':
                drawStar(0, 0, 5, icon.size/2, icon.size);
                ctx.fill();
                break;
                
            case 'dot':
                ctx.beginPath();
                ctx.arc(0, 0, icon.size/2, 0, Math.PI * 2);
                ctx.fill();
                break;
        }
        
        ctx.restore();
    }
    
    // Helper function to draw a star
    function drawStar(cx, cy, spikes, innerRadius, outerRadius) {
        let rot = Math.PI / 2 * 3;
        let x = cx;
        let y = cy;
        let step = Math.PI / spikes;

        ctx.beginPath();
        ctx.moveTo(cx, cy - outerRadius);
        
        for (let i = 0; i < spikes; i++) {
            x = cx + Math.cos(rot) * outerRadius;
            y = cy + Math.sin(rot) * outerRadius;
            ctx.lineTo(x, y);
            rot += step;

            x = cx + Math.cos(rot) * innerRadius;
            y = cy + Math.sin(rot) * innerRadius;
            ctx.lineTo(x, y);
            rot += step;
        }
        
        ctx.lineTo(cx, cy - outerRadius);
        ctx.closePath();
    }
    
    // Update icon positions
    function updateIcons() {
        icons.forEach(icon => {
            // Move in direction
            icon.x += Math.cos(icon.direction) * icon.speed;
            icon.y += Math.sin(icon.direction) * icon.speed;
            
            // Rotate
            icon.rotation += icon.rotationSpeed;
            
            // Wrap around screen
            if (icon.x < -icon.size) icon.x = canvas.width + icon.size;
            if (icon.x > canvas.width + icon.size) icon.x = -icon.size;
            if (icon.y < -icon.size) icon.y = canvas.height + icon.size;
            if (icon.y > canvas.height + icon.size) icon.y = -icon.size;
        });
    }
    
    // Main animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        updateIcons();
        icons.forEach(drawIcon);
        requestAnimationFrame(animate);
    }
    
    // Handle window resize
    function handleResize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    // Handle theme changes
    function handleThemeChange() {
        createIcons(); // Recreate icons with new theme colors
    }
    
    // Initialize
    createIcons();
    animate();
    
    // Event listeners
    window.addEventListener('resize', handleResize);
    
    // Listen for theme changes
    document.querySelector('.theme svg').addEventListener('click', () => {
        // The theme is changed in script.js, we just need to update our icons
        setTimeout(handleThemeChange, 50); // Small delay to ensure theme has changed
    });
});