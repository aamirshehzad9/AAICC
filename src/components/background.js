/**
 * Background Animation Controller
 * Initializes and manages animated glassmorphism spheres
 */

export function initBackground() {
  // Create background container
  const container = document.createElement('div');
  container.className = 'background-container';
  
  // Create gradient overlay
  const overlay = document.createElement('div');
  overlay.className = 'gradient-overlay';
  
  // Create three animated spheres
  const sphere1 = document.createElement('div');
  sphere1.className = 'glassmorphism-sphere sphere-1';
  
  const sphere2 = document.createElement('div');
  sphere2.className = 'glassmorphism-sphere sphere-2';
  
  const sphere3 = document.createElement('div');
  sphere3.className = 'glassmorphism-sphere sphere-3';
  
  // Append spheres to container
  container.appendChild(sphere1);
  container.appendChild(sphere2);
  container.appendChild(sphere3);
  container.appendChild(overlay);
  
  // Insert at the beginning of body
  document.body.insertBefore(container, document.body.firstChild);
  
  // Add parallax effect on scroll (optional)
  let ticking = false;
  
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        
        sphere1.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        sphere2.style.transform = `translateY(${scrolled * parallaxSpeed * 0.7}px)`;
        sphere3.style.transform = `translateY(${scrolled * parallaxSpeed * 0.3}px)`;
        
        ticking = false;
      });
      
      ticking = true;
    }
  });
  
  console.log('✨ Glassmorphism background initialized');
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initBackground);
} else {
  initBackground();
}
