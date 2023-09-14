import React from "react";
import SongDisplay from "../SongDisplay";

const Reposts = ({ isPlayingState, currentlyPlaying, togglePlayPause, userReposts }) => {
  return (
    <div>
      <SongDisplay
        userSongs={userReposts}
        isPlayingState={isPlayingState}
        currentlyPlaying={currentlyPlaying}
        togglePlayPause={togglePlayPause}
      />
    </div>
  );
};

export default Reposts;
