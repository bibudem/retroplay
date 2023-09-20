///// LINE DRAWINGS /////
// Line drawing functions
function drawLine(containerRect, offsetX, offsetY, img1Rect, img2Rect, deltaY1, widthFactor) {
  const start = { x: -containerRect.left + (img1Rect.left + offsetX), y: -containerRect.top + img1Rect.bottom + offsetY };
  const end = { x: -containerRect.left + (img2Rect.left), y: (-containerRect.top + img2Rect.bottom) - 30 };
  const c1 = { x: start.x, y: start.y + deltaY1 };

  var dX = (end.x - start.x) * widthFactor;
  const c2 = { x: c1.x + dX, y: c1.y };
  const c3 = { x: c2.x, y: end.y };

  var path = `M`;
  path += addPoint(start.x, start.y);
  path += addPoint(c1.x, c1.y);
  path += addPoint(c2.x, c2.y);
  path += addPoint(c3.x, c3.y);
  path += addPoint(end.x, end.y);

  return path;
}
function addPoint(x, y) {
  result = x + ` ` + y + ` `;
  return result;
}
function drawThreeLines(imgSize, startImg, endImg1, endImg2, endImg3) {
  const svg = document.querySelector('#menu-line');
  const container = document.querySelector("#menu-container1");
  const cRect = container.getBoundingClientRect();

  line1 = drawLine(cRect, imgSize, 0, startImg, endImg1, 26, 0.7);
  line2 = drawLine(cRect, imgSize-imgSize/6, 0, startImg, endImg2, 32, 0.75);
  line3 = drawLine(cRect, imgSize-imgSize/3, 0, startImg, endImg3, 20, 0.67);

  const path1 = document.querySelector("#path1");
  const path2 = document.querySelector("#path2");
  const path3 = document.querySelector("#path3");

  path1.setAttribute('d', line1);
  path2.setAttribute('d', line2);
  path3.setAttribute('d', line3);
  svg.classList.add("drawn");
}

///// TV BUTTONS /////
// Preload button image
this.addEventListener("DOMContentLoaded", preloadImages, true);
function preloadImages(e) {
  var imageArray = new Array("media/menu/tv_snow-01.png");

  for (var i = 0; i < imageArray.length; i++) {
      var tempImage = new Image();
      tempImage.src = imageArray[i];
  }
}

// Animate image buttons
const tvImages = [ 'media/menu/tv_snow-01.png', 'media/menu/tv_snow-02.png', 'media/menu/tv_snow-03.png', 'media/menu/tv_snow-04.png', 'media/menu/tv_snow-05.png' ];
const animationIntervals = {};

function startAnimation(img) {
  animationIntervals[img.id] = setInterval(() => {
    img.src = tvImages[(++img.dataset.index) % tvImages.length];
  }, 100);
}

function stopAnimation(img) {
  clearInterval(animationIntervals[img.id]);
}

// Event listeners
// Animate when mouse is on the tv
function hoverListeners(){
  var imgElements = document.querySelectorAll('.menu-button-container-img:not(.locked)');
  imgElements.forEach(imgElement => {
    imgElement.dataset.index = 0;
    imgElement.addEventListener('mouseenter', () => {
      startAnimation(imgElement);
    });
    
    imgElement.addEventListener('mouseleave', () => {
      stopAnimation(imgElement);
    });
  });
  // Return to original tv image when mouse leaves
  imgElements.forEach(img => {
    img.addEventListener('mouseout', () => {
      img.src = 'media/menu/tv-01.png';
    });
  });
}
