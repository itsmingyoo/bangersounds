import React from "react";

function DisplayTrack({ currentSong, audioRef }) {
  console.log("this is song in displaytrack", currentSong);
  return (
    <div>
      <audio src={currentSong} ref={audioRef} />
      <div className="audio-info">
        <div className="audio-image">
          {currentSong.previewImageURL ? (
            <img src={currentSong.previewImageURL} alt="audio thumb" />
          ) : (
            <div className="icon-container">
              <span className="audio-icon">{/* insert icon here */}</span>
            </div>
          )}
        </div>
      </div>
      <div className="audio-text">
        <p className="title">{currentSong.title}</p>
        <p>{currentSong.author}</p>
      </div>
    </div>
  );
}
export default DisplayTrack;
