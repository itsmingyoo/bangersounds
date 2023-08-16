import React from "react";
import { IoPlaySharp, IoPauseSharp } from "react-icons/io5";

const PlayContent = ({ song, isPlayingState, currentlyPlaying, togglePlayPause }) => {
  return (
    <>
      <div id="play-content__container">
        <div id="play-content__button-container">
          <button
            onClick={() => togglePlayPause(song)}
            className="orange-btn-white-txt song-details__play-btn-container"
          >
            <div className="song-details__play-btn">
              {currentlyPlaying.id === song.id && isPlayingState ? (
                <IoPauseSharp className="song-details__play-icon" />
              ) : (
                <IoPlaySharp className="song-details__play-icon" />
              )}
            </div>
          </button>
        </div>

        <div id="song-details__content">
          <div id="song-details__title-container">
            <h1 className="song-details__title">
              <span>{song.title}</span>
            </h1>
          </div>

          <div id="song-details__display-name">
            <h2 className="song-details__display-name">
              <span>{song.artistInfo.displayName}</span>
            </h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlayContent;
