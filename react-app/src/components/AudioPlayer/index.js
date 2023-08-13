import React, { useState, useRef } from "react";
import DisplaySong from "./DisplaySong";
import ProgressBar from "./ProgressBar";
import Controls from "./Controls";
import "./AudioPlayer.css";

function AudioPlayer({ songs }) {
  const [songIndex, setSongIndex] = useState(0);
  const [currentSong, setCurrentSong] = useState(songs[songIndex]);
  // const [test, setTest] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef();
  // console.log("this is audioRef", audioRef);
  const progressBarRef = useRef();

  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  if (songs.length === 0) return null;

  // console.log("this is state of currentSong", currentSong);
  // console.log("this is songs in audioplayer", songs); // array

  // Testing a hardcoded song to play
  // if (test === false) {
  //   setCurrentSong(songs[2]);
  //   // setCurrentSong(songs[2]["songURL"]);
  //   setTest(true);
  //   return;
  // }
  // console.log("this is current song", currentSong);

  // console.log(duration);
  const handleNext = () => {
    // Default the index to 0 if we've went past all our existing songs
    if (songIndex >= songs.length - 1) {
      setSongIndex(0);
      setCurrentSong(songs[0]);
    }
    // Increment the index and the songindex for current song because we want to go to the next song
    else {
      setSongIndex((prev) => prev + 1);
      setCurrentSong(songs[songIndex + 1]);
    }
  };
  return (
    <div className="audio-player">
      <div className="inner">
        <DisplaySong
          {...{
            currentSong,
            audioRef,
            setDuration,
            progressBarRef,
            handleNext,
          }}
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
            handleNext,
            isPlaying,
            setIsPlaying,
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
