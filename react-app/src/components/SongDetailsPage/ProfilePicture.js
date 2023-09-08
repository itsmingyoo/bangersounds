import React from "react";

const ProfilePicture = ({ userRef, song }) => {
  if (!userRef || userRef.current === null) return null;
  return (
    <>
      {/* <div className="song-details__profile-picture"> */}
      <img src={userRef.current.profileImage} alt="PROFILE PICTURE" />
      {/* </div> */}
    </>
  );
};

export default ProfilePicture;
