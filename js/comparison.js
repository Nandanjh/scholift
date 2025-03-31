document.addEventListener('DOMContentLoaded', function() {
    // Make comparison cards interactive
    const comparisonCards = document.querySelectorAll('.comparison-card');
    
    comparisonCards.forEach(card => {
        // Add click event to cards
        card.addEventListener('click', function() {
            // Add active class to clicked card and remove from others
            comparisonCards.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            
            // Animate the checkmarks or x marks when card is clicked
            const listItems = this.querySelectorAll('.comparison-list li i');
            listItems.forEach((item, index) => {
                // Reset animation by removing and adding the class
                item.classList.remove('animate-check');
                setTimeout(() => {
                    item.classList.add('animate-check');
                }, 50 * index);
            });
        });
        
        // Make individual list items interactive
        const listItems = card.querySelectorAll('.comparison-list li');
        listItems.forEach(item => {
            item.addEventListener('click', function(e) {
                e.stopPropagation(); // Prevent triggering card click
                
                // Toggle highlight class
                this.classList.toggle('highlight');
                
                // Animate the icon
                const icon = this.querySelector('i');
                icon.classList.remove('animate-check');
                setTimeout(() => {
                    icon.classList.add('animate-check');
                }, 50);
            });
        });
    });
    
    // Make device mockup interactive
    const deviceMockup = document.querySelector('.device-mockup');
    if (deviceMockup) {
        deviceMockup.addEventListener('click', function() {
            this.classList.toggle('expanded');
        });
    }
    
    // Make notifications interactive
    const notifications = document.querySelectorAll('.notification');
    notifications.forEach(notification => {
        notification.addEventListener('click', function() {
            this.classList.toggle('expanded');
        });
    });
    
    // Intersection Observer for animation on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, { threshold: 0.1 });
    
    // Observe comparison cards and animation elements
    document.querySelectorAll('.comparison-card, .device-mockup, .teacher-interface').forEach(el => {
        observer.observe(el);
    });
});