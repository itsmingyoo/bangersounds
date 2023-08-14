import React from "react";
import "./AudioPlayer.css";

function ProgressBar({ progressBarRef, audioRef, timeProgress, duration }) {
  // updating the '0' from audioRef --TO-- '1' from progressBarRef
  const handleProgressChange = () => {
    audioRef.current.currentTime = progressBarRef.current.value;
  };

  // Convert seconds into min:seconds
  const formatTime = (time) => {
    if (time && !isNaN(time)) {
      const minutes = Math.floor(time / 60);
      const formatMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
      const seconds = Math.floor(time % 60);
      const formatSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
      return `${formatMinutes}:${formatSeconds}`;
    }
    return "00:00";
  };

  return (
    <div className="progress-bar">
      {/* CURRENT TIME OF THE SONG */}
      <span className="time current">{formatTime(timeProgress)}</span>
      <input
        type="range"
        ref={progressBarRef}
        defaultValue="0"
        onChange={handleProgressChange} // dynamically finds the value of the current time of the song, now take this value and assign it to the currentTime property of the audio playback -- returns as seconds -- to get currentime property, we need to pass audioRef as a prop
      />

      {/* TOTAL TIME OF THE SONG */}
      <span className="time">{formatTime(duration)}</span>
    </div>
  );
}
export default ProgressBar;
