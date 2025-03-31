// Text content for the emerging boxes
const textContents = [
    "Real-time attendance tracking",
    "Instant parent notifications",
    "Fee payment reminders",
    "Comprehensive teacher dashboard",
    "Secure communication channel",
    "Paperless administration",
    "Automated absence alerts",
    "Student performance tracking",
    "Easy fee management",
    "Streamlined school operations"
];

// Positions for the text boxes
const positions = [
    { top: '10%', left: '5%', direction: 'right' },
    { top: '25%', left: '5%', direction: 'right' },
    { top: '40%', left: '5%', direction: 'right' },
    { top: '55%', left: '5%', direction: 'right' },
    { top: '70%', left: '5%', direction: 'right' },
    { top: '10%', right: '5%', direction: 'left' },
    { top: '25%', right: '5%', direction: 'left' },
    { top: '40%', right: '5%', direction: 'left' },
    { top: '55%', right: '5%', direction: 'left' },
    { top: '70%', right: '5%', direction: 'left' },
    { top: '5%', left: '30%', direction: 'bottom' },
    { bottom: '5%', left: '30%', direction: 'top' },
    { top: '5%', right: '30%', direction: 'bottom' },
    { bottom: '5%', right: '30%', direction: 'top' }
];

// Colors for the text boxes
const colors = ['color-1', 'color-2', 'color-3', 'color-4', 'color-5'];

// Function to create and animate a text box
function createTextBox() {
    // Get the container
    const container = document.getElementById('text-boxes-container');
    if (!container) return;
    
    // Get random content, position, and color
    const content = textContents[Math.floor(Math.random() * textContents.length)];
    const position = positions[Math.floor(Math.random() * positions.length)];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    // Create the text box element
    const textBox = document.createElement('div');
    textBox.className = `text-box ${position.direction} ${color}`;
    textBox.textContent = content;
    
    // Set position
    Object.keys(position).forEach(key => {
        if (key !== 'direction') {
            textBox.style[key] = position[key];
        }
    });
    
    // Add to container
    container.appendChild(textBox);
    
    // Remove after animation completes
    setTimeout(() => {
        textBox.remove();
    }, 2500);
}

// Create text boxes at intervals
function startTextBoxAnimation() {
    // Create initial text box
    createTextBox();
    
    // Create a new text box every 500ms
    setInterval(() => {
        createTextBox();
    }, 500);
}

// Start the animation when the page loads
window.addEventListener('DOMContentLoaded', function() {
    // Check if we're on a page with the animation container
    if (document.getElementById('text-boxes-container')) {
        startTextBoxAnimation();
    }
});