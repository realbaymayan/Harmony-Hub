var musicData = [
  {
    title: "Million Dolar Man",
    artist: "Lana Del Rey",
    artistUrl: "artist/artist-lanadelrey.html",
    artistImage: "assets/img/artist-profile-pictures/lana-del-rey.jpg",
    cover: "/born-to-die-cover.jpg",
    source: "/assets/musics/Diet-Mountain-Dew.mp3",
  },
  {
    title: "Atlantis",
    artist: "Güneş",
    artistUrl: "artist/artist-gunes.html",
    artistImage: "assets/img/artist-profile-pictures/gunes.jpg",
    cover: "/atlantis-cover.jpg",
    source: "/assets/musics/Gunes-Atlantis.mp3",
  },
  {
    title: "Positions",
    artist: "Ariana Grande",
    artistUrl: "artist/artist-arianagrande.html",
    artistImage: "assets/img/artist-profile-pictures/ariana-grande.png",
    cover: "/positions-cover.jpg",
    source: "/assets/musics/positions-ariana-grande.mp3",
  },
  {
    title: "Aşkın Olayım",
    artist: "Simge",
    artistUrl: "artist/artist-simge.html",
    artistImage: "assets/img/artist-profile-pictures/simge.jpeg",
    cover: "/ben-bazen-simge.jpeg",
    source: "/assets/musics/Askin-Olayim.mp3",
  },
  {
    title: "Eskisi Gibi",
    artist: "Lil Zey",
    artistUrl: "artist/artist-lilzey.html",
    artistImage: "assets/img/artist-profile-pictures/lil-zey.jpg",
    cover: "/eskisi-gibi.jpeg",
    source: "/assets/musics/Eskisi-Gibi.mp3",
  },
  {
    title: "Masal",
    artist: "Motive",
    artistUrl: "artist/artist-motive.html",
    artistImage: "assets/img/artist-profile-pictures/motive.jpg",
    cover: "/masal-motive-cover.jpeg",
    source: "/assets/musics/Motive-Masal.mp3",
  }
];

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

    currentAudioIndex = index; // Update the current music index
  }

  nowPlayingTitle.textContent = title;
  nowPlayingArtist.textContent = artist;
  var playerPicElement = document.querySelector(".player-pic");
  playerPicElement.src = "/assets/img/album_covers" + picClass;

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

window.addEventListener("DOMContentLoaded", function () {
  // Müzik bilgilerini sayfada görüntüleme
  var musicContainer = document.getElementById("recentlyContainer");

  for (var i = 0; i < musicData.length; i++) {
    var musicItem = musicData[i];

    // Yeni bir müzik elementi oluştur
    var musicElement = document.createElement("div");
    musicElement.classList.add("homepage-covers");

    var albumCoverElement = document.createElement("div");
    albumCoverElement.classList.add("homepage-album-covers");
    musicElement.appendChild(albumCoverElement);

    var imageElement = document.createElement("img");
    imageElement.src = "/assets/img/album_covers" + musicItem.cover;
    albumCoverElement.appendChild(imageElement);

    var buttonElement = document.createElement("button");
    var iconId = "playPauseIcon" + i;
    buttonElement.setAttribute(
      "onclick",
      'playMusic("' +
        musicItem.source +
        '", "' +
        iconId +
        '", "' +
        musicItem.title +
        '", "' +
        musicItem.artist +
        '", "' +
        musicItem.cover +
        '", ' +
        i +
        ")"
    );
    albumCoverElement.appendChild(buttonElement);

    var iconElement = document.createElement("i");
    iconElement.id = iconId;
    iconElement.classList.add("fa-solid", "fa-play");
    buttonElement.appendChild(iconElement);

    var textBgElement = document.createElement("div");
    textBgElement.classList.add("text-bg");
    musicElement.appendChild(textBgElement);

    var titleElement = document.createElement("h1");
    titleElement.style.color = "white";
    titleElement.textContent = musicItem.title;
    textBgElement.appendChild(titleElement);

    // Türkçe karakterleri İngilizce karakterlere dönüştüren fonksiyon
    function convertToEnglish(text) {
      var turkishCharacters = {
        ı: "i",
        ğ: "g",
        ü: "u",
        ş: "s",
        ö: "o",
        ç: "c",
        İ: "I",
        Ğ: "G",
        Ü: "U",
        Ş: "S",
        Ö: "O",
        Ç: "C",
      };

      return text
        .replace(/[\u00C0-\u017F]/g, function (c) {
          return turkishCharacters[c] || c;
        })
        .trim()
        .replace(/\s+/g, "");
    }

    var artistLinkElement = document.createElement("a");
    var artistName = convertToEnglish(musicItem.artist);
    artistLinkElement.href = "artist/artist-" + artistName.toLowerCase() + ".html";
    artistLinkElement.textContent = musicItem.artist;
    textBgElement.appendChild(artistLinkElement);

    // Oluşturulan müzik elementini sayfaya ekle
    musicContainer.appendChild(musicElement);
  }
});

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

