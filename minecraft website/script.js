// Function to check if any overlay is open
function isAnyOverlayOpen() {
  return document.querySelector('.overlay.show') !== null;
}

// Function to close all overlays
function closeAllOverlays() {
  const overlays = document.querySelectorAll('.overlay');
  overlays.forEach(overlay => {
    overlay.classList.remove('show');
  });
  document.body.classList.remove('modal-open');
}

// Event listener for DOMContentLoaded
document.addEventListener("DOMContentLoaded", function () {
  const pages = document.querySelectorAll(".page");

  function onHashChange() {
    const hash = window.location.hash || "#";
    pages.forEach(page => {
      if ("#" + page.id === hash) {
        page.classList.add("active");
        page.classList.remove("hidden");
      } else {
        page.classList.remove("active");
        setTimeout(() => page.classList.add("hidden"), 500);
      }
    });
  }

  window.addEventListener("hashchange", onHashChange);
  onHashChange();

  const videoBg = document.getElementById("video-background");
  document.addEventListener("mousemove", e => {
    if (!isAnyOverlayOpen()) {
      const xOffset = (0.5 - e.clientX / window.innerWidth) * 40;
      const yOffset = (0.5 - e.clientY / window.innerHeight) * 40;
      videoBg.style.transform = `translate(calc(-50% + ${xOffset}px), calc(-50% + ${yOffset}px))`;
    }
  });
});

// Event listener for the GIF button with audio effect
document.addEventListener("DOMContentLoaded", function () {
  const gifButton = document.querySelector(".gif-button");
  const extraButtons = document.querySelector(".extra-buttons");
  const buttonContainer = document.querySelector(".button-container");
  const extraButtonEls = document.querySelectorAll(".extra-button");

  // Load audio files
  const slideOutSound = new Audio("Voicy_Navi SFX.mp3");
  const slideInSound = new Audio("Voicy_Navi Sounds.mp3");

  // Set the volume for the audio (0.0 to 1.0)
  slideOutSound.volume = 0.05; // Lower the volume to 10%
  slideInSound.volume = 0.05;  // Lower the volume to 10%

  gifButton.addEventListener("click", function () {
    if (extraButtons.style.display === "none" || extraButtons.style.display === "") {
      // Play the slide out sound when buttons are being revealed
      slideOutSound.play();
      extraButtons.style.display = "flex";
      buttonContainer.style.padding = "2px 2px 280px 2px";
      buttonContainer.style.borderRadius = "30px";
      setTimeout(() => {
        extraButtonEls.forEach((button, index) => {
          setTimeout(() => {
            button.style.opacity = "1";
            button.style.transform = "translateY(0)";
          }, 100 * index);
        });
      }, 100);
    } else {
      // Play the slide in sound when buttons are being hidden
      slideInSound.play();
      extraButtonEls.forEach((button, index) => {
        setTimeout(() => {
          button.style.opacity = "0";
          button.style.transform = "translateY(-20px)";
        }, 100 * index);
      });
      setTimeout(() => {
        extraButtons.style.display = "none";
        buttonContainer.style.padding = "2px";
        buttonContainer.style.borderRadius = "20px";
      }, 500);
    }
  });
});



// Variables for overlays and buttons
const secondButton = document.querySelectorAll(".extra-button")[0],
  extraOverlay = document.getElementById("extraOverlay"),
  closeExtraOverlay = document.getElementById("closeExtraOverlay"),
  volumeDownBtn = document.getElementById("volume-down"),
  volumeUpBtn = document.getElementById("volume-up"),
  volumePercentage = document.getElementById("volume-percentage");

const thirdButton = document.querySelectorAll(".extra-button")[1],
  fourthButton = document.querySelectorAll(".extra-button")[2],
  thirdOverlay = document.getElementById("thirdOverlay"),
  fourthOverlay = document.getElementById("fourthOverlay"),
  closeThirdOverlay = document.getElementById("closeThirdOverlay"),
  closeFourthOverlay = document.getElementById("closeFourthOverlay");

// Event listener for the second button
secondButton.addEventListener("click", () => {
  closeAllOverlays();
  extraOverlay.classList.add("show");
  document.body.classList.add("modal-open");
  if (!isPlaying) loadMusic(songs[musicIndex]);
  if (isPlaying) {
    playBtn.classList.replace("fa-play", "fa-pause");
    playBtn.setAttribute("title", "Pause");
  } else {
    playBtn.classList.replace("fa-pause", "fa-play");
    playBtn.setAttribute("title", "Play");
  }
});

closeExtraOverlay.addEventListener("click", () => {
  extraOverlay.classList.remove("show");
  document.body.classList.remove("modal-open");
  if (isPlaying) playBtn.classList.replace("fa-play", "fa-pause");
  else playBtn.classList.replace("fa-pause", "fa-play");
});

// Event listener for the third button
thirdButton.addEventListener("click", () => {
  console.log("Third button clicked");
  closeAllOverlays();
  thirdOverlay.classList.add("show");
  document.body.classList.add("modal-open");
});

