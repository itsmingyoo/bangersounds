import React from "react";
import { useState } from "react";
import DisplayTrack from "./DisplayTrack";
import ProgressBar from "./ProgressBar";
import Controls from "./Controls";

function AudioPlayer({ songs }) {
  const [currentSong, setCurrentSong] = useState(null);
  const [test, setTest] = useState(false);
  console.log("this is songs in audioplayer", songs);

  if (songs.length === 0) return null;
  if (test === false) {
    setCurrentSong(songs[6]["songURL"]);
    setTest(true);
    return;
  }
  console.log("this is current song", currentSong);
  return (
    <div className="audio-player">
      <div className="inner">
        <Controls />
        <DisplayTrack currentSong={currentSong} />
        <ProgressBar />
      </div>
    </div>
  );
}
export default AudioPlayer;
