import React, { useState, useRef } from "react";
import DisplayTrack from "./DisplayTrack";
import ProgressBar from "./ProgressBar";
import Controls from "./Controls";
import "./AudioPlayer.css";

function AudioPlayer({ songs }) {
  const [currentSong, setCurrentSong] = useState(null);
  const [test, setTest] = useState(false);
  // console.log("this is songs in audioplayer", songs);
  const audioRef = useRef();
  // console.log("this is audioRef", audioRef);
  const progressBarRef = useRef();

  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  if (songs.length === 0) return null;

  // console.log("this is state of currentSong", currentSong);

  // Testing a hardcoded song to play
  if (test === false) {
    setCurrentSong(songs[2]);
    // setCurrentSong(songs[2]["songURL"]);
    setTest(true);
    return;
  }
  // console.log("this is current song", currentSong);

  // console.log(duration);
  return (
    <div className="audio-player">
      <div className="inner">
        <DisplayTrack
          {...{ currentSong, audioRef, duration, setDuration, progressBarRef }}
        />
        <Controls
          {...{ audioRef, progressBarRef, duration, setTimeProgress }}
        />
        <ProgressBar
          {...{ progressBarRef, audioRef, timeProgress, duration }}
        />

        {/* Refactored version with spread above */}
        {/* <DisplayTrack currentSong={currentSong} audioRef={audioRef} />
        <Controls audioRef={audioRef} />
        <ProgressBar progressBarRef={progressBarRef} /> */}
      </div>
    </div>
  );
}
export default AudioPlayer;
