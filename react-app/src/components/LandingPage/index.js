import React, { useState, useEffect } from "react";
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
  const currentSong = useSelector((s) => s.songs.CurrentlyPlaying);
  const isPlayingState = useSelector((s) => s.songs.isPlaying);
  const [test, setTest] = useState(false);

  const [isPlaying, setIsPlaying] = useState(null);

  const togglePlayPause = async (song) => {
    console.log("this is current play state", isPlayingState);
    const reverseState = !isPlayingState;
    console.log("this is reverseState", reverseState);
    setIsPlaying(song.id);
    setTest(!test);
    await dispatch(playUserSongAction(song));
    let res = await dispatch(setPlayingState(!isPlayingState));
    console.log(
      "this is res of playingstate after you clicked the song play button",
      res.boolean
    );
  };

  useEffect(() => {
    // console.log(`Landing Page UseEffect - stateSong===`, currentSong);
  });

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
                    {/* if song id matches what is playing AND test = true, render the different buttons */}
                    {isPlaying === s.id && test ? (
                      <IoPauseSharp />
                    ) : (
                      <IoPlaySharp />
                    )}
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
