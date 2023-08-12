import React, { useState, useRef } from "react";
import DisplayTrack from "./DisplayTrack";
import ProgressBar from "./ProgressBar";
import Controls from "./Controls";

function AudioPlayer({ songs }) {
  const [currentSong, setCurrentSong] = useState(null);
  const [test, setTest] = useState(false);
  // console.log("this is songs in audioplayer", songs);
  const audioRef = useRef();
  // console.log("this is audioRef", audioRef);

  if (songs.length === 0) return null;
  if (test === false) {
    setCurrentSong(songs[2]["songURL"]);
    setTest(true);
    return;
  }
  // console.log("this is current song", currentSong);
  return (
    <div className="audio-player">
      <div className="inner">
        <DisplayTrack currentSong={currentSong} audioRef={audioRef} />
        <Controls audioRef={audioRef} />
        <ProgressBar />
      </div>
    </div>
  );
}
export default AudioPlayer;
