import React from "react";
import SongDisplay from "../SongDisplay";

const Reposts = ({ user, userSongs, isPlayingState, currentlyPlaying, togglePlayPause, userReposts }) => {
  console.log("user reposts", userReposts);
  return (
    <div>
      {/* <SongDisplay {...{ user, userSongs, isPlayingState, currentlyPlaying, togglePlayPause, userReposts }} /> */}
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
