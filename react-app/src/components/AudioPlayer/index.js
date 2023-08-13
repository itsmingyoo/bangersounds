import React, { useState, useRef } from "react";
import DisplayTrack from "./DisplaySong";
import ProgressBar from "./ProgressBar";
import Controls from "./Controls";
import "./AudioPlayer.css";

function AudioPlayer({ songs }) {
  const [songIndex, setSongIndex] = useState(0);
  const [currentSong, setCurrentSong] = useState(songs[songIndex]);
  const [test, setTest] = useState(false);
  const audioRef = useRef();
  // console.log("this is audioRef", audioRef);
  const progressBarRef = useRef();

  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  if (songs.length === 0) return null;

  // console.log("this is state of currentSong", currentSong);

  // Testing a hardcoded song to play

  // console.log("this is songs in audioplayer", songs);
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
          {...{
            songs,
            audioRef,
            progressBarRef,
            duration,
            setTimeProgress,
            currentSong,
            songIndex,
            setSongIndex,
            setCurrentSong,
          }}
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
