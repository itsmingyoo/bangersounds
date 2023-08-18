import React from "react";
import { useDispatch } from "react-redux";
import Reposts from "./Reposts";
import All from "./All";
import { playUserSongAction, setPlayingState } from "../../store/songs";

const ProfileNavBar = ({ user, userSongs, isPlayingState, currentlyPlaying }) => {
  // states for each div if clicked to render their specific page on the same page
  const dispatch = useDispatch();
  const togglePlayPause = async (song) => {
    dispatch(playUserSongAction(song));

    if (currentlyPlaying) {
      if (currentlyPlaying.id === song.id) dispatch(setPlayingState(!isPlayingState));
      else dispatch(setPlayingState(true));
    }
  };

  return (
    <div>
      <div>
        <div>profile nav bar</div>
        <div>All</div>
        <div>Popular Songs</div>
        <div>Songs</div>
        <div>Albums</div>
        <div>Playlists</div>
        <div>Reposts</div>
      </div>
      <div>
        if conditionals to render...
        <Reposts {...{ userSongs, isPlayingState, currentlyPlaying, togglePlayPause }} />
        <All {...{ userSongs, isPlayingState, currentlyPlaying, togglePlayPause }} />
      </div>
    </div>
  );
};

export default ProfileNavBar;
