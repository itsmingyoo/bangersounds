import React from "react";
import { useDispatch } from "react-redux";
import { IoHeartSharp } from "react-icons/io5";
import { thunkToggleLike } from "../../store/songs";
import "./LikeButton.css";

const LikeButton = ({ song, user, isLiked }) => {
  const dispatch = useDispatch();
  const toggleLike = () => {
    dispatch(thunkToggleLike(song.id, user, isLiked));
  };
  return (
    <div id="like-btn__container">
      <button id="like-btn" onClick={toggleLike}>
        <IoHeartSharp />
      </button>
    </div>
  );
};

export default LikeButton;
