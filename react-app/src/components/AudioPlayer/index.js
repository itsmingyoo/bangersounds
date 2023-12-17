import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import DisplaySong from "./DisplaySong";
import ProgressBar from "./ProgressBar";
import Controls from "./Controls";
import VolumeBar from "./VolumeBar";
import { playUserSongAction, setPrevSongAction } from "../../store/songs";
import "./AudioPlayer.css";

function AudioPlayer() {
  const dispatch = useDispatch();

  const songs = useSelector((s) => Object.values(s.songs.Songs));
  const isPlayingState = useSelector((s) => s.songs.isPlaying);
  const currentlyPlaying = useSelector((s) => s.songs.CurrentlyPlaying);
  const previousSong = useSelector((s) => s.songs.PreviousSong);

  // USEREF
  const audioRef = useRef();
  const progressBarRef = useRef();

  // Default song to bangersounds library of songs
  const [songIndex, setSongIndex] = useState(0);
  const [currentSong, setCurrentSong] = useState(songs[songIndex]);
  const [prevSong, setPrevSong] = useState(null);

  // LOCAL STATE - States that audio player components depend on to render up-to-date progress-bar/meta data
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  if (songs.length === 0 || Object.values(currentlyPlaying) === 0) return null;

  const handleNext = () => {
    dispatch(setPrevSongAction(currentlyPlaying));
    const song = songs[Math.floor(Math.random() * songs.length)];
    dispatch(playUserSongAction(song));
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
            prevSong,
            setPrevSong,
            currentlyPlaying,
            isPlayingState,
            playUserSongAction,
            setPrevSongAction,
            previousSong,
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
            duration,
            isPlayingState,
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
