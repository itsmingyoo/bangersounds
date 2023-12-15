import React from "react";

const ProfilePicture = ({ user, song }) => {
  if (!user || user === null) return null;
  return (
    <>
      {user?.profileImage === null || user?.profileImage === "" ? (
        <img
          src="https://i1.sndcdn.com/artworks-R5fUpysnmuGuxcMv-5ojqxQ-t500x500.png"
          alt="default pfp"
        />
      ) : (
        <img src={user.profileImage} alt="PROFILE PICTURE" />
      )}
    </>
  );
};

export default ProfilePicture;
