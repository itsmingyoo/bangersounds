import React from "react";
import { useDispatch } from "react-redux";
import Reposts from "./Reposts";
import All from "./All";
import { playUserSongAction, setPlayingState } from "../../store/songs";
import "./Profile.css";

const ProfileNavBar = ({ user, userSongs, isPlayingState, currentlyPlaying }) => {
  // states for each div if clicked to render their specific page on the same page
  const dispatch = useDispatch();
  const togglePlayPause = async (song) => {
    dispatch(playUserSongAction(song));

    if (currentlyPlaying) {
      if (currentlyPlaying.id === song.id) dispatch(setPlayingState(!isPlayingState));
      else dispatch(setPlayingState(true));
    }
  };

  return (
    <div className="profile-navbar__main">
      <div className="profile-navbar__container">
        <div className="profile-navbar__left">
          <div>All</div>
          <div onClick={() => alert("Feature coming soon!")}>Popular Songs</div>
          <div>Songs</div>
          <div onClick={() => alert("Feature coming soon!")}>Albums</div>
          <div onClick={() => alert("Feature coming soon!")}>Playlists</div>
          <div onClick={() => alert("Feature coming soon!")}>Reposts</div>
        </div>
        <div className="profile-navbar__right">
          <button onClick={() => alert("Feature coming soon!")}>Your Insights</button>
          <button onClick={() => alert("Feature coming soon!")}>Station</button>
          <button onClick={() => alert("Feature coming soon!")}>Share</button>
          <button onClick={() => alert("Feature coming soon!")}>Edit</button>
        </div>
      </div>
      <div className="navbar-content-box">
        IF CONDITIONALS TO RENDER IF USER SELECTS ON OF THE NAV BUTTONS...
        <Reposts {...{ userSongs, isPlayingState, currentlyPlaying, togglePlayPause }} />
        <All {...{ userSongs, isPlayingState, currentlyPlaying, togglePlayPause }} />
      </div>
    </div>
  );
};

export default ProfileNavBar;
