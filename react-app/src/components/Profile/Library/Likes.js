import React from "react";
import { useSelector } from "react-redux";
import SongDisplay from "../../SongDisplay";

const Likes = ({ isPlayingState, currentlyPlaying, togglePlayPause }) => {
  const user = useSelector((s) => s.session.user);
  const songs = useSelector((s) => Object.values(s.songs.Songs));
  const userLikes = songs.filter((s) => s.likes[user.id]);

  return (
    <div id="profile-library-likes-container">
      <SongDisplay {...{ user, userSongs: userLikes, isPlayingState, currentlyPlaying, togglePlayPause }} />
    </div>
  );
};

export default Likes;
