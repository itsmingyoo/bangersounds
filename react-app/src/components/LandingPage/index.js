import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { IoPlaySharp, IoPauseSharp } from "react-icons/io5";
import { playUserSongAction, setPlayingState } from "../../store/songs";

import "./LandingPage.css";
import ImageContainer from "./ImageContainer";

function LandingPage() {
  const dispatch = useDispatch();

  const songs = useSelector((s) => Object.values(s.songs.Songs));
  // console.log("LANDING - songs: ", songs);

  const isPlayingState = useSelector((s) => s.songs.isPlaying);
  // console.log("LANDING - isPlayingState: ", isPlayingState);

  const currentlyPlaying = useSelector((s) => s.songs.CurrentlyPlaying);
  // console.log("LANDING - currentlyPlaying: ", currentlyPlaying);

  const previousSong = useSelector((s) => s.songs.PreviousSong);
  // console.log("LANDING - previousSong: ", previousSong);

  const togglePlayPause = async (song) => {
    dispatch(playUserSongAction(song));

    if (currentlyPlaying) {
      if (currentlyPlaying.id === song.id)
        dispatch(setPlayingState(!isPlayingState));
      else dispatch(setPlayingState(true));
    }
  };

  const displayTopTransition = () => {
    window.scrollTo(0, 0);
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
                <ImageContainer
                  {...{
                    s,
                    togglePlayPause,
                    currentlyPlaying,
                    isPlayingState,
                    songs,
                    displayTopTransition,
                  }}
                />
                <NavLink to={`/songs/${s.id}`} onClick={displayTopTransition}>
                  <div
                    style={{ whiteSpace: "nowrap", overflow: "hidden" }}
                    title={s.title}
                  >
                    {s.title}
                  </div>
                </NavLink>
                <div
                  style={{
                    wordBreak: "break-all",
                    overflow: "hidden",
                    color: "#999",
                  }}
                >
                  {s.artistInfo.displayName}
                </div>
              </div>
            ))}
          {/* END of loop */}
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
