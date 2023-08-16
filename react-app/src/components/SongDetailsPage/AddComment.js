import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { thunkPostComment } from "../../store/songs";

const AddComment = ({ song }) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  console.log(comment);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errObj = {};
    const commentObj = {
      comment: comment,
    };
    dispatch(thunkPostComment(song.id, commentObj));
    setComment("");
  };
  return (
    <div id="song-details__input-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="  Write a comment"
          className="song-details__input"
          autoComplete="off"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </form>
    </div>
  );
};

export default AddComment;
