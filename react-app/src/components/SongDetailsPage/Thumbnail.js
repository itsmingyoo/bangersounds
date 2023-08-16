import React from "react";

const Thumbnail = ({ song }) => {
  return (
    <>
      <div className="song-details__thumbnail">
        <img src={song.thumbnail} alt="fake Thumbnail" />
      </div>
    </>
  );
};

export default Thumbnail;
