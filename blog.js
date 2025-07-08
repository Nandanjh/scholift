document.addEventListener('DOMContentLoaded', () => {

    // --- Animate Blog Cards on Scroll ---
    const blogCards = document.querySelectorAll('.blog-card');

    // If no blog cards are found, exit to prevent errors.
    if (blogCards.length === 0) {
        return;
    }

    // IntersectionObserver options
    const observerOptions = {
        root: null, // observes intersections relative to the viewport
        rootMargin: '0px',
        threshold: 0.1 // trigger when 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // If the element is intersecting (visible)
            if (entry.isIntersecting) {
                // Apply final styles directly to the element.
                // This overrides the initial inline styles and triggers the transition.
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';

                // Stop observing the element once it has been animated to save resources.
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Attach the observer to each blog card
    blogCards.forEach(card => {
        // Set initial state for animation using inline styles.
        // This ensures cards are hidden before the observer is ready.
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        // Define the transition directly on the element for a self-contained animation.
        card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        
        observer.observe(card);
    });


    // --- "Load More" Button Functionality ---
    const loadMoreBtn = document.getElementById('load-more-btn');

    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            // Placeholder functionality for loading more posts.
            // The alert() has been removed as it's not best practice.
            console.log("Imagine more beautiful blog posts loading here!");

            // In a real application, you would:
            // 1. Make an API call to fetch more blog posts.
            // 2. Create new blog card elements from the response data.
            // 3. Append them to the `blog-grid` container.
            // 4. Re-attach the IntersectionObserver to the new cards.
            console.log("Load More button clicked. API call would be initiated here.");
        });
    }


    // --- CTA Button Click Effect ---
    const ctaButtons = document.querySelectorAll('.card-cta, .load-more-btn');

    ctaButtons.forEach(button => {
        button.addEventListener('mousedown', () => {
            button.style.transform = 'scale(0.98)';
        });
        button.addEventListener('mouseup', () => {
            button.style.transform = 'scale(1)';
        });
        button.addEventListener('mouseleave', () => {
            // Reset style if mouse leaves while button is pressed
            button.style.transform = 'scale(1)';
        });
    });

});
