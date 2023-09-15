import React from "react";
import { useSelector } from "react-redux";
import SongDisplay from "../SongDisplay";

const All = ({ user, userSongs, isPlayingState, currentlyPlaying, togglePlayPause }) => {
  const relevantUserSongs = useSelector((s) => {
    const allSongs = [];

    Object.values(s.songs.Songs).forEach((song) => {
      if (song.likes[user.id] || song.reposts[user.id]) {
        allSongs.push(song);
      }
    });
    return allSongs;
  });

  return (
    <div id="profile-all-container">
      <SongDisplay {...{ user, userSongs: relevantUserSongs, isPlayingState, currentlyPlaying, togglePlayPause }} />
    </div>
  );
};

export default All;
