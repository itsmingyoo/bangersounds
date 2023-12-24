import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { IoPlaySharp, IoPauseSharp } from "react-icons/io5";
const ImageContainer = ({
  s,
  togglePlayPause,
  currentlyPlaying,
  isPlayingState,
  songs,
  displayTopTransition,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <>
      <div
        className={`recently-played__btn-link ${
          isHovered ? "display-btn" : ""
        }`}
      >
        {/* RESPONSIVE PLAY/PAUSE BUTTON */}
        <div
          className={`icon-container ${isHovered ? "display-btn" : ""}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <button
            onClick={() => togglePlayPause(s)}
            className={`orange-btn-white-txt play-btn centered-button ${
              isHovered ? "display-btn" : ""
            }`}
          >
            {currentlyPlaying?.id === s.id && isPlayingState ? (
              <IoPauseSharp
                className={`song-btn ${isHovered ? "display-btn" : ""}`}
              />
            ) : (
              <IoPlaySharp
                className={`song-btn ${isHovered ? "display-btn" : ""}`}
              />
            )}
          </button>
        </div>

        <div
          className={`song-image__container`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          title={s.title}
        >
          <NavLink to={`/songs/${s.id}`} onClick={displayTopTransition}>
            <img
              src={
                s.thumbnail
                  ? s.thumbnail
                  : "https://i1.sndcdn.com/artworks-R5fUpysnmuGuxcMv-5ojqxQ-t500x500.png"
              }
              className="recently-played__images"
              alt={`p-image__${s.title}`}
            />
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default ImageContainer;
