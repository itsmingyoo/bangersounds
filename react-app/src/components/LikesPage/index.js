import React from "react";
import { useSelector, useDispatch } from "react-redux";
import SongDisplay from "../SongDisplay";
import { setPlayingState, playUserSongAction } from "../../store/songs";
import "./LikesPage.css";

const LikesPage = ({ isPlayingState, currentlyPlaying }) => {
  const dispatch = useDispatch();
  const likes = useSelector((s) => Object.values(s.songs.Songs.likes));
  const user = useSelector((s) => s.session.user);
  const userLikes = likes.filter((song) => song.likes[user.id]);
  // console.log("userlikes", userLikes);

  const togglePlayPause = async (song) => {
    dispatch(playUserSongAction(song));
    if (currentlyPlaying) {
      if (currentlyPlaying.id === song.id)
        dispatch(setPlayingState(!isPlayingState));
      else dispatch(setPlayingState(true));
    }
  };

  //   return <SongDisplay {...{ togglePlayPause, isPlayingState, currentlyPlaying, userSongs: userLikes }} />;
  return null;
};

export default LikesPage;
