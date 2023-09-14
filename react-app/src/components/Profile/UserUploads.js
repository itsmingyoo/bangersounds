import React from "react";
import { useSelector } from "react-redux";
import SongDisplay from "../SongDisplay";

const UserUploads = ({ user, isPlayingState, currentlyPlaying, togglePlayPause }) => {
  const uploads = useSelector((s) => {
    const userUploads = [];
    Object.values(s.songs.Songs).forEach((song) => {
      if (song.artistId === user?.id) {
        userUploads.push(song);
      }
    });
    return userUploads;
  });
  return (
    <div>
      <SongDisplay {...{ userSongs: uploads, isPlayingState, currentlyPlaying, togglePlayPause }} />
    </div>
  );
};

export default UserUploads;
