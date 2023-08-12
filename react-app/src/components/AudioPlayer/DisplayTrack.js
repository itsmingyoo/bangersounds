import React from "react";
import "./AudioPlayer.css";

function DisplayTrack({ currentSong, audioRef, setDuration, progressBarRef }) {
  // console.log("this is song in displaytrack", currentSong);

  const onLoadedMetaData = () => {
    // console.log("this is onloadedmetadata", audioRef.current.duration); // didnt log anything not sure why
    const seconds = audioRef.current.duration;
    setDuration(seconds);
    progressBarRef.current.max = seconds;
  };
  return (
    <div>
      <audio
        src={currentSong.songURL}
        ref={audioRef}
        onLoadedMetaData={onLoadedMetaData} // onLoadedMeta data is an event on the <audio /> which will help us display the track duration as soon as the audio metadata loads
      />
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
      <div className="audio-text">
        <p className="title">{currentSong.title}</p>
        <p>{currentSong.artistInfo.displayName}</p>
      </div>
    </div>
  );
}
export default DisplayTrack;
