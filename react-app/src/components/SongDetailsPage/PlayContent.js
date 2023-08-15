import React from "react";
import { IoPlaySharp, IoPauseSharp } from "react-icons/io5";

const PlayContent = ({ song, isPlayingState, currentlyPlaying, togglePlayPause }) => {
  return (
    <>
      <div id="play-content__container">
        <button onClick={() => togglePlayPause(song)} className="orange-btn-white-txt song-details__play-btn-container">
          <div className="song-details__play-btn">
            {currentlyPlaying.id === song.id && isPlayingState ? (
              <IoPauseSharp className="song-details__play-icon" />
            ) : (
              <IoPlaySharp className="song-details__play-icon" />
            )}
          </div>
        </button>
        <div id="song-details__content">
          <span>{song.title}</span>
          <span>{song.artistInfo.displayName}</span>
          {/* <span>(Album PIC) In album: 'ALBUM NAME'</span> */}
        </div>
      </div>
    </>
  );
};

export default PlayContent;
