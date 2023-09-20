var tracks = [
  {"name":"O.P.S. 7", "artist":"Game&nbsp;Genie Sokolov", "path":"media/audio/Game Genie Sokolov - Signal Loss - 01 O. P. S 7.mp3"},
  {"name":"Output", "artist":"Game&nbsp;Genie Sokolov", "path":"media/audio/Game Genie Sokolov - Signal Loss - 04 Output.mp3"},
]
setTracks(tracks);
preloadTracks();

nextSong(10);

var drawingSlides = [1];
setDrawingSlides(drawingSlides);

function clickableOverlay(){
  const overlay = document.getElementById("overlay");

  overlay.addEventListener("click", function (e) {
    document.getElementById("first-image").requestFullscreen();
  });;

  overlay.classList.add("show");
  setTimeout(() => {
    overlay.classList.remove("show");
  }, 5000);

}
clickableOverlay();

function introDraw(){
  function introDrawLine(start, offsetX, offsetElbowX, offsetElbowY, right, doubleElbow){
    var path = `M`;
    c1 = {x: start.x + offsetX, y: start.y};
    c2 = {x: c1.x + offsetElbowX, y: c1.y + offsetElbowY};
    end = {x: right, y: c2.y};

    path += addPoint(start.x, start.y);
    path += addPoint(c1.x, c1.y);
    path += addPoint(c2.x, c2.y);
    path += addPoint(end.x, end.y);

    return path;
  }

  var image = document.querySelector("#intro-line-image")
  var svg = document.querySelector('#intro-line-drawing');

  var windowWidth = window.innerWidth;
  var breakPoint = windowWidth / 6;
  var elbowOffset = windowWidth / 80;
  var interval = windowWidth / 120;
  
  svgRect = svg.getBoundingClientRect();
  imgRect = image.getBoundingClientRect();
  var start = svgRect.bottom - window.innerHeight/4;

  line1 = introDrawLine({x:0, y:start}, breakPoint, elbowOffset + 3*interval, elbowOffset + 3*interval, window.innerWidth);
  line2 = introDrawLine({x:0, y:start + interval}, breakPoint, elbowOffset, elbowOffset, window.innerWidth);
  line3 = introDrawLine({x:0, y:start + 2*interval}, breakPoint, elbowOffset, elbowOffset, window.innerWidth);

  var path1 = document.querySelector("#path1");
  var path2 = document.querySelector("#path2");
  var path3 = document.querySelector("#path3");

  path1.setAttribute('d', line1);
  path2.setAttribute('d', line2);
  path3.setAttribute('d', line3);
  svg.classList.add("drawn");
  isDrawn = true;
}

var isDrawn = false;
// Redraw lines if window is resized after they were drawn the first time
function redraw(){
  if(isDrawn){
    introDraw();
  }
}

window.addEventListener('resize', () => {
  redraw();
});
