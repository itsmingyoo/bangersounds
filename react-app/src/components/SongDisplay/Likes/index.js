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
import { playUserSongAction, setPlayingState } from "../../../store/songs";
import TogglePlay from "./TogglePlay";
import LikesTitle from "./LikesTitle";
import "./Likes.css";

const DisplayLikes = ({ s, isPlayingState, currentlyPlaying, userLikes }) => {
  const dispatch = useDispatch();
  const togglePlayPause = (song) => {
    dispatch(playUserSongAction(song));
    if (currentlyPlaying) {
      if (currentlyPlaying.id === song.id) dispatch(setPlayingState(!isPlayingState));
      else dispatch(setPlayingState(true));
    }
  };
  return (
    <div id="like__container">
      {/* ImageContainer will contain responsive button displayed over the thumbnail and have a function to toggle play/pause */}
      <TogglePlay {...{ s, userLikes, isPlayingState, currentlyPlaying, togglePlayPause }} />

      {/* DISPLAY NAME */}
      {/* SONG TITLE */}
      {/* PLAYS | LIKES | REPOSTS | COMMENTS */}
      <LikesTitle {...{ s, userLikes }} />
    </div>
  );
};

export default DisplayLikes;
