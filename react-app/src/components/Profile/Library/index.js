import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import Overview from "./Overview";
import "../Profile.css";
import "./Library.css";

const Library = ({ user, userSongs, isPlayingState, currentlyPlaying, togglePlayPause, userLikes }) => {
  const [active, setActive] = useState(0);

  const handleActiveClick = (index) => {
    setActive(index);
  };

  return (
    <div id="library">
      <div id="library-inner">
        <div className="library-navbar-content-box">
          {/* Same Class Name for the Effect */}
          <div className="profile-navbar__left">
            <div
              id="active-tab"
              className={`profile-navbar__item ${active === 0 ? "profile-navbar__item-active" : ""}`}
              onClick={() => {
                handleActiveClick(0);
              }}
            >
              Overview
            </div>
            <div
              id="active-tab"
              className={`profile-navbar__item ${active === 1 ? "profile-navbar__item-active" : ""}`}
              onClick={() => {
                handleActiveClick(1);
              }}
            >
              Likes
            </div>
            <div
              id="active-tab"
              className={`profile-navbar__item ${active === 2 ? "profile-navbar__item-active" : ""}`}
              onClick={() => {
                handleActiveClick(2);
              }}
            >
              Playlists
            </div>
            <div
              id="active-tab"
              className={`profile-navbar__item ${active === 3 ? "profile-navbar__item-active" : ""}`}
              onClick={() => {
                // handleActiveClick(3);
                alert("Feature coming soon!");
              }}
            >
              Albums
            </div>
            <div
              id="active-tab"
              className={`profile-navbar__item ${active === 4 ? "profile-navbar__item-active" : ""}`}
              onClick={() => {
                // handleActiveClick(4);
                alert("Feature coming soon!");
              }}
            >
              Following
            </div>
            <div
              id="active-tab"
              className={`profile-navbar__item ${active === 5 ? "profile-navbar__item-active" : ""}`}
              onClick={() => {
                //   handleActiveClick(5);
                alert("Feature coming soon!");
              }}
            >
              History
            </div>
          </div>
        </div>

        {/*  */}
        {/*  */}
        {/*  */}
        {/*  */}
        {/*  */}
        {/*  */}
        {/*  */}
        {/*  */}
        {/*  */}
        {/*  */}
        {/*  */}
        {/*  */}
        {/*  */}
        {/*  */}
        {/*  */}
        {active === 0 && <Overview {...{ user, userSongs, isPlayingState, currentlyPlaying, togglePlayPause }} />}
        {active === 1 && <div>Likes</div>}
        {active === 2 && <div>Playlists</div>}
        {active === 3 && <div>Albums</div>}
        {active === 4 && <div>Following</div>}
        {active === 5 && <div>History</div>}
      </div>
    </div>
  );
};

export default Library;
