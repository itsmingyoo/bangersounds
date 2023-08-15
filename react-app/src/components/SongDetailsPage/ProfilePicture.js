import React from "react";

const ProfilePicture = ({ song, songs, isPlayingState, currentlyPlaying, togglePlayPause }) => {
  return (
    <>
      <div className="song-details__profile-picture">
        <img src={song.thumbnail} alt="fake ProfilePicture" />
      </div>
    </>
  );
};

export default ProfilePicture;
