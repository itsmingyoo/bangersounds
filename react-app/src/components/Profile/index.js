import React, { useState } from "react";
import { useDispatch } from "react-redux";
import ProfileNavBar from "./ProfileNavBar";
import ProfileHeader from "./ProfileHeader";
import Likes from "./Likes";
import LatestComments from "./LatestComments";
import NavBarContent from "./NavBarContent";
import { playUserSongAction, setPlayingState } from "../../store/songs";
import "./Profile.css";

const ProfilePage = ({ songs, isPlayingState, currentlyPlaying, comments, userRef }) => {
  const dispatch = useDispatch();
  const [active, setActive] = useState(0);
  // All user info
  const user = userRef.current;
  const userSongs = songs.filter((s) => s.artistId === user.id);
  const userComments = Object.values(comments).filter((c) => c.userId === user.id);
  const userLikes = songs.filter((s) => s.likes[user.id]);
  const userReposts = songs.filter((s) => s.reposts[user.id]);

  // FN
  const togglePlayPause = async (song) => {
    dispatch(playUserSongAction(song));
    if (currentlyPlaying) {
      if (currentlyPlaying.id === song.id) dispatch(setPlayingState(!isPlayingState));
      else dispatch(setPlayingState(true));
    }
  };

  return (
    <div className="profile-container-main">
      <div className="profile-container">
        <ProfileHeader {...{ userRef }} />

        <ProfileNavBar
          {...{
            userRef,
            userSongs,
            isPlayingState,
            currentlyPlaying,
            comments,
            songs,
            active,
            setActive,
            togglePlayPause,
          }}
        />
        <div id="profile-content-wrapper">
          <div className="profile-content-container">
            {/* Renders Components: All, Popular Songs, userSongs, albums, playlists, reposts: Some of these components like in All will have a 'SongDisplay' component to play the displayed song  */}

            <NavBarContent
              {...{
                user,
                userSongs,
                isPlayingState,
                currentlyPlaying,
                comments,
                songs,
                active,
                setActive,
                togglePlayPause,
                userLikes,
                userReposts,
              }}
            />
          </div>

          <div id="profile-info__container">
            {/* Like/Reposts not yet implemented */}
            <Likes {...{ songs, isPlayingState, currentlyPlaying, comments, userRef, userLikes }} />
            {/* Only need userComments, then need to order them by most recent */}
            <LatestComments {...{ user, userComments, songs }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
