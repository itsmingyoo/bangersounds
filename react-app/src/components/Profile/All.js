import React from "react";
import SongDisplay from "../SongDisplay";

const All = ({ user, userSongs, isPlayingState, currentlyPlaying, togglePlayPause }) => {
  return (
    <div>
      THIS IS ALL THE STUFFFFFFFFF
      <div>-------------------------------</div>
      {/* This will be mapped */}
      <SongDisplay {...{ user, userSongs, isPlayingState, currentlyPlaying, togglePlayPause }} />
    </div>
  );
};

export default All;
