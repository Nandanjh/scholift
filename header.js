// script.js
document.addEventListener("DOMContentLoaded", function() {
    // Fetch and insert the header
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;

            // Now that the header is loaded, attach the event listeners for the mobile menu
            const navMenu = document.getElementById('nav-menu');
            const hamburgerIcon = document.getElementById('hamburger-icon');
            const navLinks = document.querySelectorAll('.nav-link');

            hamburgerIcon.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                hamburgerIcon.classList.toggle('active');
            });

            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    // This closes the mobile menu when a link is clicked
                    if (navMenu.classList.contains('active')) {
                        navMenu.classList.remove('active');
                        hamburgerIcon.classList.remove('active');
                    }
                });
            });
        })
        .catch(error => {
            console.error('Error loading the header:', error);
        });
});