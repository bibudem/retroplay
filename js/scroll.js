///// WINDOW RESIZE SCROLLING /////
//var supportsPassive = false;
//try {
//  var opts = Object.defineProperty({}, 'passive', {
//    get: function() {
//      supportsPassive = true;
//    }
//  });
//  window.addEventListener('test', null, opts);
//} catch (e) {}

/**
 * On window resize, make it so the scroll stays on current div
 */
function scrollEventListener() {
  //var options = supportsPassive ? { passive: true } : false;
  window.addEventListener('resize', () => {
    const parent = document.querySelector('.scroll-container');
    var currentChild = parent.children[maxPage - currentPage]
    window.scroll(currentChild.offsetLeft, 0);
  });
 }
scrollEventListener();

// Scroll to start function (called on reload and on mobile when orientation is changed)
function snapToPage(){
  const parent = document.querySelector('.scroll-container');
  var currentChild = parent.children[maxPage - currentPage]
  window.scroll(currentChild.offsetLeft, 0);
}
window.addEventListener("scrollend", (event) => {
  snapToPage();
});

// Disable search to avoid scrolling out of sync
window.addEventListener("keydown",function (e) {
  if (e.keyCode === 114 || (e.ctrlKey && e.keyCode === 70)) { 
      e.preventDefault();
  }
})
var currentPage = 0;
function setVariables() {
  currentPage = 0;
  maxPage = document.getElementsByClassName('scroll-container')[0].childElementCount - 1;
  snapToPage();
}
window.onload = setVariables();

// Prevent phone scroll
window.addEventListener('touchmove', function(e){ e.preventDefault(); });