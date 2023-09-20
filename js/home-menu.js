/**
 * Scripted website home menu.
 * Scrolls after credits, music starts on interaction with tv button.
 * Ends with sections menu.
 */

///// SCRIPT /////
// Home menu variables
var tv_switch = document.getElementById("switch")
var scrollDelay = 10000;

// Do not show audio controls at beginning in home menu
var tracks = [
  {"name":"O.P.S. 7", "artist":"Game&nbsp;Genie Sokolov", "path":"media/audio/Game Genie Sokolov - Signal Loss - 01 O. P. S 7.mp3"},
]
setTracks(tracks)

// 1 - CREDITS (5s)
// 2 - SCROLL TO TV 

 setTimeout(() => {
  
     scriptedScroll();
   }, scrollDelay);

// 3 - WAIT FOR BUTTON PUSH
tv_switch.addEventListener("click", start);
function start() {
    // Show image (defined in css)
    // Show audio controls

    showNavButton();
    showControls();
    nextSong(0);

    // Scroll to menu slide
    setTimeout(() => {
      scriptedScroll();        

        // 4 - Final screen: section selection. Draw menu lines
        menuDrawing();
      }, scrollDelay);
}

function menuDrawing(){
  isDrawn = true;
  const img1 = document.querySelector('#img1');
  const img2 = document.querySelector('#img2');
  const img3 = document.querySelector('#img3');
  const img4 = document.querySelector('#img4');
  var p1 = img1.getBoundingClientRect();
  var p2 = img2.getBoundingClientRect();
  var p3 = img3.getBoundingClientRect();
  var p4 = img4.getBoundingClientRect();
  var imgSize = Math.round(img1.offsetWidth / 2);
  drawThreeLines(imgSize, p1, p2, p3, p4);
}

function scriptedScroll(){
    // Scroll window
    window.scrollBy({
        top: 0,
        left: -window.innerWidth,
        behavior: 'smooth'
      });
    currentPage++;
}

hoverListeners();

var isDrawn = false;
// Redraw lines if window is resized after they were drawn the first time
function redraw(){
  if(isDrawn){
    menuDrawing();
  }
}

window.addEventListener('resize', () => {
  redraw();
});

// Fade-in title at start
function fadeInTitles(){
  const titles = document.getElementsByClassName("credits");
  for(var i = 0; i < titles.length; i++){
    titles[i].classList.add("fade-in");
  }
}
fadeInTitles();

