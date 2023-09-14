import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { thunkPostComment } from "../../store/songs";

const AddComment = ({ song }) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    const errObj = {};
    if (comment === "") errObj.comment = "Please enter a comment before submitting";
    if (comment.length > 1000) errObj.comment = "Comment can be up to 1000 characters";
    if (Object.values(errObj).length > 0) return setErrors(errObj);
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
        {submitted && errors.comment && <div className="errors">{errors.comment}</div>}
      </form>
    </div>
  );
};

export default AddComment;
