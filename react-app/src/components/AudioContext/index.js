import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoPlaySharp, IoPauseSharp } from "react-icons/io5";
import { playUserSongAction, setPlayingState } from "../../store/songs";
import "./AudioContext.css";

const SongProvider = ({ song }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const dispatch = useDispatch();
  const isPlayingState = useSelector((s) => s.songs.isPlayingState);

  // Btn Func
  const togglePlayPause = async () => {
    setIsPlaying((prev) => !prev);
    await dispatch(playUserSongAction(song));
    await dispatch(setPlayingState(!isPlaying));
  };

  return (
    <button onClick={togglePlayPause}>
      {isPlaying || isPlayingState ? <IoPauseSharp /> : <IoPlaySharp />}
    </button>
  );
};

export default SongProvider;
