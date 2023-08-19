import React from "react";
import SongDisplay from "../SongDisplay";

const All = ({ user, userSongs, isPlayingState, currentlyPlaying, togglePlayPause }) => {
  return (
    <div id="profile-all-container">
      <SongDisplay {...{ user, userSongs, isPlayingState, currentlyPlaying, togglePlayPause }} />
    </div>
  );
};

export default All;
