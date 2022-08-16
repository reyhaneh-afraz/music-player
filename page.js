let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");
let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");
let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");
 

let track_index = 0
let isPlaying = false
let updateTimer
 
let tracks = document.createElement('audio')
 
let track_list = [
  {
    name: "All Gone",
    artist: "Gustavo Santolalla",
    image: "./image/img-1.jpg",
    path: "./musics/mus1.mp3" 
  },
  {
    name: "The Stage",
    artist: "Tours",
    image: "./image/img-2.jpg",
    path: "./musics/mus2.mp3"
  },
  {
    name: "Difference Day",
    artist: "Chad Crouch",
    image: "./image/img-3.jpg",
    path: "./musics/mus3.mp3",
  },
  {
    name: "Woo",
    artist: "Rihanaa",
    image: "./image/img-4.jpg",
    path: "./musics/mus4.mp3",
  },
  {
    name: "Dream Brother",
    artist: "Jeff Backley",
    image: "./image/img-5.jpg",
    path: "./musics/mus5.mp3",
  },
  {
    name: "Through Blood",
    artist: "Chad Crouch",
    image: "./image/img-6.jpg",
    
  },
];

function loadTrack(track_index) {
    clearInterval(updateTimer)
    resetValues()
   
    tracks.src = track_list[track_index].path;
    tracks.load();
   
    track_art.style.backgroundImage =
       "url(" + track_list[track_index].image + ")"
    track_name.textContent = track_list[track_index].name
    track_artist.textContent = track_list[track_index].artist;
    now_playing.textContent =
       "PLAYING " + (track_index + 1) + " OF " + track_list.length;
   
    updateTimer = setInterval(seekUpdate, 1000);

    tracks.addEventListener("ended", nextTrack);
  
} 
  function resetValues() {
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
  }

  function playpauseTrack() {
    if (!isPlaying){
         playTrack();}
    else{
         pauseTrack();}
  }
   
  function playTrack() {
    tracks.play();
    isPlaying = true;
   
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
  }
   
  function pauseTrack() {
    tracks.pause();
    isPlaying = false;
   
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
  }
   
  function nextTrack() {
    if (track_index < track_list.length - 1){
      track_index += 1;}
    else{ track_index = 0;}
   
    loadTrack(track_index);
    playTrack();
  }
   
  function prevTrack() {
    if (track_index > 0){
      track_index -= 1 }
    else
    { track_index = track_list.length - 1}

    loadTrack(track_index);
    playTrack();
  }

  function seekTo() {
   var seekTo =  tracks.duration * (seek_slider.value / 100 )
   
    tracks.currentTime = seekTo
  }
   
  function setVolume() {
    tracks.volume = volume_slider.value / 100
  }
   
  function seekUpdate() {
    let seekPosition = 0;
   
    if (!isNaN(tracks.duration)) {
      seekPosition = tracks.currentTime * (100 / tracks.duration)
      seek_slider.value = seekPosition
   

      let currentMinutes = Math.floor(tracks.currentTime / 60);
      let currentSeconds = Math.floor(tracks.currentTime - currentMinutes * 60);
      let durationMinutes = Math.floor(tracks.duration / 60);
      let durationSeconds = Math.floor(tracks.duration - durationMinutes * 60);

      if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
      if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
      if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
      if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }
   
      curr_time.textContent = currentMinutes + ":" + currentSeconds;
      total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
  }

  loadTrack(track_index);