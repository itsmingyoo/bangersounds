import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import DisplaySong from "./DisplaySong";
import ProgressBar from "./ProgressBar";
import Controls from "./Controls";
import VolumeBar from "./VolumeBar";
import "./AudioPlayer.css";

function AudioPlayer({ songs }) {
  const playSong = useSelector((s) => s.songs.CurrentlyPlaying);
  const isPlayingState = useSelector((s) => s.songs.isPlaying);

  const audioRef = useRef();
  const progressBarRef = useRef();

  // Default song to bangersounds library of songs
  const [songIndex, setSongIndex] = useState(0);
  const [currentSong, setCurrentSong] = useState(songs[songIndex]);
  const [prevSong, setPrevSong] = useState(null);

  // LOCAL STATE
  // States that audio player components depend on to render up-to-date progress-bar/meta data
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  // Eliminates Infinite Loop
  useEffect(() => {
    // if playSong exists, set currentSong prop -- else set default to first song in library
    if (Object.values(playSong).length > 0) {
      setCurrentSong(playSong);
      setIsPlaying(true);
    } else {
      setCurrentSong(songs[songIndex]);
    }
    // console.log("use effect currentsong", currentSong);

    // if (isPlayingState) setIsPlaying(isPlayingState);
    // else setIsPlaying(isPlayingState);
  }, [playSong /*isPlayingState*/]);

  if (songs.length === 0 || Object.values(playSong) === 0) return null;

  // ALL CONSOLE LOGS GO here
  // console.log("currentSong: ", currentSong);
  // console.log("playSong: ", playSong);
  // console.log("isPlayingState: ", isPlayingState); // no longer listening to this state
  // console.log("currentSong: ", currentSong);

  const handleNext = () => {
    // Default the index to 0 if we've went past all our existing songs
    if (songIndex >= songs.length - 1) {
      setSongIndex(0);
      setCurrentSong(songs[0]);
    }
    // Increment the index and the songindex for playSong because we want to go to the next song
    else {
      setSongIndex((prev) => prev + 1);
      setCurrentSong(songs[songIndex + 1]);
    }
  };

  return (
    <div className="audio-player">
      <div className="inner">
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
            prevSong,
            setPrevSong,
            playSong,
            isPlayingState,
          }}
        />
        <ProgressBar
          {...{ progressBarRef, audioRef, timeProgress, duration }}
        />
        <VolumeBar {...{ audioRef }} />
        <DisplaySong
          {...{
            currentSong,
            audioRef,
            setDuration,
            progressBarRef,
            handleNext,
          }}
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
