import React from "react";
import WaveForm from "../SongDetailsPage/WaveForm";
import PlayContent from "../SongDetailsPage/PlayContent";

const SongDisplay = ({ song, songs, isPlayingState, currentlyPlaying, comments, togglePlayPause }) => {
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
