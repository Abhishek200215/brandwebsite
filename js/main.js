document.addEventListener('DOMContentLoaded', function () {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const body = document.body;

    function toggleMobileMenu() {
        navMenu.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
        body.classList.toggle('no-scroll');
    }

    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('active')) {
                    toggleMobileMenu();
                }
            });
        });
    }

    // Header Scroll Effect
    const header = document.querySelector('.header');
    function updateHeaderOnScroll() {
        if (header) {
            header.classList.toggle('scrolled', window.scrollY > 50);
        }
    }
    window.addEventListener('scroll', updateHeaderOnScroll);
    updateHeaderOnScroll();

    // Testimonial Slider
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentTestimonial = 0;
    let testimonialInterval;

    function showTestimonial(index) {
        testimonials.forEach(t => t.classList.remove('active'));
        if (testimonials[index]) testimonials[index].classList.add('active');
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

    if (testimonials.length > 0 && prevBtn && nextBtn) {
        prevBtn.addEventListener('click', prevTestimonial);
        nextBtn.addEventListener('click', nextTestimonial);
        const sliderContainer = document.querySelector('.testimonial-slider');
        if (sliderContainer) {
            sliderContainer.addEventListener('mouseenter', () => clearInterval(testimonialInterval));
            sliderContainer.addEventListener('mouseleave', startAutoRotation);
        }
        startAutoRotation();
        showTestimonial(0);
    }

    // Scroll Animations
    const animateElements = document.querySelectorAll('.animate');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });

        animateElements.forEach(element => observer.observe(element));
    }

    // Accordion functionality
    const accordionHeaders = document.querySelectorAll('.faq-question');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function () {
            const content = this.nextElementSibling;
            if (content) {
                const isActive = content.classList.contains('active');
                document.querySelectorAll('.accordion-content').forEach(item => item.classList.remove('active'));
                document.querySelectorAll('.faq-question').forEach(item => item.classList.remove('active'));
                if (!isActive) {
                    this.classList.add('active');
                    content.classList.add('active');
                }
            }
        });
    });

    // Open first accordion item by default
    const firstAccordion = document.querySelector('.faq-question');
    if (firstAccordion) {
        firstAccordion.classList.add('active');
        if (firstAccordion.nextElementSibling) {
            firstAccordion.nextElementSibling.classList.add('active');
        }
    }

    // Form submission handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const name = this.querySelector('#name').value.trim();
            const email = this.querySelector('#email').value.trim();
            const message = this.querySelector('#message').value.trim();

            if (!name || !email || !message) {
                alert('Please fill in all required fields.');
                return;
            }

            console.log('Form submitted:', { name, email, message });
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }
});
