import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { IoPlaySharp, IoPauseSharp } from "react-icons/io5";
import { playUserSongAction } from "../../store/songs";
import "./AudioContext.css";

const SongProvider = ({ song }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const dispatch = useDispatch();

  // Btn Func
  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
    dispatch(playUserSongAction(song));
  };

  return (
    <button onClick={togglePlayPause}>
      {isPlaying ? <IoPauseSharp /> : <IoPlaySharp />}
    </button>
  );
};

export default SongProvider;
