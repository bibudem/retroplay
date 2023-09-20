function showControls(){
    // Fade in menu
    controls.classList.add("show");
    toggleButtons(true);

    // Fade out after a while
    resetTimeout();
    titleScroll();
}

/**
 * Reset the fade-out timeout every time the user interacts with the controls
 */
function resetTimeout() {
    clearTimeout(fadeTimeout)
    fadeTimeout = setTimeout(() => {  
        controls.classList.remove("show"); 
        toggleButtons(false);
    }, displayTime);
}

function toggleButtons(state){
    startButton.disabled = !state;
    nextButton.disabled = !state;
    pauseButton.disabled = !state;
}

/**
 * Animate title scroll (if title larger than wrapper)
 */
function titleScroll(){
    wrapperWidth = titleWrapper.offsetWidth;
    titleWidth = titleText.offsetWidth;

    if(titleWidth > wrapperWidth - 20){
        titleText.classList.add("audio-title-scroll")
        
    }
    else{
        titleText.classList.remove("audio-title-scroll")
    }
}

/**
 * Play button
 */
document.getElementById("audio-button-start").addEventListener("click", buttonStartAudio);
function buttonStartAudio(){
    isPausedByUser = false;
    startAudio();
    pauseButton.classList.remove("active");
    startButton.classList.add("active");
}
function startAudio(time){
    // Start audio
    audio.load();
    var promise = audio.play();
    audio.volume = 0.3;

    if (promise !== undefined) {
      promise.then(_ => {
        // Autoplay started!
      }).catch(error => {
        // Autoplay did not start
        buttonStopAudio();
      });
    }

    if(time > 0 && time < 60){
        audio.currentTime = time;
    }

    resetTimeout()
}

function preloadTracks(){
    for(var i = 0; i < tracks.length; i++){
        source.src = tracks[i].path;
    }
    source.src = tracks[0].path;
}


/**
 * Mute button
 */
document.getElementById("audio-button-mute").addEventListener("click", buttonStopAudio);
function buttonStopAudio(){
    isPausedByUser = true;
    stopAudio();
    pauseButton.classList.add("active");
    startButton.classList.remove("active");
}
function stopAudio(){
    audio.pause();
    resetTimeout();
}

function showNavButton(){
    navigation_button.classList.add("show");
}

// Variables
const audio = document.getElementById("audio");
const source = document.getElementById("audio-source");
const startButton = document.getElementById("audio-button-start");
const pauseButton = document.getElementById("audio-button-mute");
const nextButton = document.getElementById("audio-button-next");
var isPausedByUser = false;
const titleWrapper = document.getElementById("audio-title-wrapper");
const titleText = document.getElementById("audio-title-text");
const navigation_button = document.getElementById("navigation-button") 
const controls = document.getElementById("audio-controls");
const displayTime = 10000;                      
var tracks = []
var count = -1;
var fadeTimeout;

startButton
pauseButton

function setTracks(trackList){
    tracks = trackList
}
//nextSong();

/**
 * Next button
 */
nextButton.addEventListener("click", nextSong);
function nextSong(time){
    isPausedByUser = false;

    // Iterate count
    count++;
    count %= tracks.length;

    // Set song path
    source.src = tracks[count]["path"];

    // Set texts
    const artistName = document.getElementById("audio-artist-text");
    const songTitle = document.getElementById("audio-title-text");
    artistName.innerHTML = tracks[count]["artist"];
    songTitle.innerHTML = tracks[count]["name"];

    // Display menu
    titleScroll();
    startAudio(time);
    pauseButton.classList.remove("active");
    startButton.classList.add("active");
}

audio.addEventListener('ended', nextSong);