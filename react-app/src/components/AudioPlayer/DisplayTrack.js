import React from "react";

function DisplayTrack({ currentSong }) {
  console.log("this is song in displaytrack", currentSong);
  return (
    <div>
      <audio src={currentSong} controls />
    </div>
  );
}
export default DisplayTrack;
