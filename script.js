const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry)
        if(entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }
    })
}
)

const hiddenElements = document.querySelectorAll('.hidden, .hidden.fromLeft');
if (hiddenElements.length > 0) {
    console.log(`Found ${hiddenElements.length} elements.`);
    console.log(hiddenElements); // Log the NodeList to inspect the elements
} else {
    console.log('No elements found.');
}
hiddenElements.forEach((element) => observer.observe(element));


window.addEventListener('load', () => {
    const initialElements = document.querySelectorAll('.initial');
    //const initialElements = document.getElementById('initial');
    
    initialElements.addEventListener('transitionend', () => {
        if (element.classList.contains('initial')) {
            element.classList.remove('initial');
        }
    })
    
});

///////////////


// Add confetti.js CDN in script
const script = document.createElement("script");
script.src = "https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js";
document.head.appendChild(script);

// Wait for the confetti library to load
script.onload = function () {
    const button = document.getElementById('confettiButton');

    // Function to launch confetti and play sound
    const launchConfetti = () => {
        // Confetti configuration
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 }
        });

        // Playing a party horn sound effect
        const audio = new Audio('/audio/party-horn.mp3');
        audio.play();
    };

    // Attach event listener to the button
    button.addEventListener('click', launchConfetti);
};
