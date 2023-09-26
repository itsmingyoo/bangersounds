import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { playUserSongAction, setPlayingState } from "../../../store/songs";
import SongDisplay from "../../SongDisplay";
import ImageContainer from "../../LandingPage/ImageContainer";

const Likes = ({ isPlayingState, currentlyPlaying }) => {
  const dispatch = useDispatch();
  const user = useSelector((s) => s.session.user);
  const userLikes = useSelector((s) => {
    const likedSongs = [];
    Object.values(s.songs.Songs).forEach((song) => {
      if (song?.likes?.[user.id]) {
        likedSongs.push(song);
      }
    });
    console.log("likedSongs", likedSongs);
    return likedSongs;
  });

  const displayTopTransition = () => {
    window.scrollTo(0, 0);
  };

  const togglePlayPause = async (song) => {
    dispatch(playUserSongAction(song));

    if (currentlyPlaying) {
      if (currentlyPlaying.id === song.id) dispatch(setPlayingState(!isPlayingState));
      else dispatch(setPlayingState(true));
    }
  };

  return (
    <div id="profile-library-likes-container">
      {/* <SongDisplay {...{ user, userSongs: userLikes, isPlayingState, currentlyPlaying, togglePlayPause }} /> */}
      <div id="liked-songs__container">
        <h2>Likes</h2>
        <div id="liked-songs">
          {/* START of loop */}
          {userLikes &&
            userLikes?.map((s) => (
              <div key={s.id} id="recently-played__each-song-container">
                <ImageContainer {...{ s, togglePlayPause, currentlyPlaying, isPlayingState, displayTopTransition }} />
                <NavLink to={`/songs/${s.id}`} onClick={displayTopTransition}>
                  <div style={{ whiteSpace: "nowrap", overflow: "hidden" }} title={s.title}>
                    {s.title}
                  </div>
                </NavLink>
                <div style={{ wordBreak: "break-all", overflow: "hidden", color: "#999" }}>
                  {s.artistInfo.displayName}
                </div>
              </div>
            ))}
          {/* END of loop */}
        </div>
      </div>
    </div>
  );
};

export default Likes;
