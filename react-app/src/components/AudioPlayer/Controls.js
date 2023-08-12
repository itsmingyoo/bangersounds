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

const Controls = ({ audioRef, progressBarRef, duration, setTimeProgress }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  // Trigger a reanimation change to update the state/browser to display the current time and the range progress -- setInterval() can be used but, requestAnimatonFrame is much more efficient and smoother for repeated animations

  // Trigger the api once the playback is ongoing in the useEffect hook
  const playAnimationRef = useRef();

  // useCallback hook is used to memoize the function and optimize performance by preventing unnecessary re-renders when the component updates. The [] empty dependency array indicates that this callback doesn't depend on any external variables, so it won't change across renders
  const repeat = useCallback(() => {
    // console.log("run"); // didnt work
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

  return (
    <div className="controls-container">
      <div className="controls">
        <button>
          <IoPlaySkipBackSharp />
        </button>
        <button>
          <IoPlayBackSharp />
        </button>
        <button onClick={togglePlayPause}>
          {isPlaying ? <IoPauseSharp /> : <IoPlaySharp />}
        </button>
        <button>
          <IoPlayForwardSharp />
        </button>
        <button>
          <IoPlaySkipForwardSharp />
        </button>
      </div>
    </div>
  );
};
export default Controls;
