// Tab functionality for courses
document.addEventListener('DOMContentLoaded', function() {
    // Course tabs
    const courseTabs = document.querySelectorAll('.course-tab');
    const courseDetails = document.querySelectorAll('.course-details');
    
    courseTabs.forEach(tab => {
      tab.addEventListener('click', function() {
        // Remove active class from all tabs and content
        courseTabs.forEach(t => t.classList.remove('active'));
        courseDetails.forEach(d => d.classList.remove('active'));
        
        // Add active class to clicked tab
        this.classList.add('active');
        
        // Show corresponding content
        const tabId = this.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
      });
    });
    
    // Accordion functionality
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
      header.addEventListener('click', function() {
        const accordionItem = this.parentElement;
        const accordionContent = this.nextElementSibling;
        
        // Close all other accordion items
        if (!accordionContent.classList.contains('active')) {
          document.querySelectorAll('.accordion-content').forEach(content => {
            content.classList.remove('active');
            content.previousElementSibling.classList.remove('active');
          });
        }
        
        // Toggle current item
        this.classList.toggle('active');
        accordionContent.classList.toggle('active');
      });
    });
    
    // Open first accordion item by default
    if (accordionHeaders.length > 0) {
      accordionHeaders[0].classList.add('active');
      accordionHeaders[0].nextElementSibling.classList.add('active');
    }
  });