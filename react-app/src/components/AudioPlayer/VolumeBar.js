import React, { useEffect, useState } from "react";
import { IoMdVolumeHigh, IoMdVolumeOff, IoMdVolumeLow } from "react-icons/io";
import "./AudioPlayer.css";

const VolumeBar = ({ audioRef }) => {
  const [volume, setVolume] = useState(40);
  const [mute, setMute] = useState(false);

  useEffect(() => {
    if (audioRef) {
      audioRef.current.volume = volume / 100; // dividing by 100 here bc the max value of the property in audioRef is 1, so this is to make it in sync
      audioRef.current.muted = mute;
    }
  }, [volume, audioRef, mute]);
  return (
    <>
      <div className="volume">
        <button
          onClick={() => setMute((prev) => !prev)}
          className="volume-button"
        >
          {mute || volume < 5 ? (
            <IoMdVolumeOff />
          ) : volume < 40 ? (
            <IoMdVolumeLow />
          ) : (
            <IoMdVolumeHigh />
          )}
        </button>
        <input
          type="range"
          min={0}
          max={100}
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
          style={{
            background: `linear-gradient(to right, #f50 ${volume}%, #ccc ${volume}%)`,
          }}
        />
      </div>
    </>
  );
};

export default VolumeBar;
