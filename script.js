// Observes intersection between element and the viewport. Meaning when exit or enters. 
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if(entry.isIntersecting) {
            entry.target.classList.add('show');
        }
        else {
            entry.target.classList.remove('show');
        }
    })
});
const hiddenElements = document.querySelectorAll('.hidden, .hidden.fromLeft');
hiddenElements.forEach((element) => observer.observe(element));



// Removes "initial" class after transitioned once (removes initial delay)
window.addEventListener('load', () => {
    const initialElements = document.querySelectorAll('.initial');

    initialElements.forEach((element) =>
        element.addEventListener('transitionend', () => {
            element.classList.remove('initial');
        })
    );
});


// Confetti.js CDN in script (Animation)
const script = document.createElement("script");
script.src = "/other/confetti.browser.min.js";
document.head.appendChild(script);

document.addEventListener('DOMContentLoaded', () => {
    const audio = new Audio('/audio/party-horn.mp3');
    audio.preload = 'auto';
    audio.load();

    // Wait for the confetti library to load
    script.onload = () => {
        const launchConfetti = () => {
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 }
            });
            
            if (!audio.paused) { // Can react to button spams
                audio.currentTime = 0;
            }
            console.log("Audio is playing")
            audio.play().catch(error => {
                console.log("Audio playback blocked until user interacts with the document.");
            }); // Playing a party horn sound effect
        };

        // Observing the intersection between viewport and "surprise" class for confetti animation
        const surpriseSection = document.querySelector('.surprise');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if(entry.isIntersecting){
                    launchConfetti();
                    //observer.unobserve(surpriseSection);
                }
            } 
            );
        });
        observer.observe(surpriseSection);

        // Attach event listener to the button
        document.getElementById('confettiButton').addEventListener('click', launchConfetti);

}});
