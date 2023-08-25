import React from "react";
import { useHistory } from "react-router-dom";
import { IoHeartSharp } from "react-icons/io5";
import DisplayLikes from "../SongDisplay/Likes";

const Likes = ({ songs, isPlayingState, currentlyPlaying, comments, userRef, userLikes }) => {
  const history = useHistory();
  const numLikes = userLikes.length;
  return (
    <div id="likes-main__container">
      <div className="likes-sub__container">
        <div>
          <IoHeartSharp />
          {numLikes} Likes
        </div>
        <div onClick={() => history.push("/likes")} style={{ cursor: "pointer" }}>
          View All
        </div>
      </div>
      <div className="liked-songs-container">
        {userLikes?.slice(0, 3).map((s) => (
          <DisplayLikes {...{ userLikes }} />
        ))}
      </div>
    </div>
  );
};

export default Likes;
