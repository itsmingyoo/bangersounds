import React from "react";

const LatestComments = ({ songs, isPlayingState, currentlyPlaying, comments, userRef }) => {
  return (
    <div>
      <div>
        <div>(comment icon) Latest Comments</div>
        <div>View All</div>
      </div>
      <div>on (song.name) "user's comment"</div>
      <div>time ago</div>
    </div>
  );
};

export default LatestComments;
