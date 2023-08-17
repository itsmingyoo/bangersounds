import React from "react";
import ProfileNavBar from "./ProfileNavBar";
import Profile from "./Profile";
import Likes from "./Likes";
import LatestComments from "./UserComments";

const ProfilePage = () => {
  return (
    <div>
      <Profile />
      <ProfileNavBar />
      <Likes />
      <LatestComments />
    </div>
  );
};

export default ProfilePage;
