import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Reposts from "./Reposts";
import All from "./All";
import "./Profile.css";

const NavBarContent = ({
  user,
  userSongs,
  isPlayingState,
  currentlyPlaying,
  comments,
  songs,
  active,
  setActive,
  togglePlayPause,
}) => {
  return (
    <div className="navbar-content-box">
      {active === 0 && (
        <All {...{ user, userSongs, isPlayingState, currentlyPlaying, togglePlayPause, comments, songs }} />
      )}
      {/* {active === 1 && <PopularSongs />} */}
      {/* {active === 2 && <Songs />} */}
      {/* {active === 3 && <Albums />} */}
      {/* {active === 4 && <Playlists />} */}
      {active === 5 && (
        <Reposts {...{ user, userSongs, isPlayingState, currentlyPlaying, togglePlayPause, comments, songs }} />
      )}
    </div>
  );
};

export default NavBarContent;
