import React from "react";
import { useDispatch } from "react-redux";
import {
  IoPlaySharp,
  IoPauseSharp,
  IoEllipsisHorizontalSharp,
  IoHeartSharp,
  IoShareOutline,
  IoLinkSharp,
} from "react-icons/io5";
import EditSong from "../../SongDetailsPage/EditSongModal";
import OpenModalButton from "../../OpenModalButton";
import DropDown from "../../DropDown";
import TogglePlay from "./TogglePlay";
import { playUserSongAction, setPlayingState } from "../../../store/songs";
import "./Likes.css";

const DisplayLikes = ({ s, user, userSongs, isPlayingState, currentlyPlaying, comments, songs, userLikes }) => {
  console.log("this is s", s);
  const dispatch = useDispatch();
  const togglePlayPause = (song) => {
    dispatch(playUserSongAction(song));
    if (currentlyPlaying) {
      if (currentlyPlaying.id === song.id) dispatch(setPlayingState(!isPlayingState));
      else dispatch(setPlayingState(true));
    }
  };
  if (!s) return null;
  return (
    <>
      <div>ImageContainer</div>
      {/* ImageContainer will contain responsive button displayed over the thumbnail and have a function to toggle play/pause */}
      <TogglePlay {...{ s, userLikes, isPlayingState, currentlyPlaying, togglePlayPause }} />
    </>
  );
};

export default DisplayLikes;
