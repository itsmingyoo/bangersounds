import React from "react";
import SongDisplay from "../SongDisplay";

const Reposts = ({ user, userSongs, isPlayingState, currentlyPlaying, togglePlayPause, userReposts }) => {
  return (
    <div>
      <SongDisplay {...{ user, userSongs, isPlayingState, currentlyPlaying, togglePlayPause, userReposts }} />
    </div>
  );
};

export default Reposts;
