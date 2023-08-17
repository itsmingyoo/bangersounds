import React from "react";
import SongDisplay from "../SongDisplay";
const Reposts = ({ songs, isPlayingState, currentlyPlaying, comments }) => {
  return (
    <div>
      <SongDisplay {...{ songs, isPlayingState, currentlyPlaying, comments }} />
    </div>
  );
};

export default Reposts;
