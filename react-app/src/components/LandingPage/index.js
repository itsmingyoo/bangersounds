import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { IoPlaySharp, IoPauseSharp } from "react-icons/io5";
import { playUserSongAction, setPlayingState } from "../../store/songs";

import "./LandingPage.css";

function LandingPage({ songs, isPlayingState, currentlyPlaying }) {
  const dispatch = useDispatch();
  const [test, setTest] = useState(false);

  const togglePlayPause = async (song) => {
    dispatch(playUserSongAction(song));
    setTest(!test); // fixes button toggling

    if (currentlyPlaying) {
      if (currentlyPlaying.id === song.id) dispatch(setPlayingState(!isPlayingState));
      else dispatch(setPlayingState(true));
    }

    // ! Keeping this code for reference
    //* PASS CURRENT SONG INTO STATE, ALWAYS
    // dispatch(playUserSongAction(song));
    // setCurSong(song.id); // synchronizes mapped components play buttons to this local state
    // setTest(!test); // fixes button toggling
    // console.log("DISPATCHED SONG");

    // //* STORE SONG AS PREVSONG AS INITIAL VALUE
    // if (prevSong === null) {
    //   setPrevSong(song.id); // set initial songId value for prevSong
    // }

    // //* KEEPS PLAYING STATE TRUE BECAUSE USER WANTS TO CHOOSE A DIFFERENT SONG
    // if (prevSong !== curSong) {
    //   dispatch(setPlayingState(true));
    //   console.log("after dispatching state to true if prevsong != cursong");
    // }

    // //* HANDLE PLAY/PAUSE
    // if (curSong === prevSong && isPlayingState === true) {
    //   dispatch(setPlayingState(!isPlayingState));
    //   console.log("PAUSE SONG IF BLOCK - CUR = PREV && PLAYING = TRUE");
    // }

    // if (curSong === prevSong && isPlayingState === false) {
    //   dispatch(setPlayingState(true));
    //   console.log("PLAY SONG IF BLOCK - CUR = PREV && PLAYING = FALSE");
    // }

    // console.log("-----------END CURRENT STATE-------------");

    // KEEP SONG PLAYING IF STATE IS TRUE, THEN STORE CURR SONG AS PREV SONG
    // if (curSong !== prevSong && isPlayingState === true) {
    //   setPrevSong(song.id);

    //   console.log(
    //     "IF - prevSong value when different song is played",
    //     prevSong
    //   );
    //   return;
    // }

    // if (isPlayingState === false) {
    //   let res = await dispatch(setPlayingState(true));
    //   console.log("isplayingstate when condition is false", res);
    //   return;
    // }
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
                <div className="recently-played__btn-link">
                  {/* RESPONSIVE PLAY/PAUSE BUTTON */}
                  <button onClick={() => togglePlayPause(s)} className="orange-btn-white-txt play-btn centered-button">
                    <div className="icon-container">
                      {currentlyPlaying.id === s.id && isPlayingState ? (
                        <IoPauseSharp className="song-btn" />
                      ) : (
                        <IoPlaySharp className="song-btn" />
                      )}
                    </div>
                  </button>
                  <NavLink to={`/songs/${s.id}`}>
                    <div className="song-image__container">
                      <img
                        src={
                          s.thumbnail
                            ? s.thumbnail
                            : "https://i1.sndcdn.com/artworks-R5fUpysnmuGuxcMv-5ojqxQ-t500x500.png"
                        }
                        className="recently-played__images"
                        alt={`p-image__${s.title}`}
                      />
                    </div>
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
    </div>
  );
}

export default LandingPage;
