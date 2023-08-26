import React from "react";
import { useDispatch } from "react-redux";
import { BiRepost } from "react-icons/bi";
import { thunkToggleRepost } from "../../store/songs";
import "./RepostButton.css";

const RepostButton = ({ song, user, isRepost }) => {
  const dispatch = useDispatch();
  const toggleRepost = () => {
    dispatch(thunkToggleRepost(song.id, user, isRepost));
  };
  return (
    <div id="repost-btn__container">
      <button id="repost-btn" onClick={toggleRepost}>
        <BiRepost />
      </button>
    </div>
  );
};

export default RepostButton;
