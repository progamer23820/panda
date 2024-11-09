// JavaScript code for handling interactivity

// Reference to the "O" button
const openWindow2 = document.getElementById('openWindow2');

// References to overlays
const window2 = document.getElementById('window2');
const window3 = document.getElementById('window3');
const window4 = document.getElementById('window4');
const window5 = document.getElementById('window5');
const window6 = document.getElementById('window6');
const window7 = document.getElementById('window7');
const window8 = document.getElementById('window8');
const window9 = document.getElementById('window9');
const window10 = document.getElementById('window10');
const window11 = document.getElementById('window11');

// Reference to flying GIF
const flyingGif = document.getElementById('flyingGif');
let gifTimer;
let gifTimeout;

// Background movement effect
const background = document.getElementById('background');

// Variables for smooth background movement
let targetX = -10;
let targetY = -10;
let currentX = -10;
let currentY = -10;
let isAnimatingBackground = false;

// Animation IDs for requestAnimationFrame
let animationId;
let bubbleAnimationId;

// Function to check if any window is open
function isAnyWindowOpen() {
    return window2.classList.contains('show') ||
           window3.classList.contains('show') ||
           window4.classList.contains('show') ||
           window5.classList.contains('show') ||
           window6.classList.contains('show') ||
           window7.classList.contains('show') ||
           window8.classList.contains('show') ||
           window9.classList.contains('show') ||
           window10.classList.contains('show') ||
           window11.classList.contains('show');
}

document.addEventListener('mousemove', function(e) {
    if (!isAnyWindowOpen()) {
        const moveX = (e.clientX / window.innerWidth - 0.5) * 10; // Adjust multiplier for effect
        const moveY = (e.clientY / window.innerHeight - 0.5) * 10;
        targetX = -10 - moveX;
        targetY = -10 - moveY;
        if (!isAnimatingBackground) {
            isAnimatingBackground = true;
            animateBackground();
        }
    }
});

function animateBackground() {
    // Smoothly interpolate towards the target position
    const speed = 0.1; // Adjust for smoothness (lower is smoother but slower)
    currentX += (targetX - currentX) * speed;
    currentY += (targetY - currentY) * speed;

    background.style.transform = `translate(${currentX}%, ${currentY}%)`;

    // Continue animating if not at target position
    if (Math.abs(targetX - currentX) > 0.1 || Math.abs(targetY - currentY) > 0.1) {
        requestAnimationFrame(animateBackground);
    } else {
        isAnimatingBackground = false;
    }
}

// Function to stop all animations
function stopAllAnimations() {
    if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
    }
    if (bubbleAnimationId) {
        cancelAnimationFrame(bubbleAnimationId);
        bubbleAnimationId = null;
    }
    clearTimeout(gifTimer);
    clearTimeout(gifTimeout);
    flyingGif.style.display = 'none';
}

// Function to update the visibility of the "O" button
function updateOButtonVisibility() {
    if (isAnyWindowOpen()) {
        openWindow2.classList.add('hidden');
        document.body.classList.add('modal-open');
        muteButton.classList.add('hidden');
    } else {
        openWindow2.classList.remove('hidden');
        document.body.classList.remove('modal-open');
        muteButton.classList.remove('hidden');
    }
}

// Window 2 open/close
const openWindow2Btn = document.getElementById('openWindow2');
const closeWindow2 = document.getElementById('closeWindow2');

openWindow2Btn.addEventListener('click', () => {
    stopAllAnimations();
    window2.classList.add('show');
    window2.style.pointerEvents = 'auto';
    updateOButtonVisibility();
    startGifTimer();
});

closeWindow2.addEventListener('click', () => {
    window2.classList.remove('show');
    setTimeout(() => {
        window2.style.pointerEvents = 'none';
    }, 500);
    updateOButtonVisibility();
    clearTimeout(gifTimer);
    flyingGif.style.display = 'none';
});

// Function to start GIF timer
function startGifTimer() {
    gifTimer = setTimeout(() => {
        if (window2.classList.contains('show')) {
            animateGif();
        }
    }, 120000); // 2 minutes
}

// Function to animate the flying GIF
function animateGif() {
    flyingGif.style.display = 'block';
    moveGif();
    gifTimeout = setTimeout(() => {
        flyingGif.style.display = 'none';
        startGifTimer();
    }, 10000); // 10 seconds
}

