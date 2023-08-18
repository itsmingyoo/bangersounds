import React from "react";
import SongDisplay from "../SongDisplay";

const Reposts = ({ userSongs, isPlayingState, currentlyPlaying, togglePlayPause }) => {
  return (
    <div>
      <SongDisplay {...{ userSongs, isPlayingState, currentlyPlaying, togglePlayPause }} />
    </div>
  );
};

export default Reposts;
