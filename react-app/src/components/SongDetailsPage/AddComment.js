import React from "react";

const AddComment = ({ song }) => {
  return (
    <div id="song-details__input-container">
      <input type="text" placeholder="  Write a comment" className="song-details__input" autoComplete="off" />
    </div>
  );
};

export default AddComment;
