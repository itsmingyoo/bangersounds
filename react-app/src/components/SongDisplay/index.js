import React from "react";
import WaveForm from "../SongDetailsPage/WaveForm";
import ProfilePicture from "../SongDetailsPage/ProfilePicture";
import PlayContent from "../SongDetailsPage/PlayContent";
import "./SongDisplay.css";

const SongDisplay = ({ user, userSongs, isPlayingState, currentlyPlaying, togglePlayPause }) => {
  console.log("user", user);
  return (
    <div id="song-display-container">
      <div className="song-display-pfp">
        <ProfilePicture user={user} />
      </div>

      <div>
        {userSongs.map((song) => (
          <div className="song-display__each-song">
            <PlayContent {...{ song, isPlayingState, currentlyPlaying, togglePlayPause }} />
          </div>
        ))}

        <div className="song-display-waveform">
          <WaveForm />
        </div>
      </div>
    </div>
  );
};

export default SongDisplay;
