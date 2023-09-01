import React, { useEffect, useState } from "react";
import "./AudioPlayer.css";

function DisplaySong({
  audioRef,
  setDuration,
  progressBarRef,
  handleNext,
  currentlyPlaying,
  duration,
  isPlayingState,
}) {
  const [loadedMetaData, setLoadedMetaData] = useState(false);

  const metaData = () => {
    if (loadedMetaData === false) setLoadedMetaData(true);
  };

  useEffect(() => {
    if (loadedMetaData) {
      const seconds = audioRef.current.duration;
      setDuration(seconds);
      progressBarRef.current.max = seconds;
      // console.log("IF - seconds", seconds); // nan - this was NaN bc we weren't setting loadedmetadata state back to false so that the song can fetch the new metadata again
      // console.log("IF - duration", duration); // duration
      // console.log("IF - progressbarref.max", progressBarRef.current.max);
    }
    // console.log("duration", duration); // duration
    // console.log("progressbarref.max", progressBarRef.current.max);
  }, [loadedMetaData]);

  useEffect(() => {
    setLoadedMetaData(false);
    // Update audioRef and progressBarRef when currentlyPlaying changes
    // Reset loadedMetaData when the song changes, when setting the state of loadedmetadata back to false, it can then allow the component to re-fetch and re-load the metadata when the audio source changes.
    // TLDR this allows onLoadedMetadata to fire again and grab the correct meta data to render that updated information
  }, [currentlyPlaying]);

  if (!audioRef || !progressBarRef || currentlyPlaying === undefined || Object.values(currentlyPlaying).length === 0)
    return null;
  return (
    <div className="display-song__main-container">
      <div className="display-song__container">
        {/* AUDIO PLAYER */}
        <audio
          src={currentlyPlaying?.songURL}
          ref={audioRef}
          onLoadedMetadata={metaData} // onLoadedMeta data is an event on the <audio /> which will help us display the track duration as soon as the audio metadata loads
          onEnded={() => handleNext()}
        />
        {/* THUMBNAIL */}
        <div className="audio-info">
          <div className="audio-image">
            {currentlyPlaying.thumbnail ? (
              <img src={currentlyPlaying.thumbnail} alt="audio thumb" />
            ) : (
              <div className="icon-container">
                <span className="audio-icon">{/* insert icon here */}</span>
              </div>
            )}
          </div>
        </div>
        {/* TITLE */}
        <div className="audio-text">
          <span className="displayName">{currentlyPlaying.artistInfo.displayName}</span>
          <span className="title">
            <a href={`/songs/${currentlyPlaying.id}`} style={{ textDecoration: "none", cursor: "pointer" }}>
              {currentlyPlaying.title}
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}
export default DisplaySong;