// Function to move the GIF randomly around the window
function moveGif() {
    const randomX = Math.random() * (window.innerWidth - 100);
    const randomY = Math.random() * (window.innerHeight - 100);
    flyingGif.style.transform = `translate(${randomX}px, ${randomY}px)`;
    if (flyingGif.style.display === 'block') {
        requestAnimationFrame(moveGif);
    }
}

// Window 3 open/close
const openWindow3Btn = document.getElementById('openWindow3');
const closeWindow3 = document.getElementById('closeWindow3');

openWindow3Btn.addEventListener('click', () => {
    stopAllAnimations();
    window3.classList.add('show');
    window3.style.pointerEvents = 'auto';
    updateOButtonVisibility();
    simulateGravity();
});

closeWindow3.addEventListener('click', () => {
    window3.classList.remove('show');
    setTimeout(() => {
        window3.style.pointerEvents = 'none';
    }, 500);
    updateOButtonVisibility();
    cancelAnimationFrame(animationId);
});

// Window 4 open/close
const openWindow4Btn = document.getElementById('openWindow4');
const closeWindow4 = document.getElementById('closeWindow4');

openWindow4Btn.addEventListener('click', () => {
    stopAllAnimations();
    window4.classList.add('show');
    window4.style.pointerEvents = 'auto';
    updateOButtonVisibility();
    initBubbleAnimation();
});

closeWindow4.addEventListener('click', () => {
    window4.classList.remove('show');
    setTimeout(() => {
        window4.style.pointerEvents = 'none';
    }, 500);
    updateOButtonVisibility();
    cancelAnimationFrame(bubbleAnimationId);
});

// Window 5 open/close (Paint App)
const openWindow5Btn = document.getElementById('openWindow5');
const closeWindow5 = document.getElementById('closeWindow5');

openWindow5Btn.addEventListener('click', () => {
    stopAllAnimations();
    window5.classList.add('show');
    window5.style.pointerEvents = 'auto';
    updateOButtonVisibility();
    initPaintApp();
});

closeWindow5.addEventListener('click', () => {
    window5.classList.remove('show');
    setTimeout(() => {
        window5.style.pointerEvents = 'none';
    }, 500);
    updateOButtonVisibility();
});

// Paint App initialization
function initPaintApp() {
    const canvas = document.getElementById('paintCanvas');
    const ctx = canvas.getContext('2d');
    resizeCanvas();

    // Variables for drawing state
    let drawing = false;
    let currentColor = document.getElementById('colorPicker').value;
    let brushSize = document.getElementById('brushSize').value;
    let lastX = 0;
    let lastY = 0;

    // Function to resize canvas to fit the window
    function resizeCanvas() {
        canvas.width = window.innerWidth * 0.8;
        canvas.height = window.innerHeight * 0.6;
    }

    // Event Listeners for mouse events
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);

    // Event Listeners for control inputs
    document.getElementById('colorPicker').addEventListener('change', (e) => {
        currentColor = e.target.value;
    });

    document.getElementById('brushSize').addEventListener('input', (e) => {
        brushSize = e.target.value;
    });

    document.getElementById('clearBtn').addEventListener('click', clearCanvas);
    document.getElementById('saveBtn').addEventListener('click', saveImage);

    // Function to start drawing with mouse
    function startDrawing(e) {
        drawing = true;
        [lastX, lastY] = [e.offsetX, e.offsetY];
    }

    // Function to draw with mouse
    function draw(e) {
        if (!drawing) return;
        ctx.strokeStyle = currentColor;
        ctx.lineWidth = brushSize;
        ctx.lineCap = 'round';

        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
        [lastX, lastY] = [e.offsetX, e.offsetY];
    }

    // Function to stop drawing
    function stopDrawing() {
        drawing = false;
    }

    // Function to clear the canvas
    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    // Function to save the canvas as an image
    function saveImage() {
        const link = document.createElement('a');
        link.download = 'my_drawing.png';
        link.href = canvas.toDataURL();
        link.click();
    }
}

// Bubble game code for Window 3
let bubble = document.querySelector('.bubble');
let gravity = 0.8;
let velocityY = 2;
let velocityX = 0;
let positionY = 0;
let positionX = window.innerWidth / 2 - 75;
let isHolding = false;
let offsetY = 0;
let offsetX = 0;
let lastMouseX = 0;
let lastMouseY = 0;
let mouseVelocityX = 0;
let mouseVelocityY = 0;

