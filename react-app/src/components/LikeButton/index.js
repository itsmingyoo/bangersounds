import React from "react";
import { useDispatch } from "react-redux";
import { IoHeartSharp } from "react-icons/io5";
import { thunkToggleLike } from "../../store/songs";
import "./LikeButton.css";

const LikeButton = ({ song, user, isLiked, cName }) => {
  const dispatch = useDispatch();
  const toggleLike = () => {
    dispatch(thunkToggleLike(song.id, user, isLiked));
  };
  return (
    <div id="like-btn__container">
      <button id="like-btn" onClick={toggleLike}>
        <IoHeartSharp className={cName} />
      </button>
    </div>
  );
};

export default LikeButton;
