var tracks = [
    {"name":"Electricity Flows", "artist":"Remute", "path":"media/audio/Remute - Electricity Flows.mp3"},
    {"name":"The Ritual", "artist":"Remute", "path":"media/audio/Remute - The Ritual.mp3"},
  ]
  setTracks(tracks);
  preloadTracks();
  nextSong(0);

var videos = {
  5: ["vid1"],
  8: ["vid2"],
  9: ["vid3"],
}
setVideos(videos);

var captionsAppear = {
  14: ["cap1", "cap2"],
  15:  ["cap3", "cap4"],
  16: ["cap5", "cap6"],
}
setCaptions(captionsAppear);

setCurrentSection(3);