import React from "react";
import SongDisplay from "../SongDisplay";

const All = ({ userSongs, isPlayingState, currentlyPlaying, togglePlayPause }) => {
  return (
    <div>
      {/* This will be mapped */}
      <SongDisplay {...{ userSongs, isPlayingState, currentlyPlaying, togglePlayPause }} />
    </div>
  );
};

export default All;
