document.addEventListener('DOMContentLoaded', function() {
    // Header Scroll Effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  
    // Mobile Menu with Animation
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navbar = document.querySelector('.navbar ul');
    
    mobileMenuBtn.addEventListener('click', function() {
      this.classList.toggle('active');
      navbar.classList.toggle('active');
      
      // Animate menu items
      if (navbar.classList.contains('active')) {
        const navItems = document.querySelectorAll('.navbar ul li');
        navItems.forEach((item, index) => {
          item.style.animation = `fadeInDown 0.5s ease forwards ${index * 0.1 + 0.3}s`;
        });
      }
    });
  
    // Dynamic Particle Background
    function createParticles() {
      const particlesContainer = document.createElement('div');
      particlesContainer.className = 'particles';
      document.querySelector('.hero').appendChild(particlesContainer);
      
      const particleCount = window.innerWidth < 768 ? 30 : 50;
      
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random properties
        const size = Math.random() * 5 + 2;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const delay = Math.random() * 5;
        const duration = Math.random() * 10 + 10;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.animationDelay = `${delay}s`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.opacity = Math.random() * 0.5 + 0.1;
        
        particlesContainer.appendChild(particle);
      }
      
      // Add CSS for particles
      const style = document.createElement('style');
      style.textContent = `
        @keyframes floatParticle {
          0% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-100px) translateX(20px); }
          100% { transform: translateY(0) translateX(0); }
        }
        .particle {
          position: absolute;
          background: white;
          border-radius: 50%;
          animation: floatParticle infinite ease-in-out;
          pointer-events: none;
        }
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `;
      document.head.appendChild(style);
    }
    
    if (document.querySelector('.hero')) {
      createParticles();
    }
  
    // Enhanced Testimonial Slider
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
      testimonials.forEach((testimonial, i) => {
        testimonial.style.opacity = '0';
        testimonial.style.transform = i < index ? 'translateX(-50px)' : 'translateX(50px)';
        testimonial.classList.remove('active');
        
        setTimeout(() => {
          if (i === index) {
            testimonial.style.opacity = '1';
            testimonial.style.transform = 'translateX(0)';
            testimonial.classList.add('active');
          }
        }, 50);
      });
    }
    
    prevBtn.addEventListener('click', function() {
      currentTestimonial--;
      if (currentTestimonial < 0) {
        currentTestimonial = testimonials.length - 1;
      }
      showTestimonial(currentTestimonial);
    });
    
    nextBtn.addEventListener('click', function() {
      currentTestimonial++;
      if (currentTestimonial >= testimonials.length) {
        currentTestimonial = 0;
      }
      showTestimonial(currentTestimonial);
    });
    
    // Auto-rotate testimonials with pause on hover
    let testimonialInterval = setInterval(() => {
      currentTestimonial++;
      if (currentTestimonial >= testimonials.length) {
        currentTestimonial = 0;
      }
      showTestimonial(currentTestimonial);
    }, 6000);
    
    const sliderContainer = document.querySelector('.testimonial-slider');
    sliderContainer.addEventListener('mouseenter', () => {
      clearInterval(testimonialInterval);
    });
    
    sliderContainer.addEventListener('mouseleave', () => {
      testimonialInterval = setInterval(() => {
        currentTestimonial++;
        if (currentTestimonial >= testimonials.length) {
          currentTestimonial = 0;
        }
        showTestimonial(currentTestimonial);
      }, 6000);
    });
  
    // Interactive Services Tabs with Animation
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        const tabId = this.getAttribute('data-tab');
        
        // Remove active class from all buttons and contents
        tabBtns.forEach(btn => {
          btn.classList.remove('active');
          btn.style.transform = 'scale(1)';
        });
        tabContents.forEach(content => {
          content.classList.remove('active');
          content.style.opacity = '0';
          content.style.transform = 'translateY(20px)';
        });
        
        // Add active class to clicked button and corresponding content
        this.classList.add('active');
        this.style.transform = 'scale(1.05)';
        
        const activeContent = document.getElementById(tabId);
        activeContent.classList.add('active');
        setTimeout(() => {
          activeContent.style.opacity = '1';
          activeContent.style.transform = 'translateY(0)';
        }, 50);
      });
    });
  
    // 3D Accordion Effect
    const accordionBtns = document.querySelectorAll('.accordion-btn');
    
    accordionBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        const content = this.nextElementSibling;
        const isActive = content.classList.contains('active');
        
        // Close all accordions first
        document.querySelectorAll('.accordion-content').forEach(item => {
          item.classList.remove('active');
          item.style.maxHeight = '0';
        });
        
        // Reset all buttons
        document.querySelectorAll('.accordion-btn').forEach(item => {
          item.style.backgroundColor = 'var(--light-color)';
        });
        
        // Open current one if it was closed
        if (!isActive) {
          this.style.backgroundColor = 'rgba(67, 97, 238, 0.1)';
          content.classList.add('active');
          content.style.maxHeight = content.scrollHeight + 'px';
        }
      });
    });
  
    // Animated Counter for Stats
    function animateNumbers() {
      const numberElements = document.querySelectorAll('.number[data-count]');
      
      numberElements.forEach(element => {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000;
        const startTime = Date.now();
        
        const updateNumber = () => {
          const currentTime = Date.now();
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const value = Math.floor(progress * target);
          
          element.textContent = value.toLocaleString();
          
          if (progress < 1) {
            requestAnimationFrame(updateNumber);
          } else {
            element.textContent = target.toLocaleString();
          }
        };
        
        updateNumber();
      });
    }
    
    // Intersection Observer for animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          
          // If it's the stats section, animate numbers
          if (entry.target.classList.contains('stats-grid')) {
            animateNumbers();
          }
        }
      });
    }, { threshold: 0.1 });
    
    // Observe elements that should animate when scrolled to
    document.querySelectorAll('.course-card, .service-card, .team-member, .stat-item, .stats-grid').forEach(el => {
      observer.observe(el);
    });
  
    // Floating Action Button for Contact
    const fab = document.createElement('div');
    fab.className = 'fab';
    fab.innerHTML = '<i class="fas fa-comment-alt"></i>';
    document.body.appendChild(fab);
    
    fab.addEventListener('click', () => {
      window.location.href = 'contact.html';
    });
  
    // Dynamic Form Submission with Feedback
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show loading state
        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
          // Show success message
          const successMsg = document.createElement('div');
          successMsg.className = 'form-success';
          successMsg.innerHTML = `
            <svg viewBox="0 0 24 24" width="48" height="48">
              <path fill="#4BB543" d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12l1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            <h3>Message Sent Successfully!</h3>
            <p>We'll get back to you within 24 hours.</p>
          `;
          
          contactForm.style.display = 'none';
          contactForm.parentNode.insertBefore(successMsg, contactForm.nextSibling);
          
          // Add animation
          successMsg.style.opacity = '0';
          successMsg.style.transform = 'translateY(20px)';
          setTimeout(() => {
            successMsg.style.opacity = '1';
            successMsg.style.transform = 'translateY(0)';
          }, 50);
        }, 1500);
      });
    }
  
    // Course Card Hover Effects
    const courseCards = document.querySelectorAll('.course-card');
    courseCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
    });
  
    // Add CSS for dynamic hover effects
    const dynamicHoverStyle = document.createElement('style');
    dynamicHoverStyle.textContent = `
      .course-card {
        position: relative;
        overflow: hidden;
      }
      .course-card::after {
        content: '';
        position: absolute;
        top: calc(var(--mouse-y, 0) - 50px);
        left: calc(var(--mouse-x, 0) - 50px);
        width: 100px;
        height: 100px;
        background: radial-gradient(rgba(72, 149, 239, 0.1), transparent 70%);
        opacity: 0;
        transition: opacity 0.3s ease;
      }
      .course-card:hover::after {
        opacity: 1;
      }
      .form-success {
        text-align: center;
        padding: 40px;
        background: white;
        border-radius: 16px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        transition: all 0.4s ease;
      }
    `;
    document.head.appendChild(dynamicHoverStyle);
  });