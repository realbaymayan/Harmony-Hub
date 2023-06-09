var musicData = [
    {
      title: "Aşkın Olayım",
      artist: "Simge",
      cover: "../assets/img/album_covers/ben-bazen-simge.jpeg",
      source: "../assets/musics/Million-Dollar-Man.mp4",
      listenedCount: "141.173.175",
    },
    {
        title: "Öpücem",
        artist: "Simge",
        cover: "../assets/img/album_covers/ben-bazen-simge.jpeg",
        source: "../assets/musics/Simge - Öpücem.mp4",
        listenedCount: "32.766.158",
      },
    {
      title: "Sevmek Yüzünden",
      artist: "Simge",
      cover: "../assets/img/album_covers/sevmek-yuzunden.jpg",
      source: "../assets/musics/Simge - Sevmek Yüzünden.mp4",
      listenedCount: "20.049.855",
    },
    {
      title: "Üzülmedin Mi?",
      artist: "Simge",
      cover: "../assets/img/album_covers/uzulmedin-mi.jpg",
      source: "../assets/musics/Simge - Üzülmedin mi.mp4",
      listenedCount: "954.974.680",
    },
    {
      title: "Yankı",
      artist: "Simge",
      cover: "../assets/img/album_covers/yanki.jpg",
      source: "../assets/musics/Simge - Yankı.mp4",
      listenedCount: "38.529.044",
    },
    {
      title: "Miş Miş",
      artist: "Simge",
      cover: "../assets/img/album_covers/mis-mis.jpg",
      source: "../assets/musics/Simge - mis-mis.mp4",
      listenedCount: "12.137.897",
    },
  ];
  
  var popularContainer = document.getElementById("popular-container");
  
  musicData.forEach(function (item, index) {
    var audio = new Audio();
    audio.src = item.source;
  
    audio.addEventListener("loadedmetadata", function () {
      var duration = audio.duration;
      var minutes = Math.floor(duration / 60);
      var seconds = Math.floor(duration % 60);
      var formattedDuration = minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  
      var popularNumbers = document.createElement("div");
      popularNumbers.className = "popular-numbers";
      popularNumbers.textContent = index + 1;
  
      var popularImage = document.createElement("div");
      popularImage.className = "popular-image";
      var image = document.createElement("img");
      image.src = item.cover;
      image.alt = item.title;
      popularImage.appendChild(image);
  
      var playButton = document.createElement("div");
      playButton.className = "play-button ";
      playButton.setAttribute("iconId", "playPauseIcon" + index);
    
  
      playButton.addEventListener("click", function () {
        var source = item.source;
        var iconId = "playPauseIcon" + index;
        var title = item.title;
        var artist = item.artist;
        var picClass = item.cover;
        playMusic(source, iconId, title, artist, picClass, index);
      });
  
      popularImage.appendChild(playButton);
  
      var iconElement = document.createElement("i");
      iconElement.id = "playPauseIcon" + index;
      iconElement.classList.add("fa-solid", "fa-play");
      playButton.appendChild(iconElement);
  
      var popularTextCover = document.createElement("div");
      popularTextCover.className = "popular-text-cover";
      var popularText = document.createElement("div");
      popularText.className = "popular-text";
      popularText.textContent = item.title;
      popularTextCover.appendChild(popularText);
  
      var popularListenedCover = document.createElement("div");
      popularListenedCover.className = "popular-listened-cover";
      var popularListened = document.createElement("div");
      popularListened.className = "popular-listened";
      popularListened.textContent = item.listenedCount.toLocaleString(); // Display listened count with commas
      popularListenedCover.appendChild(popularListened);
  
      var popularSongMinuteCover = document.createElement("div");
      popularSongMinuteCover.className = "popular-song-minute-cover";
      var popularSongMinute = document.createElement("div");
      popularSongMinute.className = "popular-song-minute";
      popularSongMinute.textContent = formattedDuration;
      popularSongMinuteCover.appendChild(popularSongMinute);
  
      var popularItem = document.createElement("div");
      popularItem.className = "popular-item";
      popularItem.appendChild(popularNumbers);
      popularItem.appendChild(popularImage);
      popularItem.appendChild(popularTextCover);
      popularItem.appendChild(popularListenedCover);
      popularItem.appendChild(popularSongMinuteCover);
  
      popularContainer.appendChild(popularItem);
    });
  });
  
  /////////////////////////////
  
  var audio = new Audio();
  var isPlaying = false;
  var nowPlayingTitle = document.querySelector(".now-playing-title");
  var nowPlayingArtist = document.querySelector(".now-playing-artist");
  var playerPic = document.querySelector(".player-pic");
  var currentAudioIndex = -1; // Başlangıçta herhangi bir müzik çalmadığı için -1 olarak ayarlayın
  var playPauseButton = document.querySelector(".play-pause2");
  var musicPlayer = document.querySelector(".music-player");
  var progressBar = document.querySelector(".progress");
  var currentTimeElement = document.querySelector(".current-time");
  var totalTimeElement = document.querySelector(".total-time");
  var mainElement = document.querySelector(".artist-main");
  
  function playMusic(source, iconId, title, artist, picClass, index) {
    var iconElement = document.getElementById(iconId);
  
    if (isPlaying && currentAudioIndex === index) {
      audio.pause();
      isPlaying = false;
      iconElement.classList.remove("fa-pause");
      iconElement.classList.add("fa-play");
      playPauseButton.classList.remove("fa-pause");
      playPauseButton.classList.add("fa-play");
    } else {
      if (currentAudioIndex !== -1) {
        // If another music is playing, stop it
        var previousIconId = "playPauseIcon" + currentAudioIndex;
        var previousIconElement = document.getElementById(previousIconId);
        previousIconElement.classList.remove("fa-pause");
        previousIconElement.classList.add("fa-play");
        playPauseButton.classList.remove("fa-pause");
        playPauseButton.classList.add("fa-play");
  
        audio.pause();
      }
  
      audio.src = source;
      audio.play();
      isPlaying = true;
      iconElement.classList.remove("fa-play");
      iconElement.classList.add("fa-pause");
      playPauseButton.classList.remove("fa-play");
      playPauseButton.classList.add("fa-pause");
      musicPlayer.style.display = "flex";
      mainElement.style.paddingBottom = "180px";
  
      currentAudioIndex = index; // Update the current music index
    }
  
    nowPlayingTitle.textContent = title;
    nowPlayingArtist.textContent = artist;
    var playerPicElement = document.querySelector(".player-pic");
    playerPicElement.src = picClass;
  
    audio.addEventListener("timeupdate", () => {
      var currentTime = audio.currentTime;
      var totalTime = audio.duration;
      var progressPercentage = (currentTime / totalTime) * 100;
  
      progressBar.value = progressPercentage;
  
      var currentMinutes = Math.floor(currentTime / 60);
      var currentSeconds = Math.floor(currentTime % 60);
      currentTimeElement.textContent =
        currentMinutes + ":" + (currentSeconds < 10 ? "0" : "") + currentSeconds;
  
      var totalMinutes = Math.floor(totalTime / 60);
      var totalSeconds = Math.floor(totalTime % 60);
      totalTimeElement.textContent =
        totalMinutes + ":" + (totalSeconds < 10 ? "0" : "") + totalSeconds;
    });
  
    progressBar.addEventListener("input", () => {
      var seekTime = (progressBar.value / 100) * audio.duration;
      audio.currentTime = seekTime;
    });
  }
  
  // Play/Pause Button
  playPauseButton.addEventListener("click", function () {
    if (currentAudioIndex !== -1) {
      var iconId = "playPauseIcon" + currentAudioIndex;
      var iconElement = document.getElementById(iconId);
  
      if (isPlaying) {
        audio.pause();
        isPlaying = false;
        iconElement.classList.remove("fa-pause");
        iconElement.classList.add("fa-play");
        playPauseButton.classList.remove("fa-pause");
        playPauseButton.classList.add("fa-play");
      } else {
        audio.play();
        isPlaying = true;
        iconElement.classList.remove("fa-play");
        iconElement.classList.add("fa-pause");
        playPauseButton.classList.remove("fa-play");
        playPauseButton.classList.add("fa-pause");
      }
    }
  });
  
  // Step Backward Button
  var stepBackwardButton = document.querySelector(".fa-step-backward");
  stepBackwardButton.addEventListener("click", function () {
    if (currentAudioIndex !== -1) {
      var previousIndex = currentAudioIndex - 1;
      if (previousIndex < 0) {
        previousIndex = musicData.length - 1;
      }
      playMusic(
        musicData[previousIndex].source,
        "playPauseIcon" + previousIndex,
        musicData[previousIndex].title,
        musicData[previousIndex].artist,
        musicData[previousIndex].cover,
        previousIndex
      );
    }
  });
  
  // Step Forward Button
  var stepForwardButton = document.querySelector(".fa-step-forward");
  stepForwardButton.addEventListener("click", function () {
    if (currentAudioIndex !== -1) {
      var nextIndex = currentAudioIndex + 1;
      if (nextIndex >= musicData.length) {
        nextIndex = 0;
      }
      playMusic(
        musicData[nextIndex].source,
        "playPauseIcon" + nextIndex,
        musicData[nextIndex].title,
        musicData[nextIndex].artist,
        musicData[nextIndex].cover,
        nextIndex
      );
    }
  });
  
  // Random Button
  var randomButton = document.querySelector(".fa-random");
  randomButton.addEventListener("click", function () {
    if (currentAudioIndex !== -1) {
      var randomIndex = Math.floor(Math.random() * musicData.length);
      playMusic(
        musicData[randomIndex].source,
        "playPauseIcon" + randomIndex,
        musicData[randomIndex].title,
        musicData[randomIndex].artist,
        musicData[randomIndex].cover,
        randomIndex
      );
    }
  });
  
  // Undo Button
  var undoButton = document.querySelector(".fa-undo-alt");
  undoButton.addEventListener("click", function () {
    if (currentAudioIndex !== -1) {
      playMusic(
        musicData[currentAudioIndex].source,
        "playPauseIcon" + currentAudioIndex,
        musicData[currentAudioIndex].title,
        musicData[currentAudioIndex].artist,
        musicData[currentAudioIndex].cover,
        currentAudioIndex
      );
    }
  });
  
  // Get the search input element
  var searchInput = document.getElementById("searchInput");
  // Get the search results element
  var searchResults = document.getElementById("searchResults");
  
  // Function to perform the search
  function searchMusic() {
    // Clear previous search results
    searchResults.innerHTML = "";
  
    // Get the search query
    var query = searchInput.value.toLowerCase().trim();
  
    // Check if the search query is empty
    if (query === "") {
      return; // Exit the function if the query is empty
    }
  
    // Filter the musicData array based on the search query
    var filteredMusic = musicData.filter(function (music) {
      var title = music.title.toLowerCase();
      var artist = music.artist.toLowerCase();
      return title.includes(query) || artist.includes(query);
    });
  
    // Display the search results
    filteredMusic.forEach(function (music) {
      var resultItem = document.createElement("div");
      resultItem.classList.add("search-result");
  
      var coverImage = document.createElement("img");
      coverImage.src = music.cover;
      coverImage.alt = music.title;
      resultItem.appendChild(coverImage);
  
      var musicInfo = document.createElement("div");
      musicInfo.classList.add("music-info");
  
      var title = document.createElement("h3");
      title.textContent = music.title;
      musicInfo.appendChild(title);
  
      var artist = document.createElement("h4");
      artist.textContent = music.artist;
      musicInfo.appendChild(artist);
  
      resultItem.appendChild(musicInfo);
      searchResults.appendChild(resultItem);
    });
  }
  
  // Add event listener for the search input
  searchInput.addEventListener("input", searchMusic);
  