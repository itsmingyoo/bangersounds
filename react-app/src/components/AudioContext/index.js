import React, { useState, createContext, useContext } from "react";
import { IoPlaySharp, IoPauseSharp } from "react-icons/io5";
import "./AudioContext.css";

// Define the context
export const SongContext = createContext();

// Custom hook to use the context
export const useSong = () => useContext(SongContext);

const AudioPlayButton = ({ song }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  return (
    <SongContext.Provider value={{ song }}>
      <button onClick={togglePlayPause}>
        {isPlaying ? <IoPauseSharp /> : <IoPlaySharp />}
      </button>
    </SongContext.Provider>
  );
};

export default AudioPlayButton;
