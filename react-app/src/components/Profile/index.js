import React from "react";
import ProfileNavBar from "./ProfileNavBar";
import ProfileHeader from "./ProfileHeader";
import Likes from "./Likes";
import LatestComments from "./LatestComments";
import "./Profile.css";

const ProfilePage = ({ songs, isPlayingState, currentlyPlaying, comments, userRef }) => {
  // All user info
  const user = userRef.current;
  const userSongs = songs.filter((s) => s.artistId === user.id);
  const userComments = Object.values(comments).filter((c) => c.userId === user.id);
  // filter userLikes
  // filter userReposts

  return (
    <div className="profile-container-main">
      <div className="profile-container">
        <ProfileHeader {...{ user }} />
        {/* Renders Components: All, Popular Songs, userSongs, albums, playlists, reposts: Some of these components like in All will have a 'SongDisplay' component to play the displayed song  */}
        <ProfileNavBar {...{ user, userSongs, isPlayingState, currentlyPlaying, comments, songs }} />
        <div id="profile-left-and-right__container">
          <div id="profile-right-content">
            {/* Like/Reposts not yet implemented */}
            <Likes />

            {/* Only need userComments, then need to order them by most recent */}
            <LatestComments {...{ user, userComments }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
