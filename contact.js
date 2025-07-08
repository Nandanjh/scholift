/* --- script.js --- */

document.addEventListener('DOMContentLoaded', function() {

    // --- SCROLL ANIMATION OBSERVER ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    const elementsToAnimate = document.querySelectorAll('.scroll-animate');
    elementsToAnimate.forEach(el => observer.observe(el));

    // --- FORM HANDLING ---
    const form = document.getElementById('contactForm');
    const toast = document.getElementById('toast');
    const inputs = form.querySelectorAll('input, select, textarea');
    const submitButton = form.querySelector('button[type="submit"]');

    // --- VALIDATION FUNCTIONS ---
    const validators = {
        fullName: (value) => value.trim().length > 2,
        schoolName: (value) => value.trim().length > 1,
        role: (value) => value !== '',
        email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
        phone: (value) => /^\d{10}$/.test(value.replace(/\s/g, '')),
        message: (value) => value.trim().length > 10
    };

    function validateField(field) {
        const validator = validators[field.name];
        if (!validator) return true;

        const isValid = validator(field.value);
        const errorDiv = field.closest('.form-group').querySelector('.error-message');

        if (!isValid) {
            field.classList.add('invalid');
            if (errorDiv) errorDiv.style.display = 'block';
        } else {
            field.classList.remove('invalid');
            if (errorDiv) errorDiv.style.display = 'none';
        }
        return isValid;
    }

    // --- EVENT LISTENERS ---
    inputs.forEach(input => {
        // Validate on blur (when user clicks away)
        input.addEventListener('blur', (e) => {
            validateField(e.target);
        });
        // Remove invalid state on input
        input.addEventListener('input', (e) => {
            if (e.target.classList.contains('invalid')) {
                validateField(e.target); // Re-validate as user types
            }
        });
    });

    // --- UPDATED FORM SUBMISSION LOGIC ---
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        let isFormValid = true;
        inputs.forEach(input => {
            if (!validateField(input)) {
                isFormValid = false;
            }
        });

        if (isFormValid) {
            // --- This is the new submission block ---
            const scriptURL = 'https://script.google.com/macros/s/AKfycbx00WdlReK3St00qcLkxCKQlGucqHPZ5N37gkwJl0O4HZCAHMyx-86Sctw9NKdI83gb4g/exec';
            const formData = new FormData(form);

            // Disable button and show sending state
            submitButton.disabled = true;
            submitButton.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';

            fetch(scriptURL, { method: 'POST', body: formData })
                .then(response => response.json())
                .then(data => {
                    if (data.result === 'success') {
                        showToast('Message sent successfully!');
                        form.reset();
                        // Manually trigger blur on all fields to reset floating labels
                        inputs.forEach(input => {
                            const event = new Event('blur');
                            input.dispatchEvent(event);
                        });
                    } else {
                        // Handle errors from Google Apps Script
                        showToast('An error occurred. Please try again.', true);
                        console.error('Google Apps Script Error:', data.error);
                    }
                })
                .catch(error => {
                    // Handle network or other fetch errors
                    showToast('Could not send message. Check connection.', true);
                    console.error('Fetch Error:', error);
                })
                .finally(() => {
                    // Re-enable the button and restore original content
                    submitButton.disabled = false;
                    submitButton.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
                });
            // --- End of new submission block ---

        } else {
            console.log('Form is invalid.');
            showToast('Please fix the errors before submitting.', true);
        }
    });

    // --- TOAST NOTIFICATION ---
    function showToast(message, isError = false) {
        const toastMessage = document.getElementById('toast-message');
        const toastIcon = toast.querySelector('i');

        toastMessage.textContent = message;

        if (isError) {
            toast.style.backgroundColor = 'var(--error-color, #e74c3c)';
            toastIcon.className = 'fas fa-exclamation-circle';
            toastIcon.style.color = 'white';
        } else {
            toast.style.backgroundColor = '#2c3e50';
            toastIcon.className = 'fas fa-check-circle';
            toastIcon.style.color = 'var(--primary-color, #3498db)';
        }

        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
});
