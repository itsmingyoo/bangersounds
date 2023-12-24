import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { IoHeartSharp } from "react-icons/io5";
import DisplayLikes from "../SongDisplay/Likes";

// This is the sidebar box with the user's random three songs
const Likes = () => {
  const history = useHistory();
  const user = useSelector((s) => s.session.user);
  const userRef = useRef(user);
  useEffect(() => {
    userRef.current = user;
  });
  const songs = useSelector((s) => Object.values(s.songs.Songs));
  const isPlayingState = useSelector((s) => s.songs.isPlaying);
  const currentlyPlaying = useSelector((s) => s.songs.CurrentlyPlaying);
  const userSongs = songs.filter((s) => s.artistId === user.id);
  const comments = useSelector((s) => s.songs.comments);
  const userComments = Object.values(comments).filter(
    (c) => c.userId === user.id
  );
  const userLikes = songs.filter((s) => s.likes[user.id]);
  const numLikes = userLikes.length;

  // Cannot call a reverse() array method (that of which can only mutate the original array) on a prop because props aren't meant to be mutated, they are for read-only
  // Solution is to make a copy of that array, then mutate the copy to your liking.
  // Solution:
  // const reverseLikes = [...userLikes].reverse();

  // instead of using this, im going to one line it with the map

  // Removing this shuffle bc... soundcloud displays recent likes, and also theres a re-render everytime a new song plays
  // Shuffle function to randomize array order
  // function shuffleArray(array) {
  //   for (let i = array.length - 1; i > 0; i--) {
  //     const j = Math.floor(Math.random() * (i + 1));
  //     [array[i], array[j]] = [array[j], array[i]];
  //   }
  //   return array;
  // }
  // const shuffledUserLikes = shuffleArray(userLikes);
  // const randomThreeSongs = shuffledUserLikes.slice(0, 3);

  return (
    <div id="likes-main__container">
      <div className="likes-sub__container">
        <div>
          <IoHeartSharp />
          {numLikes} Likes
        </div>
        <div
          onClick={() => history.push("/you/library")}
          style={{ cursor: "pointer" }}
        >
          View All
        </div>
      </div>
      <div className="liked-songs-container">
        {[...userLikes]
          .reverse()
          .slice(0, 3)
          .map((s, index) => (
            // Provide a unique key prop based on the index or a unique identifier of the 's' object
            <DisplayLikes
              key={`like-${index}`}
              {...{ s, user, userLikes, isPlayingState, currentlyPlaying }}
            />
          ))}
      </div>
    </div>
  );
};

export default Likes;
