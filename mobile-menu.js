// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    // Create mobile menu toggle button
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelector('.nav-links');
    
    const mobileMenuToggle = document.createElement('div');
    mobileMenuToggle.className = 'mobile-menu-toggle';
    mobileMenuToggle.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;
    
    // Insert toggle button before the nav-brand
    navbar.insertBefore(mobileMenuToggle, navbar.firstChild);
    
    // Toggle menu on click
    mobileMenuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            mobileMenuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideMenu = navLinks.contains(event.target);
        const isClickOnToggle = mobileMenuToggle.contains(event.target);
        
        if (!isClickInsideMenu && !isClickOnToggle && navLinks.classList.contains('active')) {
            mobileMenuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
    
    // Adjust language selector position on mobile
    const languageSelector = document.querySelector('.language-selector');
    if (languageSelector) {
        const mediaQuery = window.matchMedia('(max-width: 768px)');
        
        function handleScreenChange(e) {
            if (e.matches) {
                // Move language selector to a better position on mobile
                navLinks.appendChild(languageSelector);
            } else {
                // Move it back to original position on desktop
                const themeToggle = document.querySelector('.theme');
                navLinks.insertBefore(languageSelector, themeToggle);
            }
        }
        
        // Initial check
        handleScreenChange(mediaQuery);
        
        // Add listener for changes
        mediaQuery.addEventListener('change', handleScreenChange);
    }
});