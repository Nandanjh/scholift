/**
 * Scholift Product Page Script
 * * This script handles two main functionalities:
 * 1. Animate elements on scroll using the Intersection Observer API.
 * 2. Toggle the mobile navigation menu.
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- Animate on Scroll Functionality ---
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    if (animatedElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1 // Trigger when 10% of the element is visible
        });

        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }

    // --- Mobile Navigation (Hamburger Menu) Functionality ---
    const navMenu = document.getElementById('nav-menu');
    const hamburgerIcon = document.getElementById('hamburger-icon');

    if (hamburgerIcon && navMenu) {
        // Toggle menu on hamburger click
        hamburgerIcon.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent click from bubbling up to the document
            navMenu.classList.toggle('active');
            hamburgerIcon.classList.toggle('active');
        });

        // Close menu when a navigation link is clicked
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    hamburgerIcon.classList.remove('active');
                }
            });
        });

        // Close menu when clicking outside of it
        document.addEventListener('click', (event) => {
            const isClickInsideNav = navMenu.contains(event.target);
            const isClickOnHamburger = hamburgerIcon.contains(event.target);

            if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburgerIcon.classList.remove('active');
            }
        });
    }
});
