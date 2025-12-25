/**
 * Dashboard Slideshow with Animated Numbers
 * Auto-play carousel with counting animations
 */

let currentSlide = 1;
const totalSlides = 5;
let slideInterval;

// Initialize slideshow when DOM is ready
function initDashboardSlideshow() {
  // Check if slideshow exists
  const slideshow = document.querySelector('.dashboard-slideshow');
  if (!slideshow) return;
  
  // Start auto-play
  startSlideshow();
  
  // Setup dot navigation
  setupDotNavigation();
  
  // Animate first slide
  const firstSlide = document.querySelector('.slide.active');
  if (firstSlide) {
    animateSlideNumbers(firstSlide);
  }
}

// Start auto-play slideshow
function startSlideshow() {
  slideInterval = setInterval(() => {
    nextSlide();
  }, 5000); // Change slide every 5 seconds
}

// Next slide
function nextSlide() {
  currentSlide = currentSlide >= totalSlides ? 1 : currentSlide + 1;
  showSlide(currentSlide);
}

// Show specific slide
function showSlide(slideNumber) {
  // Update slides
  const slides = document.querySelectorAll('.slide');
  slides.forEach((slide, index) => {
    slide.classList.remove('active', 'prev');
    if (index + 1 === slideNumber) {
      slide.classList.add('active');
      // Animate numbers when slide becomes active
      setTimeout(() => animateSlideNumbers(slide), 100);
    } else if (index + 1 < slideNumber) {
      slide.classList.add('prev');
    }
  });
  
  // Update dots
  const dots = document.querySelectorAll('.dot');
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index + 1 === slideNumber);
  });
  
  // Update slide indicator
  const slideNumberEl = document.querySelector('.slide-number');
  if (slideNumberEl) {
    slideNumberEl.textContent = slideNumber;
  }
  
  currentSlide = slideNumber;
}

// Animate numbers counting up
function animateSlideNumbers(slide) {
  // Animate stat values
  const statValues = slide.querySelectorAll('[data-target]');
  statValues.forEach(element => {
    const target = parseInt(element.dataset.target);
    animateNumber(element, 0, target, 1500);
  });
  
  // Animate progress bars
  const progressBars = slide.querySelectorAll('[data-progress]');
  progressBars.forEach(element => {
    const target = parseInt(element.dataset.progress);
    setTimeout(() => {
      element.style.width = target + '%';
    }, 300);
  });
}

// Number counting animation
function animateNumber(element, start, end, duration) {
  const range = end - start;
  const increment = range / (duration / 16); // 60fps
  let current = start;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= end) {
      current = end;
      clearInterval(timer);
    }
    element.textContent = Math.floor(current);
  }, 16);
}

// Setup dot navigation
function setupDotNavigation() {
  const dots = document.querySelectorAll('.dot');
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const slideNum = parseInt(dot.dataset.slide);
      // Clear and restart interval
      clearInterval(slideInterval);
      showSlide(slideNum);
      startSlideshow();
    });
  });
}

// Initialize on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initDashboardSlideshow);
} else {
  initDashboardSlideshow();
}

// Export for module usage
export { initDashboardSlideshow };
