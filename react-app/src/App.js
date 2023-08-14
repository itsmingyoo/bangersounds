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
      .then(() => setIsLoaded(true));
  }, [dispatch]);

  // Grab all states and send them as props
  const songs = useSelector((s) => Object.values(s.songs.Songs));
  const isPlayingState = useSelector((s) => s.songs.isPlaying);
  const currentlyPlaying = useSelector((s) => s.songs.CurrentlyPlaying);

  // Fix render issues
  if (songs.length === 0 || !songs) return null; // this fixes the audio player issues because we're passing in songs as props
  if (isLoaded === false) return null;

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/login">
            <LoginFormPage />
          </Route>
          <Route exact path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/upload">
            <PostNewSong />
          </Route>
          <Route exact path="/songs/:songId">
            <SongDetailsPage />
          </Route>
          <Route exact path="/">
            <LandingPage
              songs={songs}
              isPlayingState={isPlayingState}
              currentlyPlaying={currentlyPlaying}
            />
          </Route>
        </Switch>
      )}
      <AudioPlayer
        isLoaded={isLoaded}
        songs={songs}
        isPlayingState={isPlayingState}
        currentlyPlaying={currentlyPlaying}
      />
    </>
  );
}

export default App;
