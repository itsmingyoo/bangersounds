import React from "react";
import SongDisplay from "../SongDisplay";

const All = ({ userSongs, isPlayingState, currentlyPlaying }) => {
  return (
    <div>
      {/* This will be mapped */}
      <SongDisplay {...{ userSongs, isPlayingState, currentlyPlaying }} />
    </div>
  );
};

export default All;
