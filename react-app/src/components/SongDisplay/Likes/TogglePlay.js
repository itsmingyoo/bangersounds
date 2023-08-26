import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { IoPlaySharp, IoPauseSharp } from "react-icons/io5";
import { playUserSongAction, setPlayingState } from "../../../store/songs";
import "../../LandingPage/LandingPage.css";
import "./Likes.css";

const TogglePlay = ({ s, currentlyPlaying, isPlayingState, togglePlayPause }) => {
  // Local 'hovered' state for each button
  const [isHovered, setIsHovered] = useState(false);

  // Three Required Fns - Manage state of play/pause toggle, and scroll to top if thumbnail is clicked
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const displayTopTransition = () => {
    window.scrollTo(0, 0);
  };

  return (
    <>
      <div
        id="play-btn__main-container"
        className={`recently-played__btn-link ${isHovered ? "display-btn" : ""}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* RESPONSIVE PLAY/PAUSE BUTTON */}
        <button
          onClick={() => togglePlayPause(s)}
          id="play-btn__button"
          className={`orange-btn-white-txt play-btn centered-button ${isHovered ? "display-btn" : ""}`}
        >
          <div id="icon-container" className={`icon-container ${isHovered ? "display-btn" : ""}`}>
            {currentlyPlaying.id === s.id && isPlayingState ? (
              <IoPauseSharp className={`like-btn ${isHovered ? "display-btn" : ""}`} />
            ) : (
              <IoPlaySharp className={`like-btn ${isHovered ? "display-btn" : ""}`} />
            )}
          </div>
        </button>

        {/* IMAGE WITH TITLE TOOLTIP */}
        <div title={s.title}>
          <NavLink to={`/songs/${s.id}`} onClick={displayTopTransition}>
            <img
              src={s.thumbnail ? s.thumbnail : "https://i1.sndcdn.com/artworks-R5fUpysnmuGuxcMv-5ojqxQ-t500x500.png"}
              className="recently-played__images"
              alt={`p-image__${s.title}`}
            />
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default TogglePlay;