closeThirdOverlay.addEventListener("click", () => {
  thirdOverlay.classList.remove("show");
  document.body.classList.remove("modal-open");
});

// Event listener for the fourth button
fourthButton.addEventListener("click", () => {
  console.log("Fourth button clicked");
  closeAllOverlays();
  fourthOverlay.classList.add("show");
  document.body.classList.add("modal-open");
});

closeFourthOverlay.addEventListener("click", () => {
  fourthOverlay.classList.remove("show");
  document.body.classList.remove("modal-open");
});

// Music player variables and functions
const image = document.getElementById("cover"),
  title = document.getElementById("music-title"),
  artist = document.getElementById("music-artist"),
  currentTimeEl = document.getElementById("current-time"),
  durationEl = document.getElementById("duration"),
  progress = document.getElementById("progress"),
  playerProgress = document.getElementById("player-progress"),
  prevBtn = document.getElementById("prev"),
  nextBtn = document.getElementById("next"),
  playBtn = document.getElementById("play"),
  music = new Audio(),
  songs = [
    { path: "assets/1.mp3", displayName: "Minecraft", cover: "assets/1.jpg", artist: "" },
    { path: "assets/2.mp3", displayName: "Minecraft", cover: "assets/2.jpg", artist: "" },
    { path: "assets/3.mp3", displayName: "Minecraft", cover: "assets/2.jpg", artist: "" },
    { path: "assets/4.mp3", displayName: "Minecraft", cover: "assets/2.jpg", artist: "" },
    { path: "assets/5.mp3", displayName: "Minecraft", cover: "assets/2.jpg", artist: "" },
    { path: "assets/6.mp3", displayName: "Minecraft", cover: "assets/3.jpg", artist: "" },
  ];

let musicIndex = 0,
  isPlaying = false;

function togglePlay() {
  if (isPlaying) pauseMusic();
  else playMusic();
}

function playMusic() {
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "Pause");
  music.play();
}

function pauseMusic() {
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
  music.pause();
}

function loadMusic(song) {
  music.src = song.path;
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  image.src = song.cover;
}

function changeMusic(direction) {
  musicIndex = (musicIndex + direction + songs.length) % songs.length;
  loadMusic(songs[musicIndex]);
  playMusic();
}

function updateProgressBar() {
  const { duration, currentTime } = music;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = progressPercent + "%";

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60) || 0;
    const seconds = Math.floor(time % 60) || 0;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  durationEl.textContent = formatTime(duration);
  currentTimeEl.textContent = formatTime(currentTime);
}

function setProgressBar(e) {
  const width = playerProgress.clientWidth;
  const clickX = e.offsetX;
  music.currentTime = (clickX / width) * music.duration;
}

function increaseVolume() {
  if (music.volume < 1) {
    music.volume = Math.min(1, music.volume + 0.1);
    updateVolumeDisplay();
  }
}

function decreaseVolume() {
  if (music.volume > 0) {
    music.volume = Math.max(0, music.volume - 0.1);
    updateVolumeDisplay();
  }
}

function updateVolumeDisplay() {
  const volumePercent = Math.round(music.volume * 100);
  volumePercentage.textContent = volumePercent + "%";
}

playBtn.addEventListener("click", togglePlay);
prevBtn.addEventListener("click", () => changeMusic(-1));
nextBtn.addEventListener("click", () => changeMusic(1));
music.addEventListener("ended", () => changeMusic(1));
music.addEventListener("timeupdate", updateProgressBar);
playerProgress.addEventListener("click", setProgressBar);

loadMusic(songs[musicIndex]);

music.volume = 0.5;
volumeUpBtn.addEventListener("click", increaseVolume);
volumeDownBtn.addEventListener("click", decreaseVolume);

        document.addEventListener('DOMContentLoaded', function(){
            let cube = document.querySelector('.cube');
            let grids = document.querySelectorAll('.grid');

            grids.forEach(grid => {
                for(let i=0; i<100;i++){
                    let span = document.createElement('span');
                    grid.appendChild(span);
                }
            })            


            // Add random active class
            function addRandomActiveClass(){
                grids.forEach(grid =>{
                    let spans = grid.querySelectorAll('span');
                    let randomIndex = Math.floor(Math.random() * spans.length);
                    spans[randomIndex].classList.add('active');

                    // Remove active class after a rondom Time
                    let removeTime = Math.floor(Math.random() * 1000) + 500;
                    setTimeout(() => {
                        spans[randomIndex].classList.remove('active');
                    }, removeTime)
                });
            }

            // call addRandomActiveClass function at random interval
            function randomInterval(){
                let interval = Math.floor(Math.random() * 200) + 100;
                addRandomActiveClass();
                setTimeout(randomInterval, interval)
            } 
            randomInterval();

            document.addEventListener('mousemove', (e) =>{
                let x = e.clientX / window.innerWidth - 0.5;
                let y = e.clientY / window.innerHeight - 0.5;
                cube.style.transform = `rotateX(${y * 360}deg) rotateY(${x * 360}deg)`;
            })
        })