function simulateGravity() {
    if (!isHolding) {
        velocityY += gravity;
        positionY += velocityY;
        if (positionY > window.innerHeight - 300) {
            velocityY = -velocityY * 0.7;
            positionY = window.innerHeight - 300;
        }
        positionX += velocityX;
        velocityX *= 0.98;
        if (positionX < -150 || positionX > window.innerWidth) {
            velocityX = 0;
        }
    }
    bubble.style.top = `${positionY}px`;
    bubble.style.left = `${positionX}px`;
    animationId = requestAnimationFrame(simulateGravity);
}

window.addEventListener('mousemove', (e) => {
    if (isHolding) {
        positionY = e.clientY - offsetY;
        positionX = e.clientX - offsetX;
        bubble.style.top = `${positionY}px`;
        bubble.style.left = `${positionX}px`;
        mouseVelocityX = e.clientX - lastMouseX;
        mouseVelocityY = e.clientY - lastMouseY;
        lastMouseX = e.clientX;
        lastMouseY = e.clientY;
    }
});

bubble.addEventListener('mousedown', (e) => {
    isHolding = true;
    offsetY = e.clientY - bubble.getBoundingClientRect().top;
    offsetX = e.clientX - bubble.getBoundingClientRect().left;
    bubble.style.cursor = 'grabbing';
});

window.addEventListener('mouseup', () => {
    isHolding = false;
    bubble.style.cursor = 'grab';
    velocityX = mouseVelocityX;
    velocityY = mouseVelocityY;
});

const respawnButton = document.getElementById('respawnButton');
respawnButton.addEventListener('click', resetBubble);

function resetBubble() {
    positionY = Math.random() * (window.innerHeight - 300);
    positionX = Math.random() * (window.innerWidth - 150);
    bubble.style.top = `${positionY}px`;
    bubble.style.left = `${positionX}px`;
    velocityY = 2;
    velocityX = 0;
}

// Bubble animation code for Window 4
let bubbleCanvas, ctx;
let mouseX = 0;
let mouseY = 0;
const followBubbles = [];
const particles = [];
const explosionDistance = 100;
const stopDistance = 140;
const waitTime = 5;
const bubbleCount = 10;
const particleCount = 15;
const maxSpeed = 10;

function initBubbleAnimation() {
    bubbleCanvas = document.getElementById('bubbleCanvas');
    ctx = bubbleCanvas.getContext('2d');
    resizeBubbleCanvas();

    window4.addEventListener('click', createBubbles);
    window4.addEventListener('mousemove', trackMouse);

    window.addEventListener('resize', resizeBubbleCanvas);
    animateBubbles();
}

function resizeBubbleCanvas() {
    bubbleCanvas.width = window.innerWidth;
    bubbleCanvas.height = window.innerHeight;
}

function createBubbles(e) {
    for (let i = 0; i < bubbleCount; i++) {
        const angle = Math.random() * 2 * Math.PI;
        const size = Math.random() * 10 + 5;
        const bubble = {
            x: e.clientX,
            y: e.clientY,
            vx: Math.cos(angle) * explosionDistance,
            vy: Math.sin(angle) * explosionDistance,
            size: size,
            stopped: false,
            collectable: false,
            stopPositionFinal: {
                x: e.clientX + Math.cos(angle) * stopDistance,
                y: e.clientY + Math.sin(angle) * stopDistance,
            },
            followSpeed: 0.1,
            timeUncollected: 0,
            currentSpeed: 0
        };
        followBubbles.push(bubble);
    }

    for (let i = 0; i < particleCount; i++) {
        const angle = Math.random() * 2 * Math.PI;
        const size = Math.random() * 2 + 1;
        const isBright = Math.random() < 0.5;
        const particle = {
            x: e.clientX,
            y: e.clientY,
            vx: Math.cos(angle) * explosionDistance,
            vy: Math.sin(angle) * explosionDistance,
            size: size,
            stopped: false,
            collectable: false,
            stopPositionFinal: {
                x: e.clientX + Math.cos(angle) * stopDistance,
                y: e.clientY + Math.sin(angle) * stopDistance,
            },
            followSpeed: 0.1,
            timeUncollected: 0,
            currentSpeed: 0,
            bright: isBright
        };
        particles.push(particle);
    }
}

