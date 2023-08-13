import React, { useEffect, useState } from "react";
import "./AudioPlayer.css";

function DisplaySong({
  currentSong,
  audioRef,
  setDuration,
  progressBarRef,
  handleNext,
}) {
  const [loadedMetaData, setLoadedMetaData] = useState(false);

  // NOTE * Anytime youre setting a new state that is imported as a prop 'setState' for example here, you must use it in a useEffect else you will get warnings in the dev console.
  useEffect(() => {
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
  }, [loadedMetaData]);

  const metaData = () => {
    if (loadedMetaData === false) setLoadedMetaData(true);
  };

  if (
    !audioRef ||
    !progressBarRef ||
    currentSong === undefined ||
    Object.values(currentSong).length === 0
  )
    return null;
  // console.log("currentsong in displaysong comp", currentSong.songURL);
  // console.log("AUDIOREFFFF", audioRef);
  // console.log("PROGRESSBARREF", progressBarRef);
  return (
    <div className="display-song__container">
      {/* AUDIO PLAYER */}
      <audio
        src={currentSong?.songURL}
        ref={audioRef}
        onLoadedMetadata={metaData} // onLoadedMeta data is an event on the <audio /> which will help us display the track duration as soon as the audio metadata loads
        onEnded={() => handleNext()}
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
export default DisplaySong;
