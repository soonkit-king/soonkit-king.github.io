const script = document.createElement("script"); // Create a new script tag (only exist in cache)
script.src = "/other/confetti.browser.min.js"; // Assiging the script source
document.head.appendChild(script); // Finally adding the script to the DOM (Document Object Model)


document.addEventListener('DOMContentLoaded', () => {
    const audio = new Audio('/audio/party-horn.mp3');
    audio.preload = 'auto';
    audio.load();

    // Surprise confetti section
    script.onload = () => { 
        const launchConfetti = () => {
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 }
            });
            
            if (!audio.paused) { // Audio can react to button spams
                audio.currentTime = 0;
            }
            console.log("Audio is playing")
            audio.play().catch(error => { // Party horn sound effect
                console.log("Audio playback blocked until user interacts with the document.");
            }); 
        };

        // Add confetti animation function to button
        document.getElementById('confettiButton').addEventListener('click', launchConfetti);

        // Add interaction observer between viewport and "surprise" class for confetti animation
        const surpriseSection = document.querySelector('.surprise');
        const surpriseObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if(entry.isIntersecting){
                    launchConfetti();
                    surpriseObserver.unobserve(surpriseSection);
                }
            } 
            );
        }, { threshold: 0.3 });
        surpriseObserver.observe(surpriseSection);
    }

    // Observes intersection between element and the viewport. Meaning when exit or enters. 
    const hiddenElements = document.querySelectorAll('.hidden');
    const hiddenObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if(entry.isIntersecting) {
                entry.target.classList.add('show');
            }
            else {
                entry.target.classList.remove('show');
            }
        })
    });
    hiddenElements.forEach((el) => hiddenObserver.observe(el));

    // Removes "initial" class after transitioned once (removes initial delay)
    const initialElements = document.querySelectorAll('.initial');
    initialElements.forEach((el) =>
        el.addEventListener('transitionend', () => {
            el.classList.remove('initial', 'hidden');
        })
    );

    // Section breakpoint color changes through scrolling
    const breakpointSection = document.querySelectorAll('.breakpoint');
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bgColor = entry.target.getAttribute('bg-color');
                //document.body.style.backgroundColor = color;
                // document.body.className = bgColor;
                const safeArea = document.querySelector('.safe-area');
                safeArea.className = `safe-area ${bgColor}`

                console.log(`Breakpoint has intersected with safe-area ${bgColor}`);
            }
        });
    }, { threshold: 0.2 });  // Change color on percentage scrolled through
    breakpointSection.forEach(section => { observer.observe(section); });
});





