import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfileNavBar from "./ProfileNavBar";
import ProfileHeader from "./ProfileHeader";
import Likes from "./Likes";
import LatestComments from "./LatestComments";
import NavBarContent from "./NavBarContent";
import { playUserSongAction, setPlayingState } from "../../store/songs";
import "./Profile.css";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const [active, setActive] = useState(0);
  const user = useSelector((s) => s.session.user);
  const userRef = useRef(user);
  useEffect(() => {
    userRef.current = user;
  });
  const songs = useSelector((s) => Object.values(s.songs.Songs));
  const isPlayingState = useSelector((s) => s.songs.isPlaying);
  const currentlyPlaying = useSelector((s) => s.songs.CurrentlyPlaying);
  const userSongs = songs.filter((s) => s.artistId === user.id);
  const comments = useSelector((s) => s.songs.comments);
  const userComments = Object.values(comments).filter(
    (c) => c.userId === user.id
  );
  const userLikes = songs.filter((s) => s.likes[user.id]);

  // FN
  const togglePlayPause = async (song) => {
    dispatch(playUserSongAction(song));
    if (currentlyPlaying) {
      if (currentlyPlaying.id === song.id)
        dispatch(setPlayingState(!isPlayingState));
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
              }}
            />
          </div>

          <div id="profile-info__container">
            <Likes
              {...{
                songs,
                isPlayingState,
                currentlyPlaying,
                comments,
                userRef,
                userLikes,
              }}
            />
            <LatestComments {...{ user, userComments, songs }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
