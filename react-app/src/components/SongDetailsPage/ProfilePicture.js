import React from "react";

const ProfilePicture = ({ user, song }) => {
  if (!user || user === null) return null;
  return (
    <>
      {/* <div className="song-details__profile-picture"> */}
      <img src={user.profileImage} alt="PROFILE PICTURE" />
      {/* </div> */}
    </>
  );
};

export default ProfilePicture;
