import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import * as songActions from "./store/songs";
import LandingPage from "./components/LandingPage";
import SongDetailsPage from "./components/SongDetailsPage";
import PostNewSong from "./components/PostNewSong";
import AudioPlayer from "./components/AudioPlayer";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate())
      .then(() => dispatch(songActions.thunkGetAllSongs()))
      .then(() => dispatch(songActions.thunkGetAllComments()))
      .then(() => setIsLoaded(true));
  }, [dispatch]);

  // Grab all states and send them as props
  const songs = useSelector((s) => Object.values(s.songs.Songs));
  const comments = useSelector((s) => Object.values(s.songs.comments));
  const isPlayingState = useSelector((s) => s.songs.isPlaying);
  const currentlyPlaying = useSelector((s) => s.songs.CurrentlyPlaying);

  // Fix render issues
  if (songs.length === 0 || !songs || !comments) return null; // this fixes the audio player issues because we're passing in songs as props
  if (isLoaded === false) return null;

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {/* <div id="inner-root">
        <div id="inner-root-wrapper"> */}
      {isLoaded && (
        <Switch>
          <Route exact path="/login">
            <LoginFormPage />
          </Route>
          <Route exact path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/upload">
            <PostNewSong {...{ songs, isPlayingState, currentlyPlaying, comments }} />
          </Route>
          <Route exact path="/songs/:songId">
            <SongDetailsPage {...{ songs, isPlayingState, currentlyPlaying, comments }} />
          </Route>
          <Route exact path="/">
            <LandingPage {...{ songs, isPlayingState, currentlyPlaying, comments }} />
          </Route>
        </Switch>
      )}
      {/* </div>
      </div> */}

      <AudioPlayer {...{ isLoaded, songs, isPlayingState, currentlyPlaying, comments }} />
    </>
  );
}

export default App;
