// FAQ Accordion Functionality
document.addEventListener('DOMContentLoaded', function() {
    // FAQ accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
      question.addEventListener('click', function() {
        const faqItem = this.parentElement;
        const faqAnswer = this.nextElementSibling;
        
        // Close all other FAQ items
        if (!faqAnswer.classList.contains('active')) {
          document.querySelectorAll('.faq-answer').forEach(answer => {
            answer.classList.remove('active');
            answer.previousElementSibling.classList.remove('active');
          });
        }
        
        // Toggle current item
        this.classList.toggle('active');
        faqAnswer.classList.toggle('active');
      });
    });
    
    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const formData = new FormData(contactForm);
        const formValues = Object.fromEntries(formData.entries());
        
        // Here you would typically send the data to your server
        console.log('Form submitted:', formValues);
        
        // Show success message
        alert('Thank you for your message! We will get back to you soon.');
        
        // Reset form
        contactForm.reset();
      });
    }
  });