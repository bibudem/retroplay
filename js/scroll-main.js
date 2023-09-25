
// Set the list of videos to allow auto play/stop on scroll
var videos = {};
var currentVideo = -1;
var isAudioPaused = false;
function setVideos(videoList){
    videos = videoList;
    switchMedia();
}

function switchMedia(){
  // Pause all videos
  if(currentVideo != -1){
    var videoTable = videos[currentVideo]
    for(var i = 0; i < videoTable.length; i++){
      document.getElementById(videoTable[i]).pause();
    }
    currentVideo = -1;
  }

  // Play video on new page
  if(currentPage in videos){
    var videoTable = videos[currentPage];
    for(var i = 0; i < videoTable.length; i++){
      document.getElementById(videoTable[i]).play();
    }
    audio.pause();
    isAudioPaused = true;
    currentVideo = currentPage;
  }
  // Resume audio if necessary 
  else if(isAudioPaused){
    if(!isPausedByUser){
      audio.play();
      isAudioPaused = false;
    }
  }
}

// Checks if a video has an audio track
function hasAudio (video) {
  return video.mozHasAudio ||
  Boolean(video.webkitAudioDecodedByteCount) ||
  Boolean(video.audioTracks && video.audioTracks.length);
}

// Set captions to appear
var captions = {}
function setCaptions(captionsList){
  captions = captionsList;
}

// Set slide where drawing appears (intro)
var drawingSlides = [];
function setDrawingSlides(slideList){
  drawingSlides = slideList;
}

let isFlashing = false;
let timeoutId = null;
const scrollButtonRight = document.getElementById('right-scroll-button');
const scrollButtonLeft = document.getElementById('left-scroll-button');

function toggleScrollButtons(bool) {
  scrollButtonRight.disabled = bool;
  scrollButtonLeft.disabled = bool;
}

function startFlashing() {
  if (isFlashing) return;

  isFlashing = true;
  timeoutId = setInterval(() => {
    scrollButtonLeft.style.filter = 'brightness(50%)';
    setTimeout(() => {
      scrollButtonLeft.style.filter = '';
    }, 200);
  }, 2000);
}

function stopFlashing() {
  if (!isFlashing) return;

  isFlashing = false;
  clearInterval(timeoutId);
  scrollButtonLeft.style.filter = '';
}

function buttonScroll(left){
  var width = -window.innerWidth;

  if(left){
    currentPage++;
  } else {
    width = -width;
    currentPage--;
  }

  // Auto play/stop videos in the list
  switchMedia();

  // Auto-appear captions on page "se rapprocher"
  if(currentPage in captions){
    var captionTable = captions[currentPage];
    for(var i = 0; i < captionTable.length; i++){
      document.getElementById(captionTable[i]).classList.add("show");
    }
  }
  
  // Auto-draw lines on page "intro"
  if(drawingSlides.includes(currentPage)){
    introDraw();
  }

  window.scrollBy({
    top: 0,
    left: width,
    behavior: 'smooth'
  });
}

// Scroll button functionality
function scrollButton() {
  scrollButtonRight.addEventListener('click', () => {
    // Disable button when it is clicked
    toggleScrollButtons(true);

    // Scroll window right
    if (currentPage > 0) {
      buttonScroll(false);
    }

    // Re-enable the button once scrolling has finished
    setTimeout(() => {
      toggleScrollButtons(false);
      snapToPage();
    }, 1000);


  })

  scrollButtonLeft.addEventListener('click', () => {
    // Disable button when it is clicked
    toggleScrollButtons(true);

    // Scroll window left
    if (currentPage < maxPage) {
      buttonScroll(true);
      stopFlashing();
      timeoutId = setTimeout(startFlashing, 10000);
    } 
    if (currentPage == maxPage) {
      finishSection();
    }
    // Re-enable the button once scrolling has finished
    setTimeout(() => {
      toggleScrollButtons(false);
      snapToPage();
    }, 1000);
  
  });



  scrollButtonRight.classList.add('fade-in');
  scrollButtonLeft.classList.add('fade-in');
}
timeoutId = setTimeout(startFlashing, 10000);


// Epilogue / section progression functions
var progress=[];
var epilogueUnlocked;
var currentSection = -1;
function setCurrentSection(section){
  currentSection = section;
}

function finishSection(){
  if(currentSection!= -1 && !progress.includes(currentSection)){
    progress.push(currentSection);
  }

  if(!epilogueUnlocked){
    epilogueCheck();
  }
  
  saveProgress();
}

function epilogueCheck(){
  // Unlock epilogue if all sections are done
  if(progress.includes(1) && progress.includes(2) && progress.includes(3)){
    epilogueUnlocked = true;
    epilogueUpdateUI();
  }
}

function epilogueUpdateUI(){
  // Set texts to orange epilogue
  epilogueTexts = document.getElementsByClassName("menu-text-epilogue");
  for(var i = 0; i < epilogueTexts.length; i++){
    epilogueTexts[i].style.color = "var(--orange-font)";
    epilogueTexts[i].innerHTML = "Epilogue";
  }

  // Allow hover animation on epilogue tv
  epilogueButtons = document.querySelectorAll(".menu-button-container-img.locked")
  epilogueButtons.forEach(element => {
    element.classList.remove("locked");
    element.src = 'media/menu/tv-01.png';
  });
  hoverListeners();
}

function loadProgress(){
  progress = JSON.parse(localStorage.getItem("progress"));

  if(progress == null){
    progress = [];
  }

  epilogueUnlocked = JSON.parse(localStorage.getItem("epilogue"));
  if(epilogueUnlocked){
    epilogueUpdateUI();
  }

  greyTextSections();
}
loadProgress();

function saveProgress(){
  localStorage.setItem("progress", JSON.stringify(progress));
  localStorage.setItem("epilogue", JSON.stringify(epilogueUnlocked));
  greyTextSections();
}

function greyTextSections(){
  for(var i = 1; i <= 3; i++){
    if(progress.includes(i)){
      var menuText = document.getElementsByClassName("menu-text-" + i);
      for(var j = 0; j < menuText.length; j++){
        menuText[j].style.color="grey";
      }
    }
  }
}

function epilogue(){
  if(epilogueUnlocked == true){
    window.location.href='4_epilogue.html';
  }
}

function epilogueEN(){
  if(epilogueUnlocked == true){
    window.location.href='en_4_epilogue.html';
  }
}


document.addEventListener('fullscreenchange', exitHandler);
document.addEventListener('webkitfullscreenchange', exitHandler);
document.addEventListener('mozfullscreenchange', exitHandler);
document.addEventListener('MSFullscreenChange', exitHandler);

function exitHandler() {
  if (!document.fullscreenElement && !document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
      snapToPage();
  }
} 

