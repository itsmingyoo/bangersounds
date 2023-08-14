import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Redirect } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { IoPlaySharp, IoPauseSharp } from "react-icons/io5";
import { playUserSongAction, setPlayingState } from "../../store/songs";
import AudioPlayButton from "../AudioContext";

import "./LandingPage.css";

function LandingPage() {
  const dispatch = useDispatch();
  const allSongs = useSelector((s) => Object.values(s.songs.Songs));
  // console.log(allSongs); // allSongs.artistInfo.display_name
  const [isPlaying, setIsPlaying] = useState(null);

  const togglePlayPause = async (song) => {
    setIsPlaying(song.id);
    await dispatch(playUserSongAction(song));
    await dispatch(setPlayingState(!isPlaying));
  };

  return (
    <>
      <h1>Hello, this is the landing page</h1>
      {/* MAP TO TEST ALL AWS SONG LINKS */}
      {/* {allSongs.map((s) => (
        <a href={s.songURL} id="test-links" target="_blank">
          Test Link - {s.title}
        </a>
      ))} */}
      <div id="recently-played__container">
        <h2>Recently Played</h2>
        <div id="recently-played__songs">
          {/* START of loop */}
          {allSongs &&
            allSongs.map((s) => (
              <div key={s.id} id="recently-played__each-song-container">
                <div>
                  {/* Play button should play song when clicked */}
                  {/* <button>
                    <i className="fa-solid fas fa-play"></i>
                  </button> */}

                  <button
                    onClick={() => togglePlayPause(s)}
                    className="orange-btn-white-txt play-btn"
                  >
                    {isPlaying === s.id ? <IoPauseSharp /> : <IoPlaySharp />}
                  </button>

                  {/* Image should link to song id page */}
                  <NavLink to={`/songs/${s.id}`}>
                    <img
                      src={
                        s.thumbnail
                          ? s.thumbnail
                          : "https://i1.sndcdn.com/artworks-R5fUpysnmuGuxcMv-5ojqxQ-t500x500.png"
                      }
                      className="recently-played__images"
                      alt={`p-image__${s.title}`}
                      // onClick={() => Redirect(`/home`)}
                    />
                  </NavLink>
                </div>
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
    </>
  );
}

export default LandingPage;
