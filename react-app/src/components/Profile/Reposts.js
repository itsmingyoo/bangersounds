import React from "react";
import SongDisplay from "../SongDisplay";

const Reposts = ({ user, userSongs, isPlayingState, currentlyPlaying, togglePlayPause }) => {
  return (
    <div>
      <div>THIS IS REPOSTS</div>
      <div>-------------------------------</div>
      <SongDisplay {...{ user, userSongs, isPlayingState, currentlyPlaying, togglePlayPause }} />
    </div>
  );
};

export default Reposts;
