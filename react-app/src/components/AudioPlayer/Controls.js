import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  IoPlayBackSharp,
  IoPlayForwardSharp,
  IoPlaySkipBackSharp,
  IoPlaySkipForwardSharp,
  IoPlaySharp,
  IoPauseSharp,
} from "react-icons/io5";
import "./AudioPlayer.css";
import { useSelector, useDispatch } from "react-redux";
import { playUserSongAction, setPlayingState } from "../../store/songs";

const Controls = ({
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
  isPlayingState,
  prevSong,
  setPrevSong,
  playSong,
}) => {
  const dispatch = useDispatch();
  // const [isPlaying, setIsPlaying] = useState(false);
  // const [volume, setVolume] = useState(40);
  // const [mute, setMute] = useState(false);
  // const song = useSelector((s) => s.songs.CurrentlyPlaying);
  // const isPlayingStateSelector = useSelector((s) => s.songs.isPlayingState);
  // Trigger a reanimation change to update the state/browser to display the current time and the range progress -- setInterval() can be used but, requestAnimatonFrame is much more efficient and smoother for repeated animations

  // Trigger the api once the playback is ongoing in the useEffect hook
  const playAnimationRef = useRef();

  //! useCallback hook is used to memoize the function and optimize performance by preventing unnecessary re-renders when the component updates. The [] empty dependency array indicates that this callback doesn't depend on any external variables, so it won't change across renders

  //* REPEAT FUNCTION HANDLES THE PROGRESS / TIME BAR
  const repeat = useCallback(() => {
    if (Object.values(currentSong).length > 0) {
      //! Object.values(currentSong).length > 0 returns a bug for some reason, so we just check if there are any values. -- its not breaking anymore, 'Object.values(currentSong) > 0' broke my progress bar, so it never hit this if statement so i have to add .length, but it did fix the error of when it was just '(currentSong) ...code to execute' it would break at the next line 'const currentTime = audioRef.current.currentTime'
      const currentTime = audioRef.current.currentTime;
      setTimeProgress(currentTime);
      progressBarRef.current.value = currentTime;
      progressBarRef.current.style.setProperty(
        "--range-progress",
        `${(progressBarRef.current.value / duration) * 100}%`
      );

      playAnimationRef.current = requestAnimationFrame(repeat);
      // ***requestAnimationFrame returns the request-id to assign to playAnimationRef.current which will allow us to cancel the request once we pause the playback
      //! instantiating an animation loop using requestAnimationFrame function in react
      //! playAnimationRef.current holds the request animation frame
      //! requestAnimationFrame takes a callback 'repeat' and schedules a single animation frame to be executed before the next repaint
    }
  }, []);

  // USE EFFECT FOR PLAY / PAUSE TO CONTINUE / CANCEL PROGRESS BAR ANIMATION
  useEffect(() => {
    if (isPlayingState) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [playSong, isPlayingState, audioRef, repeat, isPlaying]);

  if (!currentSong || currentSong === null) return null;

  // BUTTON FUNCTIONS
  const togglePlayPause = async () => {
    if (isPlayingState) dispatch(setPlayingState(false));
    else setIsPlaying(true);
    // await dispatch(playUserSongAction(currentSong));
    // await dispatch(setPlayingState(!isPlayingState));
    let res = await dispatch(setPlayingState(!isPlayingState));
    console.log(
      "this is res of playingstate after you clicked the audio player play button",
      res.boolean
    );
  };
  const skipForward = () => {
    audioRef.current.currentTime += 10;
  };
  const skipBackward = () => {
    audioRef.current.currentTime -= 10;
  };
  const handlePrevious = () => {
    if (songIndex === 0) {
      let lastSongIndex = songs.length - 1;
      setSongIndex(lastSongIndex);
      setCurrentSong(songs[lastSongIndex]);
    } else {
      setSongIndex((prev) => prev - 1);
      setCurrentSong(songs[songIndex - 1]);
    }
  };
  return (
    <div className="controls-container">
      {/* CONTROL BUTTONS */}
      <div className="controls">
        <button onClick={handlePrevious}>
          <IoPlaySkipBackSharp />
        </button>

        <button onClick={skipBackward}>
          <IoPlayBackSharp />
        </button>

        <button onClick={togglePlayPause}>
          {/* {isPlaying ? <IoPauseSharp /> : <IoPlaySharp />} */}
          {isPlayingState ? <IoPauseSharp /> : <IoPlaySharp />}
          {/* {isPlayingState ? "PAUSE" : "PLAY"} */}
        </button>

        <button onClick={skipForward}>
          <IoPlayForwardSharp />
        </button>

        <button onClick={handleNext}>
          <IoPlaySkipForwardSharp />
        </button>
      </div>

      {/* VOLUME REFACTORED INTO ITS OWN COMPONENT */}
      {/* <div className="volume">
        <button onClick={() => setMute((prev) => !prev)}>
          {mute || volume < 5 ? (
            <IoMdVolumeOff />
          ) : volume < 40 ? (
            <IoMdVolumeLow />
          ) : (
            <IoMdVolumeHigh />
          )}
        </button>
        <input
          type="range"
          min={0}
          max={100}
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
          style={{
            background: `linear-gradient(to right, #f50 ${volume}%, #ccc ${volume}%)`,
          }}
        />
      </div> */}
    </div>
  );
};
export default Controls;
