import React from "react";
import { thunkDeleteComment } from "../../store/songs";

const CommentBox = ({ song, songs, isPlayingState, currentlyPlaying, togglePlayPause, comments, user, dispatch }) => {
  let allComments = Object.values(comments);
  let songComments = allComments.filter((s) => song.id === s.songId);

  // console.log("is user comment", isUserComment);
  const handleDelete = (c) => {
    dispatch(thunkDeleteComment(song.id, c.id));
  };
  return (
    <div id="user-comment__main">
      {songComments.map((c) => (
        <>
          <div id="user-comment__container">
            <div key={c.id} className="user-displayname">
              {c.user.displayName}
            </div>
            <div className="user-comment">{c.comment}</div>
            <div className="user-comment__date">{c.createdAt}</div>
          </div>
          {c.userId === user.id && <button onClick={() => handleDelete(c)}>Delete</button>}
        </>
      ))}
    </div>
  );
};

export default CommentBox;
