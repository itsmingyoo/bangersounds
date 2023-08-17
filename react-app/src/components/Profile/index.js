import React from "react";
import ProfileNavBar from "./ProfileNavBar";
import Profile from "./Profile";
import Likes from "./Likes";
import LatestComments from "./UserComments";

const ProfilePage = ({ songs, isPlayingState, currentlyPlaying, comments, userRef }) => {
  return (
    <div>
      <Profile {...{ songs, isPlayingState, currentlyPlaying, comments, userRef }} />
      <ProfileNavBar {...{ songs, isPlayingState, currentlyPlaying, comments, userRef }} />
      <Likes {...{ songs, isPlayingState, currentlyPlaying, comments, userRef }} />
      <LatestComments {...{ songs, isPlayingState, currentlyPlaying, comments, userRef }} />
    </div>
  );
};

export default ProfilePage;
