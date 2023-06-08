//  VOLUME SLIDER
var volumeSlider = document.querySelector(".player-volume-slider");
var volumeProgressBar = document.querySelector(
  ".player-volume-slider-progress"
);
var volumeHandle = document.querySelector(".player-volume-slider-handle");
var volume = 0.63; // Initial volume (0 to 1)

function setVolume(value) {
  audio.volume = value;
  volumeProgressBar.style.width = value * 100 + "%";
  volumeHandle.style.left = value * 100 + "%";
}

setVolume(volume);

volumeSlider.addEventListener("mousedown", function (event) {
  var sliderRect = volumeSlider.getBoundingClientRect();
  var offsetX = event.clientX - sliderRect.left;
  var sliderWidth = sliderRect.width;
  var newVolume = offsetX / sliderWidth;

  if (newVolume < 0) {
    newVolume = 0;
  } else if (newVolume > 1) {
    newVolume = 1;
  }

  setVolume(newVolume);

  document.addEventListener("mousemove", handleVolumeSliderMove);
  document.addEventListener("mouseup", handleVolumeSliderRelease);
});

function handleVolumeSliderMove(event) {
  var sliderRect = volumeSlider.getBoundingClientRect();
  var offsetX = event.clientX - sliderRect.left;
  var sliderWidth = sliderRect.width;
  var newVolume = offsetX / sliderWidth;

  if (newVolume < 0) {
    newVolume = 0;
  } else if (newVolume > 1) {
    newVolume = 1;
  }

  setVolume(newVolume);
}

function handleVolumeSliderRelease() {
  document.removeEventListener("mousemove", handleVolumeSliderMove);
  document.removeEventListener("mouseup", handleVolumeSliderRelease);
}

var volumeIcon = document.getElementById("volumeIcon");

volumeIcon.addEventListener("click", toggleMute);

function toggleMute() {
  if (audio.volume > 0) {
    audio.volume = 0;
    volumeIcon.classList.remove("fa-volume-high");
    volumeIcon.classList.add("fa-volume-xmark");
  } else {
    audio.volume = volume;
    volumeIcon.classList.remove("fa-volume-xmark");
    volumeIcon.classList.add("fa-volume-high");
  }
}
