// Mobile Scrolling Animation Script
document.addEventListener('DOMContentLoaded', function() {
    // Advantages to display in scrolling boxes
    const advantages = [
        "One-tap attendance marking saves time",
        "Automatic WhatsApp notifications to parents",
        "Digital fee collection & tracking",
        "One-click student promotion",
        "No technical expertise needed",
        "Works with or without internet",
        "Designed specifically for Bihar schools",
        "Affordable implementation costs",
        "Multilingual support for regional languages",
        "Seamless data migration from paper records",
        "Comprehensive attendance reports",
        "Automatic payment receipts",
        "Fee reminder system for parents",
        "No app download required for parents",
        "Teacher-friendly interface"
    ];

    // Create mobile advantages container
    const mobileAdvantages = document.createElement('div');
    mobileAdvantages.className = 'mobile-advantages';
    document.body.appendChild(mobileAdvantages);

    // Create close button
    const closeButton = document.createElement('div');
    closeButton.className = 'close-mobile-view';
    closeButton.innerHTML = '<i class="fas fa-times"></i>';
    mobileAdvantages.appendChild(closeButton);

    // Create show button for mobile
    const showButton = document.createElement('div');
    showButton.className = 'show-mobile-advantages';
    showButton.innerHTML = '<i class="fas fa-info"></i>';
    document.body.appendChild(showButton);

    // Create advantage boxes
    advantages.forEach(advantage => {
        const box = document.createElement('div');
        box.className = 'advantage-box';
        box.textContent = advantage;
        mobileAdvantages.appendChild(box);
    });

    // Get all advantage boxes
    const advantageBoxes = document.querySelectorAll('.advantage-box');

    // Function to position boxes randomly
    function positionBoxesRandomly() {
        advantageBoxes.forEach(box => {
            const randomX = Math.floor(Math.random() * (window.innerWidth - 250));
            const randomY = Math.floor(Math.random() * (window.innerHeight - 100));
            box.style.left = `${randomX}px`;
            box.style.top = `${randomY}px`;
        });
    }

    // Function to show a random box
    function showRandomBox() {
        // Hide all boxes first
        advantageBoxes.forEach(box => {
            box.classList.remove('visible');
            box.classList.add('fade-out');
        });

        // Reposition all boxes
        setTimeout(() => {
            positionBoxesRandomly();
            
            // Show 3 random boxes
            const shuffled = Array.from(advantageBoxes).sort(() => 0.5 - Math.random());
            const selected = shuffled.slice(0, 3);
            
            selected.forEach((box, index) => {
                setTimeout(() => {
                    box.classList.remove('fade-out');
                    box.classList.add('visible');
                    
                    // Hide after 2.5 seconds
                    setTimeout(() => {
                        box.classList.remove('visible');
                        box.classList.add('fade-out');
                    }, 2500);
                }, index * 300);
            });
        }, 500);
    }

    // Initial positioning
    positionBoxesRandomly();

    // Start the animation loop
    let animationInterval;

    // Show button click event
    showButton.addEventListener('click', function() {
        mobileAdvantages.style.display = 'block';
        // Start the animation
        showRandomBox();
        animationInterval = setInterval(showRandomBox, 3000);
    });

    // Close button click event
    closeButton.addEventListener('click', function() {
        mobileAdvantages.style.display = 'none';
        clearInterval(animationInterval);
    });
});