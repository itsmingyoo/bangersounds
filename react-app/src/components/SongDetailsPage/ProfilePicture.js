import React from "react";

const ProfilePicture = ({ song }) => {
  return (
    <>
      <div className="song-details__profile-picture">
        <img src={song.thumbnail} alt="fake ProfilePicture" />
      </div>
    </>
  );
};

export default ProfilePicture;
