// Elements for Music Player 
const progress = document.getElementById("progress");
const song = document.getElementById("song");
const controlIcon = document.getElementById("controlIcon");
const playPauseButton = document.querySelector(".play-pause-btn");
const nextButton = document.querySelector(".controls .forward");
const prevButton = document.querySelector(".controls .backward");
const songName = document.querySelector(".music-player h1");
const artistName = document.querySelector(".music-player p");

// Elements for Preloader
const loader = document.getElementById("load");
const preloadSong = document.getElementById("preload-song");
const percentDisplay = document.getElementById("percent");
const finalMessage = document.getElementById("final-message");

// Songs Array
const songs = [
  {
    title: "As It Was",
    name: "Harry Styles",
    source:"https://github.com/ecemgo/mini-samples-great-tricks/raw/main/song-list/Harry-Styles-As-It-Was.mp3",
  },
  {
    title: "Symphony",
    name: "Clean Bandit ft. Zara Larsson",
    source: "https://github.com/ecemgo/mini-samples-great-tricks/raw/main/song-list/Clean-Bandit-Symphony.mp3",
  },
  {
    title: "Pawn It All",
    name: "Alicia Keys",
    source: "https://github.com/ecemgo/mini-samples-great-tricks/raw/main/song-list/Pawn-It-All.mp3",
  },
  {
    title: "Seni Dert Etmeler",
    name: "Madrigal",
    source: "https://github.com/ecemgo/mini-samples-great-tricks/raw/main/song-list/Madrigal-Seni-Dert-Etmeler.mp3",
  },
  
];

let currentSongIndex = 0;

// Preloader Logic
document.addEventListener("DOMContentLoaded", () => {
  let progress = 0;

  // Play Preloader Song
  preloadSong.play();

  // Update Percent Display
  const interval = setInterval(() => {
    progress += 2;
    if (progress > 100) progress = 100;
    percentDisplay.textContent = `${progress}%`;

    if (progress === 100) {
      clearInterval(interval);

      setTimeout(() => {
        preloadSong.pause();
        preloadSong.currentTime = 0;

        loader.style.display = "none"; // Hide Preloader
        finalMessage.style.display = "block"; // Show Final Message

        setTimeout(() => {
          finalMessage.style.display = "none";
          window.location.href = "music_player.html"; // Redirect to Music Player
        }, 3000);
      }, 500);
    }
  }, 50);
});

// Music Player Logic
function updateSongInfo() {
  songName.textContent = songs[currentSongIndex].title;
  artistName.textContent = songs[currentSongIndex].name;
  song.src = songs[currentSongIndex].source;
}

function playPause() {
  if (song.paused) {
    song.play();
    controlIcon.classList.replace("fa-play", "fa-pause");
  } else {
    song.pause();
    controlIcon.classList.replace("fa-pause", "fa-play");
  }
}

playPauseButton.addEventListener("click", playPause);

nextButton.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  swiper.slideTo(currentSongIndex);
  updateSongInfo();
  song.play();
});

prevButton.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  swiper.slideTo(currentSongIndex);
  updateSongInfo();
  song.play();
});

progress.addEventListener("input", () => {
  song.currentTime = progress.value;
});

song.addEventListener("timeupdate", () => {
  progress.value = song.currentTime;
  progress.max = song.duration || 1;
});

song.addEventListener("ended", () => {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  swiper.slideTo(currentSongIndex);
  updateSongInfo();
  song.play();
});

// Swiper Logic
const swiper = new Swiper(".swiper", {
  slidesPerView: "auto",
  centeredSlides: true,
  spaceBetween: 30,
  grabCursor: true,
  initialSlide: currentSongIndex,
  on: {
    slideChange: () => {
      currentSongIndex = swiper.activeIndex;
      updateSongInfo();
      song.play();
    },
  },
});

// Initialize Song Info
updateSongInfo();
