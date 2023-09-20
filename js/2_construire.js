var tracks = [
    {"name":"FIRST FOOD SHOP", "artist":"Polaria Poyon", "path":"media/audio/Polaria Poyon - FIRST FOOD SHOP.mp3"},
    {"name":"Bug Splat", "artist":"XyNo", "path":"media/audio/XyNo - Hexagon Chainbreak - 02 - Bug Splat.mp3"},
    {"name":"Saúde! Opa Opa!", "artist":"Polaria Poyon", "path":"media/audio/Polaria Poyon - Saúde! Opa Opa!.mp3"},
    {"name":"KORE2012", "artist":"XyNo", "path":"media/audio/XyNo - Hexagon Chainbreak - 03 - KORE2012.mp3"},
  ]
  setTracks(tracks);
  preloadTracks();
  nextSong(0);

var videos = {
    6: ["vid1"],
    10:  ["vid2"],
    13: ["vid3"],
    14: ["vid4"],
    19: ["vid5"],
    24: ["vid6"],
  }
setVideos(videos);

setCurrentSection(2);

// Carousel King of Chicago
const carousel = document.getElementById("carousel-koc");
carouselIndex = 0;
carouselImages = [
  "media/2_construire/KoC1.webp",
  "media/2_construire/KoC2.webp",
  "media/2_construire/KoC3.webp",
  "media/2_construire/KoC4.webp",
  "media/2_construire/KoC5.webp",
  "media/2_construire/KoC6.webp",
  "media/2_construire/KoC7.webp",
  "media/2_construire/KoC8.webp",
]
function plusImage(increment){
  carouselIndex += increment;
  
  if(carouselIndex < 0){
    carouselIndex = carouselImages.length - 1;
  } else if (carouselIndex >= carouselImages.length) {
    carouselIndex = 0;
  }
  carousel.src = carouselImages[carouselIndex];
}

function preloadCarousel(){
  for(var i = carouselImages.length; i >= 0; i--){
    carousel.src = carouselImages[i];
  }
}
preloadCarousel();
