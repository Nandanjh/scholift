document.addEventListener('DOMContentLoaded', () => {

    // --- Login Form Logic ---
    const loginForm = document.getElementById('login-form');
    const loginButton = document.getElementById('login-button');
    const errorMessage = document.getElementById('error-message');
    const schoolIdInput = document.getElementById('school-id');
    const passcodeIdInput = document.getElementById('passcode');

    if (loginButton) {
        loginButton.addEventListener('click', (event) => {
            // 1. Prevent the form from submitting
            event.preventDefault();

            // 2. Show a loading state on the button
            loginButton.disabled = true;
            loginButton.textContent = 'Logging in...';
            errorMessage.textContent = ''; // Clear previous errors

            // 3. Simulate a network request with a 2-second delay
            setTimeout(() => {
                // 4. Define the error message
                const message = "Your account doesn’t exist. Contact Scholift to digitise your school.";

                // 5. Display the error message
                errorMessage.textContent = message;

                // 6. Add shake animation to input fields for visual feedback
                if (schoolIdInput && passcodeIdInput) {
                    schoolIdInput.classList.add('shake');
                    passcodeIdInput.classList.add('shake');

                    // Remove the class after the animation ends to allow it to be re-triggered
                    setTimeout(() => {
                        schoolIdInput.classList.remove('shake');
                        passcodeIdInput.classList.remove('shake');
                    }, 500); // Duration should match the CSS animation duration
                }
                
                // 7. Revert button to original state
                loginButton.disabled = false;
                loginButton.textContent = 'Login';

            }, 2000); // 2-second delay before showing the error
        });
    }

    // --- Hamburger Menu Logic ---
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            // Toggle 'active' class on both hamburger and nav menu
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when a link is clicked
        document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }));
    }

});
