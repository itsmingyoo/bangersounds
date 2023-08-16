import React from "react";

const CommentBox = ({ song, songs, isPlayingState, currentlyPlaying, togglePlayPause, comments }) => {
  let allComments = Object.values(comments);
  let songComments = allComments.filter((s) => song.id === s.songId);
  // map through them in the return
  {
    songComments.map((c) => <div></div>);
  }
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
        </>
      ))}
    </div>
  );
};

export default CommentBox;
