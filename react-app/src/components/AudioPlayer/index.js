import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import DisplaySong from "./DisplaySong";
import ProgressBar from "./ProgressBar";
import Controls from "./Controls";
import "./AudioPlayer.css";

function AudioPlayer({ songs }) {
  const playSong = useSelector((s) => s.songs.CurrentlyPlaying);

  const [songIndex, setSongIndex] = useState(0);
  const [currentSong, setCurrentSong] = useState(songs[songIndex]);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef();
  const progressBarRef = useRef();
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (playSong) setCurrentSong(playSong);
  }, [playSong]);

  if (songs.length === 0) return null;

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
