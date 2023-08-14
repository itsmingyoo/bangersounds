import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Redirect } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { IoPlaySharp, IoPauseSharp } from "react-icons/io5";
import { playUserSongAction, setPlayingState } from "../../store/songs";

import "./LandingPage.css";

function LandingPage() {
  const dispatch = useDispatch();

  const allSongs = useSelector((s) => Object.values(s.songs.Songs));
  const currentSong = useSelector((s) => s.songs.CurrentlyPlaying);
  const isPlayingState = useSelector((s) => s.songs.isPlaying);

  const [prevSong, setPrevSong] = useState(null);
  const [test, setTest] = useState(false);
  const [curSong, setCurSong] = useState(null);

  useEffect(() => {
    console.log("-------------USE EFFECT------------");
    console.log("prevSong ==>", prevSong);
    console.log("curSong ==>", curSong);
    console.log("isPlayingState ==>", isPlayingState);
    console.log("-----------END USE EFFECT-----------");
  });

  const togglePlayPause = async (song) => {
    console.log("-----------START-------------");
    console.log("CURRENT STATE - BUTTON IS CLICKED");
    console.log("this is the prop song", song);
    console.log("this is prop songid", song.id);

    //!!!!! THIS IS A REMINDER THAT ALL THESE CHECKS ARE AFTER A USE CLICKS ANY PLAY BUTTON
    //!!!!! THIS IS A REMINDER THAT ALL THESE CHECKS ARE AFTER A USE CLICKS ANY PLAY BUTTON
    //!!!!! THIS IS A REMINDER THAT ALL THESE CHECKS ARE AFTER A USE CLICKS ANY PLAY BUTTON
    //!!!!! THIS IS A REMINDER THAT ALL THESE CHECKS ARE AFTER A USE CLICKS ANY PLAY BUTTON
    //!!!!! THIS IS A REMINDER THAT ALL THESE CHECKS ARE AFTER A USE CLICKS ANY PLAY BUTTON
    //!!! TEST BELOW

    dispatch(playUserSongAction(song));
    setCurSong(song.id); // synchronizes mapped components play buttons to this local state
    setTest(!test); // fixes button toggling
    console.log("DISPATCHED SONG");
    // if (prevSong === null) {
    //   setPrevSong(song.id);

    //   dispatch(setPlayingState(true)); // Start playing the song since there's no previous song

    //   console.log("set initial prevSong and started playing");
    // } else if (curSong && isPlayingState) {
    //   dispatch(setPlayingState(!isPlayingState)); // Toggle play/pause if it's the same song

    //   console.log("toggled play/pause");
    // } else {
    //   setPrevSong(curSong); // Update prevSong since a different song is selected
    //   dispatch(setPlayingState(true)); // Start playing the new song
    //   console.log("changed song and started playing");
    // }

    // if (cur)
    //!!! TEST ABOVE

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

    console.log("-----------END CURRENT STATE-------------");

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
                    {curSong === s.id && test ? (
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