function trackMouse(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
}

function animateBubbles() {
    ctx.clearRect(0, 0, bubbleCanvas.width, bubbleCanvas.height);

    for (let i = followBubbles.length - 1; i >= 0; i--) {
        const bubble = followBubbles[i];
        const dx = bubble.stopPositionFinal.x - bubble.x;
        const dy = bubble.stopPositionFinal.y - bubble.y;
        const distanceToFinalStop = Math.sqrt(dx * dx + dy * dy);

        if (!bubble.stopped) {
            if (distanceToFinalStop > 80) {
                bubble.x += (dx / distanceToFinalStop) * 5;
                bubble.y += (dy / distanceToFinalStop) * 5;
            } else if (distanceToFinalStop > 20) {
                bubble.x += (dx / distanceToFinalStop) * 1.5;
                bubble.y += (dy / distanceToFinalStop) * 1.5;
            } else {
                bubble.stopped = true;
                setTimeout(() => {
                    bubble.collectable = true;
                }, waitTime);
            }
        } else if (bubble.collectable) {
            bubble.timeUncollected += 16;

            if (bubble.currentSpeed < maxSpeed) {
                bubble.currentSpeed += 0.2;
            }

            const dxToCursor = mouseX - bubble.x;
            const dyToCursor = mouseY - bubble.y;
            const distanceToCursor = Math.sqrt(dxToCursor * dxToCursor + dyToCursor * dyToCursor);

            if (distanceToCursor > 10) {
                bubble.x += (dxToCursor / distanceToCursor) * bubble.currentSpeed;
                bubble.y += (dyToCursor / distanceToCursor) * bubble.currentSpeed;
            }

            if (distanceToCursor < 10) {
                followBubbles.splice(i, 1);
            }
        }

        ctx.fillStyle = 'rgba(200, 0, 200, 1)';
        ctx.shadowColor = 'rgba(200, 0, 200, 1)';
        ctx.shadowBlur = 30;
        ctx.beginPath();
        ctx.arc(bubble.x, bubble.y, bubble.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
    }

    for (let i = particles.length - 1; i >= 0; i--) {
        const particle = particles[i];
        const dx = particle.stopPositionFinal.x - particle.x;
        const dy = particle.stopPositionFinal.y - particle.y;
        const distanceToFinalStop = Math.sqrt(dx * dx + dy * dy);

        if (!particle.stopped) {
            if (distanceToFinalStop > 80) {
                particle.x += (dx / distanceToFinalStop) * 5;
                particle.y += (dy / distanceToFinalStop) * 5;
            } else if (distanceToFinalStop > 20) {
                particle.x += (dx / distanceToFinalStop) * 1.5;
                particle.y += (dy / distanceToFinalStop) * 1.5;
            } else {
                particle.stopped = true;
                setTimeout(() => {
                    particle.collectable = true;
                }, waitTime);
            }
        } else if (particle.collectable) {
            particle.timeUncollected += 16;

            if (particle.currentSpeed < maxSpeed) {
                particle.currentSpeed += 0.2;
            }

            const dxToCursor = mouseX - particle.x;
            const dyToCursor = mouseY - particle.y;
            const distanceToCursor = Math.sqrt(dxToCursor * dxToCursor + dyToCursor * dyToCursor);

            if (distanceToCursor > 10) {
                particle.x += (dxToCursor / distanceToCursor) * particle.currentSpeed;
                particle.y += (dyToCursor / distanceToCursor) * particle.currentSpeed;
            }

            if (distanceToCursor < 10) {
                particles.splice(i, 1);
            }
        }

        ctx.fillStyle = particle.bright ? 'rgba(255, 0, 255, 1)' : 'rgba(150, 0, 150, 1)';
        ctx.shadowColor = particle.bright ? 'rgba(255, 0, 255, 1)' : 'rgba(150, 0, 150, 1)';
        ctx.shadowBlur = particle.bright ? 30 : 20;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
    }

    bubbleAnimationId = requestAnimationFrame(animateBubbles);
}

// Mute button functionality
const muteButton = document.getElementById('muteButton');
const backgroundMusic = document.getElementById('backgroundMusic');

// Ensure music starts only after a user interaction
document.body.addEventListener('click', () => {
    if (!backgroundMusic.playing) {
        backgroundMusic.play().catch(() => {
            console.log('Autoplay prevented, user interaction required to start music.');
        });
    }
}, { once: true });

let isMuted = false;

muteButton.addEventListener('click', () => {
    isMuted = !isMuted;
    backgroundMusic.muted = isMuted;
    muteButton.textContent = isMuted ? 'Unmute' : 'Mute';
});

// Window 6 open/close
const openWindow6Btn = document.getElementById('openWindow6');
const closeWindow6 = document.getElementById('closeWindow6');
const boxfield = document.getElementById('boxfield');

openWindow6Btn.addEventListener('click', () => {
    stopAllAnimations();
    window6.classList.add('show');
    window6.style.pointerEvents = 'auto';
    updateOButtonVisibility();

    // Create boxfield content
    if (boxfield.children.length === 0) { // Create boxes only once
        for (let i = 1; i <= 2500; i++) {
            let box = document.createElement('div');
            box.classList.add('box');
            boxfield.appendChild(box);
        }
    }
});

closeWindow6.addEventListener('click', () => {
    window6.classList.remove('show');
    setTimeout(() => {
        window6.style.pointerEvents = 'none';
    }, 500);
    updateOButtonVisibility();
});

// Window 7 open/close
const openWindow7Btn = document.getElementById('openWindow7');
const closeWindow7 = document.getElementById('closeWindow7');

openWindow7Btn.addEventListener('click', () => {
    stopAllAnimations();
    window7.classList.add('show');
    window7.style.pointerEvents = 'auto';
    updateOButtonVisibility();
});

closeWindow7.addEventListener('click', () => {
    window7.classList.remove('show');
    setTimeout(() => {
        window7.style.pointerEvents = 'none';
    }, 500);
    updateOButtonVisibility();
});

// Window 8 open/close
const openWindow8Btn = document.getElementById('openWindow8');
const closeWindow8 = document.getElementById('closeWindow8');

openWindow8Btn.addEventListener('click', () => {
    stopAllAnimations();
    window8.classList.add('show');
    window8.style.pointerEvents = 'auto';
    updateOButtonVisibility();
});

closeWindow8.addEventListener('click', () => {
    window8.classList.remove('show');
    setTimeout(() => {
        window8.style.pointerEvents = 'none';
    }, 500);
    updateOButtonVisibility();
});

// Window 9 open/close
// Reference to Window 9 button and its audio element
const openWindow9Btn = document.getElementById('openWindow9');
const minecraftIntroAudio = document.getElementById('minecraftIntro');


openWindow9Btn.addEventListener('click', () => {
    // Redirect to the Minecraft project page in a new tab
    window.open("minecraft website/index.html", "_blank");
    
    // Play the Minecraft intro audio
    minecraftIntroAudio.currentTime = 0; // Reset the audio to the start
    minecraftIntroAudio.play().catch((error) => {
        console.error("Minecraft intro playback failed. User interaction required.", error);
    });
});

const closeWindow9 = document.getElementById('closeWindow9');

openWindow9Btn.addEventListener('click', () => {
    stopAllAnimations();
    window9.classList.add('show');
    window9.style.pointerEvents = 'auto';
    updateOButtonVisibility();
});

closeWindow9.addEventListener('click', () => {
    window9.classList.remove('show');
    setTimeout(() => {
        window9.style.pointerEvents = 'none';
    }, 500);
    updateOButtonVisibility();
});

// Window 10 open/close
const openWindow10Btn = document.getElementById('openWindow10');
const closeWindow10 = document.getElementById('closeWindow10');

openWindow10Btn.addEventListener('click', () => {
    // Redirect to the Halloween website page in a new tab
    window.open("halloween/index.html", "_blank");

    // Additional actions for showing the window if needed
    stopAllAnimations();
    window10.classList.add('show');
    window10.style.pointerEvents = 'auto';
    updateOButtonVisibility();
});

closeWindow10.addEventListener('click', () => {
    window10.classList.remove('show');
    setTimeout(() => {
        window10.style.pointerEvents = 'none';
    }, 500);
    updateOButtonVisibility();
});

// Window 11 open/close
const openWindow11Btn = document.getElementById('openWindow11');
const closeWindow11 = document.getElementById('closeWindow11');

openWindow11Btn.addEventListener('click', () => {
    stopAllAnimations();
    window11.classList.add('show');
    window11.style.pointerEvents = 'auto';
    updateOButtonVisibility();
});

closeWindow11.addEventListener('click', () => {
    window11.classList.remove('show');
    setTimeout(() => {
        window11.style.pointerEvents = 'none';
    }, 500);
    updateOButtonVisibility();
});

function openLink() {
    window.open('https://x.com/RealPanda___', '_blank');
}

const typingForm = document.querySelector(".typing-form");
const chatContainer = document.querySelector(".chat-list");
const suggestions = document.querySelectorAll(".suggestion");
const toggleThemeButton = document.querySelector("#theme-toggle-button");
const deleteChatButton = document.querySelector("#delete-chat-button");

// State variables
let userMessage = null;
let isResponseGenerating = false;

// API configuration
const API_KEY = "AIzaSyDbQxy-GbUgaAa02xr6Ihv832zSvjSypJU"; // Your API key here
const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${API_KEY}`;

// Load theme and chat data from local storage on page load
const loadDataFromLocalstorage = () => {
  const savedChats = localStorage.getItem("saved-chats");
  const isLightMode = (localStorage.getItem("themeColor") === "light_mode");

  // Apply the stored theme
  document.body.classList.toggle("light_mode", isLightMode);
  toggleThemeButton.innerText = isLightMode ? "dark_mode" : "light_mode";

  // Restore saved chats or clear the chat container
  chatContainer.innerHTML = savedChats || '';
  document.body.classList.toggle("hide-header", savedChats);

  chatContainer.scrollTo(0, chatContainer.scrollHeight); // Scroll to the bottom
}

// Create a new message element and return it
const createMessageElement = (content, ...classes) => {
  const div = document.createElement("div");
  div.classList.add("message", ...classes);
  div.innerHTML = content;
  return div;
}

// Show typing effect by displaying words one by one
const showTypingEffect = (text, textElement, incomingMessageDiv) => {
  const words = text.split(' ');
  let currentWordIndex = 0;

  const typingInterval = setInterval(() => {
    // Append each word to the text element with a space
    textElement.innerText += (currentWordIndex === 0 ? '' : ' ') + words[currentWordIndex++];
    incomingMessageDiv.querySelector(".icon").classList.add("hide");

    // If all words are displayed
    if (currentWordIndex === words.length) {
      clearInterval(typingInterval);
      isResponseGenerating = false;
      incomingMessageDiv.querySelector(".icon").classList.remove("hide");
      localStorage.setItem("saved-chats", chatContainer.innerHTML); // Save chats to local storage
    }
    chatContainer.scrollTo(0, chatContainer.scrollHeight); // Scroll to the bottom
  }, 75);
}

// Fetch response from the API based on user message
const generateAPIResponse = async (incomingMessageDiv) => {
  const textElement = incomingMessageDiv.querySelector(".text"); // Getting text element

  try {
    // Send a POST request to the API with the user's message
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        contents: [{ 
          role: "user", 
          parts: [{ text: userMessage }] 
        }] 
      }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error.message);

    // Get the API response text and remove asterisks from it
    const apiResponse = data?.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, '$1');
    showTypingEffect(apiResponse, textElement, incomingMessageDiv); // Show typing effect
  } catch (error) { // Handle error
    isResponseGenerating = false;
    textElement.innerText = error.message;
    textElement.parentElement.closest(".message").classList.add("error");
  } finally {
    incomingMessageDiv.classList.remove("loading");
  }
}

// Show a loading animation while waiting for the API response
const showLoadingAnimation = () => {
  const html = `<div class="message-content">
                  <img class="avatar" src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/google-gemini-icon.png" alt="Gemini avatar">
                  <p class="text"></p>
                  <div class="loading-indicator">
                    <div class="loading-bar"></div>
                    <div class="loading-bar"></div>
                    <div class="loading-bar"></div>
                  </div>
                </div>
                <span onClick="copyMessage(this)" class="icon material-symbols-rounded">content_copy</span>`;

  const incomingMessageDiv = createMessageElement(html, "incoming", "loading");
  chatContainer.appendChild(incomingMessageDiv);

  chatContainer.scrollTo(0, chatContainer.scrollHeight); // Scroll to the bottom
  generateAPIResponse(incomingMessageDiv);
}

// Copy message text to the clipboard
const copyMessage = (copyButton) => {
  const messageText = copyButton.parentElement.querySelector(".text").innerText;

  navigator.clipboard.writeText(messageText);
  copyButton.innerText = "done"; // Show confirmation icon
  setTimeout(() => copyButton.innerText = "content_copy", 1000); // Revert icon after 1 second
}

// Handle sending outgoing chat messages
const handleOutgoingChat = () => {
  userMessage = typingForm.querySelector(".typing-input").value.trim() || userMessage;
  if(!userMessage || isResponseGenerating) return; // Exit if there is no message or response is generating

  isResponseGenerating = true;

  const html = `<div class="message-content">
                  <img class="avatar" src="" alt="User avatar">
                  <p class="text"></p>
                </div>`;

  const outgoingMessageDiv = createMessageElement(html, "outgoing");
  outgoingMessageDiv.querySelector(".text").innerText = userMessage;
  chatContainer.appendChild(outgoingMessageDiv);
  
  typingForm.reset(); // Clear input field
  document.body.classList.add("hide-header");
  chatContainer.scrollTo(0, chatContainer.scrollHeight); // Scroll to the bottom
  setTimeout(showLoadingAnimation, 500); // Show loading animation after a delay
}

// Toggle between light and dark themes
toggleThemeButton.addEventListener("click", () => {
  const isLightMode = document.body.classList.toggle("light_mode");
  localStorage.setItem("themeColor", isLightMode ? "light_mode" : "dark_mode");
  toggleThemeButton.innerText = isLightMode ? "dark_mode" : "light_mode";
});

// Delete all chats from local storage when button is clicked
deleteChatButton.addEventListener("click", () => {
  if (confirm("Are you sure you want to delete all the chats?")) {
    localStorage.removeItem("saved-chats");
    loadDataFromLocalstorage();
  }
});

// Set userMessage and handle outgoing chat when a suggestion is clicked
suggestions.forEach(suggestion => {
  suggestion.addEventListener("click", () => {
    userMessage = suggestion.querySelector(".text").innerText;
    handleOutgoingChat();
  });
});

// Prevent default form submission and handle outgoing chat
typingForm.addEventListener("submit", (e) => {
  e.preventDefault(); 
  handleOutgoingChat();
});

// ... your existing JavaScript code ...

window.addEventListener('load', function() {
  var scene = document.querySelector('.scene');
  scene.style.transition = 'opacity 1s ease-out';
  scene.style.opacity = '1';

  // Trigger a reflow to ensure the transition works
  void scene.offsetWidth;

  // Start the fade-out effect
  scene.style.opacity = '0';

  // Optionally, remove the element from the DOM after fading out
  scene.addEventListener('transitionend', function() {
    scene.style.display = 'none';
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const backgroundMusic = document.getElementById('backgroundMusic');
  backgroundMusic.volume = 0.17; // Set volume to 17%
});


// Load the sound disk wii,hovering over
const diskInsertedSound = new Audio('Disk Inserted.MP3'); // Adjust path if necessary
diskInsertedSound.volume = 0.3; // Set volume to 30% (adjust this value as needed)

// Select all the buttons in Window 2
const window2Buttons = document.querySelectorAll('#window2 .new-button');

// Function to play sound on hover
function playHoverSound() {
    diskInsertedSound.currentTime = 0; // Reset the sound to the beginning
    diskInsertedSound.play().catch((error) => {
        console.error("Playback failed. User interaction may be required.", error);
    });
}

// Attach hover event listeners to all buttons
window2Buttons.forEach(button => {
    button.addEventListener('mouseover', playHoverSound);
});


const closeButtonHoverSound = new Audio("sounds/hover1.mp3");
const clickSound = new Audio("sounds/click1.mp3");

closeButtonHoverSound.volume = 0.5;
clickSound.volume = 0.5;

const closeButtons = document.querySelectorAll(".close-button");

function playCloseButtonHoverSound() {
  closeButtonHoverSound.currentTime = 0;
  closeButtonHoverSound.play().catch(error => {
    console.error("Playback failed. User interaction may be required.", error);
  });
}

function playClickSound() {
  clickSound.currentTime = 0;
  clickSound.play().catch(error => {
    console.error("Playback failed. User interaction may be required.", error);
  });
}

closeButtons.forEach(button => {
  button.addEventListener("mouseover", playCloseButtonHoverSound);
  button.addEventListener("click", playClickSound);
});
