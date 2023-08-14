import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DisplaySong from "./DisplaySong";
import ProgressBar from "./ProgressBar";
import Controls from "./Controls";
import VolumeBar from "./VolumeBar";
import { setPlayingState } from "../../store/songs";
import "./AudioPlayer.css";

function AudioPlayer({ songs, isPlayingState, currentlyPlaying }) {
  const dispatch = useDispatch();

  // STATE FOR SONG INFO & IF ITS PLAYING
  // const playSong = useSelector((s) => s.songs.CurrentlyPlaying);
  // const isPlayingState = useSelector((s) => s.songs.isPlaying);

  // USEREF
  const audioRef = useRef();
  const progressBarRef = useRef();

  // Default song to bangersounds library of songs
  const [songIndex, setSongIndex] = useState(0);
  const [currentSong, setCurrentSong] = useState(songs[songIndex]);
  const [prevSong, setPrevSong] = useState(null);

  // LOCAL STATE
  // States that audio player components depend on to render up-to-date progress-bar/meta data
  // const [isPlaying, setIsPlaying] = useState(false); // converted to state
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  // Eliminates Infinite Loop
  // useEffect(() => {
  //   if (Object.values(currentlyPlaying).length > 0) {
  //     setCurrentSong(currentlyPlaying);
  //     // setIsPlaying(true);
  //     dispatch(setPlayingState(true));
  //   } else {
  //     setCurrentSong(songs[songIndex]);
  //   }
  //   // console.log("use effect currentsong", currentSong);

  //   // if (isPlayingState) setIsPlaying(isPlayingState);
  //   // else setIsPlaying(isPlayingState);
  // }, [currentlyPlaying, isPlayingState]);

  if (songs.length === 0 || Object.values(currentlyPlaying) === 0) return null;

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
            // isPlaying,
            // setIsPlaying,
            prevSong,
            setPrevSong,
            // playSong,
            currentlyPlaying,
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
            currentlyPlaying,
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
