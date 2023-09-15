import React from "react";
import SongDisplay from "../SongDisplay";
import { useSelector } from "react-redux";

const Reposts = ({ isPlayingState, currentlyPlaying, togglePlayPause }) => {
  const songs = useSelector((s) => s.songs.Songs);
  const user = useSelector((s) => s.session.user);
  const userReposts = Object.values(songs).filter((s) => s.reposts[user.id]);
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
