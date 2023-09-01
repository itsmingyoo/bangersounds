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
      <button
        id={`like-btn`}
        onClick={toggleLike}
        style={{
          backgroundColor: "white",
          border: isLiked ? "1px solid #f50" : "",
          borderRadius: isLiked ? "4px" : "",
        }}
      >
        <IoHeartSharp
          className={cName}
          style={{
            color: isLiked ? "#f50" : "",
            cursor: "pointer",
          }}
        />
      </button>
    </div>
  );
};

export default LikeButton;
