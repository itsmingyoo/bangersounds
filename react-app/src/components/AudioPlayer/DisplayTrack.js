import React, { useState } from "react";
import "./AudioPlayer.css";

function DisplayTrack({
  currentSong,
  audioRef,
  duration,
  setDuration,
  progressBarRef,
}) {
  // console.log("this is song in displaytrack", currentSong);
  const [loadedMetaData, setLoadedMetaData] = useState(false);

  if (loadedMetaData) {
    // console.log("meta data firing");
    // console.log("this is onloadedmetadata", audioRef.current.duration); // should be 155.715918
    const seconds = audioRef.current.duration;
    // console.log("this is seconds", seconds);
    setDuration(seconds);
    progressBarRef.current.max = seconds;
    // console.log("this is progressbarref max", progressBarRef.current.max);
    // console.log(duration);
  }

  const metaData = () => {
    if (loadedMetaData === false) setLoadedMetaData(true);
  };

  if (!audioRef || !progressBarRef) return null;

  // console.log("AUDIOREFFFF", audioRef);
  // console.log("PROGRESSBARREF", progressBarRef);
  return (
    <div>
      {/* AUDIO PLAYER */}
      <audio
        src={currentSong.songURL}
        ref={audioRef}
        onLoadedMetadata={metaData} // onLoadedMeta data is an event on the <audio /> which will help us display the track duration as soon as the audio metadata loads
      />
      {/* THUMBNAIL */}
      <div className="audio-info">
        <div className="audio-image">
          {currentSong.thumbnail ? (
            <img src={currentSong.thumbnail} alt="audio thumb" />
          ) : (
            <div className="icon-container">
              <span className="audio-icon">{/* insert icon here */}</span>
            </div>
          )}
        </div>
      </div>
      {/* TITLE */}
      <div className="audio-text">
        <p className="title">{currentSong.title}</p>
        <p>{currentSong.artistInfo.displayName}</p>
      </div>
    </div>
  );
}
export default DisplayTrack;
