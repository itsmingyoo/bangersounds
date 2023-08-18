import React from "react";
import WaveForm from "../SongDetailsPage/WaveForm";
import PlayContent from "../SongDetailsPage/PlayContent";

const SongDisplay = ({ userSongs, isPlayingState, currentlyPlaying, togglePlayPause }) => {
  return (
    <div>
      <div>SongDisplay</div>
      {/* <img src={} */}
      {/* <PlayContent /> */}
      <WaveForm />
    </div>
  );
};

export default SongDisplay;
