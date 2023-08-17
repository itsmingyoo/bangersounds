import React from "react";
import SongDisplay from "../SongDisplay";

const All = ({ songs, isPlayingState, currentlyPlaying, comments }) => {
  return (
    <div>
      {/* This will be mapped */}
      <SongDisplay {...{ songs, isPlayingState, currentlyPlaying, comments }} />
    </div>
  );
};

export default All;