// Search functionality
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

function searchMusic() {
  const query = searchInput.value.toLowerCase().trim();
  
  const searchBar = document.querySelector('.search-bar');
  if (query !== '') {
    searchBar.classList.add('searching');
  } else {
    searchBar.classList.remove('searching');
    searchResults.style.display = 'none';
    return;
  }

  // Benzersiz sanatçıları ve URL'lerini bul
  const uniqueArtists = [...new Set(musicData.map(music => ({
    name: music.artist,
    url: music.artistUrl
  })))];
  
  // Şarkıları ve sanatçıları filtrele
  const filteredMusic = musicData.filter(music => 
    music.title.toLowerCase().includes(query) || 
    music.artist.toLowerCase().includes(query)
  );

  const filteredArtists = uniqueArtists.filter(artist => 
    artist.name.toLowerCase().includes(query)
  );

  searchResults.style.display = 'block';
  searchResults.innerHTML = '';
  
  // Önce sanatçıları göster
  if (filteredArtists.length > 0) {
    const artistsSection = document.createElement('div');
    artistsSection.classList.add('search-section');
    artistsSection.innerHTML = '<h3 class="search-section-title">Sanatçılar</h3>';
    
    filteredArtists.forEach(artist => {
      const resultItem = document.createElement('div');
      resultItem.classList.add('search-result', 'artist-result');
      
      const artistData = musicData.find(music => music.artist === artist.name);
      const artistImage = artistData ? artistData.artistImage : 'assets/img/artist-profile-pictures/default-artist.jpg';
      
      resultItem.innerHTML = `
        <img src="${artistImage}" alt="${artist.name}">
        <div class="music-info">
          <h3>${artist.name}</h3>
          <h4>Sanatçı</h4>
        </div>
      `;
      
      resultItem.addEventListener('click', () => {
        window.location.href = artist.url;
      });
      
      artistsSection.appendChild(resultItem);
    });
    
    searchResults.appendChild(artistsSection);
  }

  // Sonra şarkıları göster
  if (filteredMusic.length > 0) {
    const songsSection = document.createElement('div');
    songsSection.classList.add('search-section');
    songsSection.innerHTML = '<h3 class="search-section-title">Şarkılar</h3>';
    
    filteredMusic.forEach((music, index) => {
      const resultItem = document.createElement('div');
      resultItem.classList.add('search-result', 'song-result');
      
      resultItem.innerHTML = `
        <img src="/assets/img/album_covers${music.cover}" alt="${music.title}">
        <div class="music-info">
          <h3>${music.title}</h3>
          <h4>${music.artist}</h4>
        </div>
      `;
      
      resultItem.addEventListener('click', () => {
        playMusic(
          music.source,
          `playPauseIcon${musicData.indexOf(music)}`,
          music.title,
          music.artist,
          music.cover,
          musicData.indexOf(music)
        );
        searchResults.style.display = 'none';
        searchInput.value = '';
        searchBar.classList.remove('searching');
      });
      
      songsSection.appendChild(resultItem);
    });
    
    searchResults.appendChild(songsSection);
  }

  // Sonuç bulunamadıysa
  if (filteredMusic.length === 0 && filteredArtists.length === 0) {
    searchResults.innerHTML = '<div class="no-results">Sonuç bulunamadı</div>';
  }
}

// Her karakter girildiğinde arama yap
searchInput.addEventListener('input', searchMusic);

// Input'a focus olduğunda ve içinde yazı varsa sonuçları göster
searchInput.addEventListener('focus', () => {
  if (searchInput.value.trim() !== '') {
    searchMusic();
  }
});

// Sayfa herhangi bir yerine tıklandığında sonuçları gizle
document.addEventListener('click', (e) => {
  if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
    searchResults.style.display = 'none';
    document.querySelector('.search-bar').classList.remove('searching');
  }
});

// Sonuçlar içinde tıklama olayının dışarı yayılmasını engelle
searchResults.addEventListener('click', (e) => {
  e.stopPropagation();
});

