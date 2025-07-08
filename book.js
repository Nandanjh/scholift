document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Element Selection ---
    const form = document.getElementById('lead-form');
    const erpRadioButtons = document.querySelectorAll('input[name="erpUsage"]');
    const erpSoftwareGroup = document.getElementById('erp-software-name-group');
    const erpSoftwareInput = document.getElementById('erp-software-name');
    const formWrapper = document.getElementById('form-wrapper');
    // You might need to add a <div id="thank-you-message" style="display:none;">Thank you!</div> to your HTML
    const thankYouMessage = document.getElementById('thank-you-message'); 
    const submitButton = form.querySelector('button[type="submit"]');

    // --- Form Field References ---
    const nameInput = document.getElementById('name');
    const positionInput = document.getElementById('position');
    const schoolNameInput = document.getElementById('school-name');
    const cityInput = document.getElementById('city');
    const studentCountInput = document.getElementById('student-count');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');

    // --- Event Listeners ---

    // 1. Conditional logic for ERP software field
    erpRadioButtons.forEach(radio => {
        radio.addEventListener('change', (event) => {
            if (event.target.value === 'yes') {
                erpSoftwareGroup.style.display = 'block';
                erpSoftwareInput.required = true;
            } else {
                erpSoftwareGroup.style.display = 'none';
                erpSoftwareInput.required = false;
                erpSoftwareInput.value = ''; // Clear value if hidden
                clearError(erpSoftwareInput); // Clear any errors if hidden
            }
        });
    });

    // 2. Main Form Submission Handler
    form.addEventListener('submit', e => {
        e.preventDefault(); // Prevent the default form submission that reloads the page

        // Run all validations before submitting
        if (!validateForm()) {
            // If validation fails, stop the function here
            return; 
        }

        // Disable button and show loading text to prevent multiple submissions
        submitButton.disabled = true;
        submitButton.textContent = 'Submitting...';

        // The URL for your Google Apps Script Web App
        const scriptURL = 'https://script.google.com/macros/s/AKfycby4zNwRG0GMD9Mx-RXtfgUeTdVZHJYrGDQi44AgItaPOs9eh3zCy9pTFIhcxuN6CIiB/exec';
        
        // Create a FormData object from the form. This gathers all the input values.
        const formData = new FormData(form);

        // Use the fetch API to send the data to your Google Sheet
        fetch(scriptURL, { method: 'POST', body: formData })
            .then(response => {
                console.log('Success!', response);
                alert('Thank you! Your form has been submitted successfully.');
                
                // Reset the form to its initial state
                form.reset(); 
                
                // Hide the conditional ERP field again
                erpSoftwareGroup.style.display = 'none'; 
                
                // Optionally, hide the form and show a thank you message
                if (formWrapper && thankYouMessage) {
                    formWrapper.style.display = 'none';
                    thankYouMessage.style.display = 'block';
                }
            })
            .catch(error => {
                console.error('Error!', error.message);
                // Inform the user that something went wrong
                alert('An error occurred while submitting the form. Please try again.');
            })
            .finally(() => {
                // This block runs whether the submission succeeded or failed
                // Re-enable the button and restore its original text
                submitButton.disabled = false;
                submitButton.textContent = 'Download FREE Guide Now';
            });
    });

    // --- Validation Functions ---

    /**
     * Runs all validation checks and returns true if the form is valid.
     * @returns {boolean}
     */
    function validateForm() {
        clearAllErrors(); // Clear previous errors first
        let isValid = true;

        if (!validateRequired(nameInput)) isValid = false;
        if (!validateRequired(positionInput)) isValid = false;
        if (!validateRequired(schoolNameInput)) isValid = false;
        if (!validateRequired(cityInput)) isValid = false;
        if (!validateRequired(studentCountInput)) isValid = false;
        if (!validateEmail(emailInput)) isValid = false;
        if (!validatePhone(phoneInput)) isValid = false;
        
        // Only validate the ERP software name if it's required and visible
        if (erpSoftwareInput.required && !validateRequired(erpSoftwareInput)) isValid = false;

        return isValid;
    }

    /**
     * Checks if an input field has a value.
     * @param {HTMLElement} input
     * @returns {boolean}
     */
    function validateRequired(input) {
        if (input.value.trim() === '') {
            setError(input, 'This field is required.');
            return false;
        }
        return true;
    }

    /**
     * Validates an email address format.
     * @param {HTMLInputElement} input
     * @returns {boolean}
     */
    function validateEmail(input) {
        if (!validateRequired(input)) return false;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input.value.trim())) {
            setError(input, 'Please enter a valid email address.');
            return false;
        }
        return true;
    }

    /**
     * Validates a 10-digit phone number.
     * @param {HTMLInputElement} input
     * @returns {boolean}
     */
    function validatePhone(input) {
        if (!validateRequired(input)) return false;
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(input.value.trim())) {
            setError(input, 'Please enter a valid 10-digit phone number.');
            return false;
        }
        return true;
    }

    // --- Error Handling UI Functions ---

    /**
     * Displays an error message for a specific field.
     * @param {HTMLElement} input - The input element with the error.
     * @param {string} message - The error message to display.
     */
    function setError(input, message) {
        input.classList.add('invalid');
        const formGroup = input.parentElement;
        const errorDisplay = formGroup.querySelector('.error-message');
        if (errorDisplay) {
            errorDisplay.innerText = message;
        }
    }

    /**
     * Clears the error state from a specific field.
     * @param {HTMLElement} input - The input element to clear.
     */
    function clearError(input) {
        input.classList.remove('invalid');
        const formGroup = input.parentElement;
        const errorDisplay = formGroup.querySelector('.error-message');
        if (errorDisplay) {
            errorDisplay.innerText = '';
        }
    }
    
    /**
     * Clears all error messages and invalid states from the form.
     */
    function clearAllErrors() {
        const invalidInputs = form.querySelectorAll('.invalid');
        invalidInputs.forEach(input => input.classList.remove('invalid'));

        const errorMessages = form.querySelectorAll('.error-message');
        errorMessages.forEach(msg => msg.innerText = '');
    }
});
