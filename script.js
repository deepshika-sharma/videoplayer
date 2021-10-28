const container = document.querySelector(".container");
const progressRange = document.querySelector(".progress-range");
const progressBar = document.querySelector(".progress-bar");
const playPause = document.querySelector(".play-pause");
const video = document.querySelector("video");
const volume = document.querySelector(".volume");
const volumeRange = document.querySelector(".volume-range");
const volumeBar = document.querySelector(".volume-bar");
const videoSpeed = document.getElementById("video-speed");
const time = document.querySelector(".time");
const fullScreen = document.querySelector(".fa-expand");

// Global Variables
let duration;
let currentTime;

// Play Video
const playPauseVideo = () => {
  if (playPause.classList.contains("fa-play")) {
    playPause.classList.replace("fa-play", "fa-pause");
    video.play();
  } else {
    playPause.classList.replace("fa-pause", "fa-play");
    video.pause();
  }
};

// Video event listener when we click anywhere on the video
video.addEventListener("click", playPauseVideo);

// Progress Range
progressRange.addEventListener("click", (e) => {
  let x = e.offsetX;
  let total = progressRange.clientWidth;
  let percentWidth = (x / total) * 100;
  progressBar.style.width = `${percentWidth}%`;
  video.currentTime = (duration * percentWidth) / 100;
});

// Play Pause
playPause.addEventListener("click", playPauseVideo);

// Volume
volume.addEventListener("click", () => {
  if (volume.classList.contains("fa-volume-up")) {
    volume.classList.replace("fa-volume-up", "fa-volume-mute");
    video.volume = 0;
    volumeBar.style.width = "0%";
  } else {
    volume.classList.replace("fa-volume-mute", "fa-volume-up");
    volumeBar.style.width = "100%";
    video.volume = 1;
  }
});

// Volume Range
volumeRange.addEventListener("click", (e) => {
  let x = e.offsetX;
  let total = volumeRange.clientWidth;
  let ratio = x / total;
  video.volume = ratio;
  volumeBar.style.width = `${ratio * 100}%`;

  if (ratio < 0.1) {
    volume.classList.replace("fa-volume-up", "fa-volume-mute");
  } else {
    volume.classList.replace("fa-volume-mute", "fa-volume-up");
  }
});

// Video Speed
videoSpeed.addEventListener("change", (e) => {
  video.playbackRate = e.target.value;
});

// Time
const setTime = () => {
  let durationSeconds;
  let durationMinutes;
  let durationHours;
  let currentSeconds;
  let currentMinutes;
  let currentHours;
  duration = video.duration;
  currentTime = video.currentTime;

  //   Duration
  if (duration < 3600) {
    durationMinutes = Math.floor(duration / 60);
    durationSeconds = Math.floor(duration % 60);
    currentMinutes = Math.floor(currentTime / 60);
    currentSeconds = Math.floor(currentTime % 60);
  } else {
    durationHours = Math.floor(duration / 3600);
    durationMinutes = Math.floor(duration / 60);
    durationSeconds = Math.floor(duration % 60);
    currentHours = Math.floor(currentTime / 3600);
    currentMinutes = Math.floor(currentTime / 60);
    currentSeconds = Math.floor(currentTime % 60);
  }

  if (durationSeconds < 10) {
    durationSeconds = `0${durationSeconds}`;
  }
  if (durationMinutes < 10) {
    durationMinutes = `0${durationMinutes}`;
  }
  if (currentSeconds < 10) {
    currentSeconds = `0${currentSeconds}`;
  }
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }

  //   time text content
  if (duration < 3600) {
    time.textContent = `${currentMinutes}:${currentSeconds}/${durationMinutes}:${durationSeconds}`;
  } else {
    time.textContent = `${currentHours}:${currentMinutes}:${currentSeconds}/${durationHours}:${durationMinutes}:${durationSeconds}`;
  }

  if (video.ended) {
    playPause.classList.replace("fa-pause", "fa-play");
  }

  //   Progress Bar
  progressBar.style.width = `${(currentTime / duration) * 100}%`;
};

video.addEventListener("timeupdate", setTime);

setTimeout(setTime, 2000);

// Full Screen
fullScreen.addEventListener("click", () => {
  if (fullScreen.classList.contains("fa-expand")) {
    fullScreen.classList.replace("fa-expand", "fa-compress");
    container.requestFullscreen();
  } else {
    fullScreen.classList.replace("fa-compress", "fa-expand");
    document.exitFullscreen();
  }
});
