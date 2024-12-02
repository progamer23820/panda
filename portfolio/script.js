// Video hover functionality
const tvNoiseSound = new Audio('assets/sounds/tv noice sound.mp3');
tvNoiseSound.volume = 0.25; // Lowered volume to 5%

document.querySelectorAll('.video-container').forEach(container => {
    const video = container.querySelector('video');
    
    container.addEventListener('mouseenter', () => {
        video.play();
        tvNoiseSound.currentTime = 0; // Reset the sound to start
        tvNoiseSound.play();
    });
    
    container.addEventListener('mouseleave', () => {
        video.pause();
        video.currentTime = 0;
        tvNoiseSound.pause();
    });
});

// Sparkle button functionality
const sparkleButton = document.querySelector('.sparkle-button button');

// Contact button hover sound
const contactHoverSound = new Audio('assets/sounds/contact me hvoer sound effect.mp3');
contactHoverSound.volume = 0.1; // Set to 10% volume

// Add hover sound effect
sparkleButton.addEventListener('mouseenter', () => {
    contactHoverSound.currentTime = 0; // Reset sound to start
    contactHoverSound.play();
});

sparkleButton.addEventListener('mouseleave', () => {
    contactHoverSound.pause();
});

// Contact button click functionality
sparkleButton.addEventListener('click', () => {
    // Add your contact form logic here
    alert('Contact form coming soon!');
});

// Audio control functionality
const backgroundMusic = document.getElementById('background-music');
const musicToggle = document.getElementById('music-toggle');
const playIcon = musicToggle.querySelector('.play-icon');
const pauseIcon = musicToggle.querySelector('.pause-icon');
const timeDisplay = document.getElementById('time-display');

// Function to format time
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Update time display
function updateTimeDisplay() {
    if (!backgroundMusic.paused) {
        timeDisplay.textContent = formatTime(backgroundMusic.currentTime);
        timeDisplay.style.display = 'block';
        // Use setTimeout to ensure the display:block is applied before adding the visible class
        setTimeout(() => {
            timeDisplay.classList.add('visible');
        }, 10);
    } else {
        timeDisplay.classList.remove('visible');
        // Wait for fade out transition before hiding the element
        setTimeout(() => {
            timeDisplay.style.display = 'none';
        }, 2000);
    }
}

// Function to toggle play/pause
function toggleMusic() {
    if (backgroundMusic.paused) {
        backgroundMusic.play();
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'inline';
        timeDisplay.style.display = 'block';
        setTimeout(() => {
            timeDisplay.classList.add('visible');
        }, 10);
    } else {
        backgroundMusic.pause();
        playIcon.style.display = 'inline';
        pauseIcon.style.display = 'none';
        timeDisplay.classList.remove('visible');
        setTimeout(() => {
            timeDisplay.style.display = 'none';
        }, 2000);
    }
}

// Add click event listener to the button
musicToggle.addEventListener('click', toggleMusic);

// Update time display every second
backgroundMusic.addEventListener('timeupdate', updateTimeDisplay);

// Start playing when the page loads
window.addEventListener('load', async () => {
    backgroundMusic.volume = 0.5; // Set initial volume to 50%
    try {
        await backgroundMusic.play();
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'inline';
        timeDisplay.style.display = 'block';
        setTimeout(() => {
            timeDisplay.classList.add('visible');
        }, 10);
    } catch (error) {
        // If autoplay fails, we'll need user interaction
        const startAudio = async () => {
            await backgroundMusic.play();
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'inline';
            timeDisplay.style.display = 'block';
            setTimeout(() => {
                timeDisplay.classList.add('visible');
            }, 10);
            // Remove the event listener after first interaction
            document.removeEventListener('click', startAudio);
        };
        document.addEventListener('click', startAudio);
    }
});