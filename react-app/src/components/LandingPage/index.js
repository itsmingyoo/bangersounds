import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { IoPlaySharp, IoPauseSharp } from "react-icons/io5";
import { playUserSongAction, setPlayingState } from "../../store/songs";

import "./LandingPage.css";
import ImageContainer from "./ImageContainer";

function LandingPage({ songs, isPlayingState, currentlyPlaying }) {
  const dispatch = useDispatch();

  const togglePlayPause = async (song) => {
    dispatch(playUserSongAction(song));

    if (currentlyPlaying) {
      if (currentlyPlaying.id === song.id) dispatch(setPlayingState(!isPlayingState));
      else dispatch(setPlayingState(true));
    }
  };

  return (
    <div className="landing-page__main-container">
      <div id="recently-played__container">
        <h2>Recently Played</h2>
        <div id="recently-played__songs">
          {/* START of loop */}
          {songs &&
            songs.map((s) => (
              <div key={s.id} id="recently-played__each-song-container">
                <ImageContainer {...{ s, togglePlayPause, currentlyPlaying, isPlayingState, songs }} />
                <div>
                  {/* need to change this later bc its not the real 'artist - song name' format from the AWS file link */}
                  {/* <div>
                    {s.artistInfo.firstName} {s.artistInfo.lastName}
                  </div> */}
                  <div>{s.title}</div>
                </div>
                <div>{s.artistInfo.displayName}</div>
              </div>
            ))}
          {/* END of loop */}
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
