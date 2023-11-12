import React from "react";
import { IoPlaySharp, IoPauseSharp } from "react-icons/io5";
import { togglePlayPause } from "../../util/togglePlay";
import { useDispatch } from "react-redux";

const PlayContent = ({ song, isPlayingState, currentlyPlaying }) => {
  const dispatch = useDispatch();

  return (
    <>
      <div id="play-content__container">
        <div id="play-content__button-container">
          <button
            onClick={() =>
              togglePlayPause(song, dispatch, currentlyPlaying, isPlayingState)
            }
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
            <div className="song-details__title song-display-title">
              {song.title}
            </div>
          </div>

          <div id="song-details__display-name">
            <div className="song-details__display-name">
              {song.artistInfo.displayName}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlayContent;
