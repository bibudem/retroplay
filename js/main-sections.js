var maxPage = document.getElementsByClassName("page-container").length - 1;
var parent = document.getElementsByClassName('scroll-container')[0];

window.onload = setTimeout(() => {
  hideLoader();
}, 1000);
     
function hideLoader(){
  document.getElementById("page-loader-indicator").style.display ="none";
  document.getElementById("page-loader-background").style.display ="none";
  parent.style.visibility = "visible";
  initMainSection();
}

function initMainSection(){
  // Set the total document width
  
  var rightmostChild = parent.lastElementChild;
  window.scroll(rightmostChild.offsetLeft, 0);

  showNavButton();
  showControls();
  scrollButton();
  
  var imageList = document.getElementsByClassName("fs-image")
  for(var i = 0; i < imageList.length; i++){
      imageList[i].addEventListener("click", function (e) {
          if (this.requestFullScreen) {
            this.requestFullScreen();
          } else if (this.mozRequestFullScreen) {
            this.mozRequestFullScreen();
          } else if (this.webkitRequestFullScreen) {
            this.webkitRequestFullScreen();
          }
        });;
  }
}

hoverListeners();

