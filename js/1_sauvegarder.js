var tracks = [
    {"name":"Sinistrous Decay", "artist":"Heosphoros", "path":"media/audio/Heosphoros - Sinistrous_Decay.mp3"},
    {"name":"Triple Point", "artist":"Heosphoros", "path":"media/audio/Heosphoros - Triple Point.mp3"},
  ]
  setTracks(tracks);
  preloadTracks();
  nextSong(0);

var videos = {
  2: ["vid1"],
  5: ["vid2"],
  7: ["vid3"],
  11: ["vid4"],
  15: ["vid5"],
  16: ["vid6"],
}
setVideos(videos);

setCurrentSection(1);