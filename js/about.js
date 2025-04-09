// Animated stats counter
function animateStats() {
    const statItems = document.querySelectorAll('.stat-item');
    
    statItems.forEach(item => {
      const numberElement = item.querySelector('.stat-number');
      const target = parseInt(numberElement.getAttribute('data-count'));
      const duration = 2000; // Animation duration in ms
      const start = 0;
      const increment = target / (duration / 16); // 60fps
      
      let current = start;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          clearInterval(timer);
          current = target;
        }
        numberElement.textContent = Math.floor(current);
      }, 16);
    });
  }
  
  // Trigger stats animation when scrolled to
  function checkStats() {
    const statsSection = document.querySelector('.stats-grid');
    if (!statsSection) return;
    
    const sectionTop = statsSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (sectionTop < windowHeight - 100) {
      animateStats();
      window.removeEventListener('scroll', checkStats);
    }
  }
  
  // Initial check
  checkStats();
  
  // Check on scroll
  window.addEventListener('scroll', checkStats);