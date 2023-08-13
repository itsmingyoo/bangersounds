import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  IoPlayBackSharp,
  IoPlayForwardSharp,
  IoPlaySkipBackSharp,
  IoPlaySkipForwardSharp,
  IoPlaySharp,
  IoPauseSharp,
} from "react-icons/io5";
import { IoMdVolumeHigh, IoMdVolumeOff, IoMdVolumeLow } from "react-icons/io";
import "./AudioPlayer.css";

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
}) => {
  // const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(40);
  const [mute, setMute] = useState(false);

  // Trigger a reanimation change to update the state/browser to display the current time and the range progress -- setInterval() can be used but, requestAnimatonFrame is much more efficient and smoother for repeated animations

  // Trigger the api once the playback is ongoing in the useEffect hook
  const playAnimationRef = useRef();

  // useCallback hook is used to memoize the function and optimize performance by preventing unnecessary re-renders when the component updates. The [] empty dependency array indicates that this callback doesn't depend on any external variables, so it won't change across renders
  const repeat = useCallback(() => {
    // console.log("run");
    const currentTime = audioRef.current.currentTime;
    setTimeProgress(currentTime);
    progressBarRef.current.value = currentTime;
    progressBarRef.current.style.setProperty(
      "--range-progress",
      `${(progressBarRef.current.value / duration) * 100}%`
    );

    //! instantiating an animation loop using requestAnimationFrame function in react
    //! playAnimationRef.current holds the request animation frame
    //! requestAnimationFrame takes a callback 'repeat' and schedules a single animation frame to be executed before the next repaint
    // ***requestAnimationFrame returns the request-id to assign to playAnimationRef.current which will allow us to cancel the request once we pause the playback
    playAnimationRef.current = requestAnimationFrame(repeat);
  }, []);

  // USE EFFECT FOR PLAY / PAUSE TO CONTINUE / CANCEL PROGRESS BAR ANIMATION
  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    // I'm assuming in this refactor (since it works the same as below) it will hit the 'if' or the 'else' and apply this request animation to be the current reference for the playanimation
    playAnimationRef.current = requestAnimationFrame(repeat);

    // * INITIAL SETUP - NOW WE CAN REFACTOR TO THE ABOVE
    //   //! instantiating an animation loop using requestAnimationFrame function in react
    //   //! playAnimationRef.current holds the request animation frame
    //   //! requestAnimationFrame takes a callback 'repeat' and schedules a single animation frame to be executed before the next repaint
    //   // ***requestAnimationFrame returns the request-id to assign to playAnimationRef.current which will allow us to cancel the request once we pause the playback
    //   playAnimationRef.current = requestAnimationFrame(repeat);
    // } else {
    //   audioRef.current.pause();

    //   //! cancel the previous scheduled animation request - by request-id
    //   cancelAnimationFrame(playAnimationRef.current);
    // }
  }, [isPlaying, audioRef, repeat]);
  useEffect(() => {
    if (audioRef) {
      audioRef.current.volume = volume / 100; // dividing by 100 here bc the max value of the property in audioRef is 1, so this is to make it in sync
      audioRef.current.muted = mute;
    }
  }, [volume, audioRef, mute]);

  // BUTTON FUNCTIONS
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
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
  //   // Default the index to 0 if we've went past all our existing songs
  //   if (songIndex >= songs.length - 1) {
  //     setSongIndex(0);
  //     setCurrentSong(songs[0]);
  //   }
  //   // Increment the index and the songindex for current song because we want to go to the next song
  //   else {
  //     setSongIndex((prev) => prev + 1);
  //     setCurrentSong(songs[songIndex + 1]);
  //   }
  // };

  return (
    <div className="controls-container">
      <div className="controls">
        <button onClick={handlePrevious}>
          <IoPlaySkipBackSharp />
        </button>

        <button onClick={skipBackward}>
          <IoPlayBackSharp />
        </button>

        <button onClick={togglePlayPause}>
          {isPlaying ? <IoPauseSharp /> : <IoPlaySharp />}
        </button>

        <button onClick={skipForward}>
          <IoPlayForwardSharp />
        </button>

        <button onClick={handleNext}>
          <IoPlaySkipForwardSharp />
        </button>
      </div>
      <div className="volume">
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
      </div>
    </div>
  );
};
export default Controls;
