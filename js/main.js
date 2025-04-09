document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function toggleMobileMenu() {
        navMenu.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    }
    
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });

    // Header Scroll Effect
    const header = document.querySelector('.header');
    
    function updateHeaderOnScroll() {
        header.classList.toggle('scrolled', window.scrollY > 50);
    }
    
    window.addEventListener('scroll', updateHeaderOnScroll);
    updateHeaderOnScroll(); // Initialize on load

    // Testimonial Slider
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentTestimonial = 0;
    let testimonialInterval;
    
    function showTestimonial(index) {
        testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        testimonials[index].classList.add('active');
    }
    
    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }
    
    function prevTestimonial() {
        currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        showTestimonial(currentTestimonial);
    }
    
    function startAutoRotation() {
        testimonialInterval = setInterval(nextTestimonial, 5000);
    }
    
    if (testimonials.length > 0) {
        prevBtn.addEventListener('click', prevTestimonial);
        nextBtn.addEventListener('click', nextTestimonial);
        
        // Auto-rotation with pause on hover
        const sliderContainer = document.querySelector('.testimonial-slider');
        sliderContainer.addEventListener('mouseenter', () => clearInterval(testimonialInterval));
        sliderContainer.addEventListener('mouseleave', startAutoRotation);
        
        startAutoRotation();
        showTestimonial(0); // Initialize first testimonial
    }

    // Scroll Animations
    const animateElements = document.querySelectorAll('.animate');
    
    function checkScroll() {
        const windowHeight = window.innerHeight;
        const triggerOffset = 100;
        
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - triggerOffset) {
                element.classList.add('show');
            }
        });
    }
    
    // Use IntersectionObserver for better performance
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        });
        
        animateElements.forEach(element => observer.observe(element));
    } else {
        // Fallback for older browsers
        window.addEventListener('scroll', checkScroll);
        window.addEventListener('load', checkScroll);
        checkScroll(); // Initial check
    }

    // Accordion functionality (for FAQ and Course Curriculum)
    const accordionHeaders = document.querySelectorAll('.accordion-header, .faq-question');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const accordionItem = this.parentElement;
            const accordionContent = this.nextElementSibling;
            
            // Toggle current item
            this.classList.toggle('active');
            accordionContent.classList.toggle('active');
            
            // Close other items if needed (optional)
            if (this.classList.contains('active')) {
                accordionHeaders.forEach(otherHeader => {
                    if (otherHeader !== this && otherHeader.classList.contains('active')) {
                        otherHeader.classList.remove('active');
                        otherHeader.nextElementSibling.classList.remove('active');
                    }
                });
            }
        });
    });
    
    // Open first accordion item by default (optional)
    if (accordionHeaders.length > 0) {
        accordionHeaders[0].classList.add('active');
        accordionHeaders[0].nextElementSibling.classList.add('active');
    }

    // Form submission handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Form validation
            const name = this.querySelector('#name').value.trim();
            const email = this.querySelector('#email').value.trim();
            const message = this.querySelector('#message').value.trim();
            
            if (!name || !email || !message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Here you would typically send the data to your server
            console.log('Form submitted:', { name, email, message });
            
            // Show success message
            alert('Thank you for your message! We will get back to you soon.');
            
            // Reset form
            this.reset();
        });
    }
});