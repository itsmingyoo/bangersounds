import React from "react";
import { useHistory } from "react-router-dom";
import { IoHeartSharp } from "react-icons/io5";
import DisplayLikes from "../SongDisplay/Likes";

// This is the sidebar box with the user's random three songs
const Likes = ({ songs, isPlayingState, currentlyPlaying, comments, userRef, userLikes }) => {
  const history = useHistory();
  const numLikes = userLikes.length;

  // Shuffle function to randomize array order
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  const shuffledUserLikes = shuffleArray(userLikes);
  const randomThreeSongs = shuffledUserLikes.slice(0, 3);

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
        {randomThreeSongs.map((s) => (
          <DisplayLikes {...{ s, userLikes, isPlayingState, currentlyPlaying }} />
        ))}
      </div>
    </div>
  );
};

export default Likes;
