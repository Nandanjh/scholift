/*
 * script.js
 * For Scholift Blog Template
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Navigation Toggle ---
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const mobileNav = document.getElementById('mobile-nav');
    const closeMenu = document.getElementById('close-menu');
    const overlay = document.getElementById('overlay');

    const openMobileMenu = () => {
        mobileNav.classList.add('is-open');
        overlay.classList.add('is-open');
        document.body.style.overflow = 'hidden'; // Prevent background scroll
    };

    const closeMobileMenu = () => {
        mobileNav.classList.remove('is-open');
        overlay.classList.remove('is-open');
        document.body.style.overflow = '';
    };

    if (hamburgerMenu && mobileNav && closeMenu && overlay) {
        hamburgerMenu.addEventListener('click', openMobileMenu);
        closeMenu.addEventListener('click', closeMobileMenu);
        overlay.addEventListener('click', closeMobileMenu);
    }

    // --- Copy to Clipboard for Share Link ---
    const copyLinkBtn = document.getElementById('copy-link-btn');

    if (copyLinkBtn) {
        copyLinkBtn.addEventListener('click', () => {
            const urlToCopy = window.location.href;
            const originalText = copyLinkBtn.querySelector('.copy-link-text').textContent;

            navigator.clipboard.writeText(urlToCopy).then(() => {
                // Success feedback
                const textElement = copyLinkBtn.querySelector('.copy-link-text');
                if (textElement) {
                    textElement.textContent = 'Copied!';
                    copyLinkBtn.classList.add('copied');
                }
                
                // Revert back after a few seconds
                setTimeout(() => {
                    if (textElement) {
                        textElement.textContent = originalText;
                        copyLinkBtn.classList.remove('copied');
                    }
                }, 2500);

            }).catch(err => {
                console.error('Failed to copy text: ', err);
                // You could add an error message here if needed
            });
        });
    }

    // --- Optional: Animate elements on scroll ---
    const animatedElements = document.querySelectorAll('.cta-strip, .footer__container > div');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    animatedElements.forEach(el => {
        // Set initial state for animation
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

});
