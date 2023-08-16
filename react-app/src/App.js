import React, { useState, useEffect, useRef } from "react";
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
import Profile from "./components/Profile";
import ProtectedRoute from "./components/auth/ProtectedRoute";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  //* useSelector is unreliable with finding the updated state after an async function (i.e. the dispatches in the useEffect)
  //* Solution: we pass the user that uses a useSelector into useRef(user) then in a useEffect we set userRef.current = user
  const user = useSelector((s) => s.session.user);
  const userRef = useRef(user);
  useEffect(() => {
    userRef.current = user;
  });
  useEffect(() => {
    dispatch(authenticate())
      .then(() => dispatch(songActions.thunkGetAllSongs()))
      .then(() => dispatch(songActions.thunkGetAllComments()))
      .then(() => {
        //* now we have the updated meta data of the user from the state after authenticating so it if user logs in, we will instantly have their data to compare within these async conditional dispatches
        if (userRef.current !== null) {
          // console.log("app.js fetching user comments...");
          return Promise.all([dispatch(songActions.thunkGetUserComments())]);
        }
        return Promise.resolve();
      })
      .then(() => {
        // console.log("Data fetch complete");
        setIsLoaded(true);
      })
      //! CATCH ERRORS
      .catch((e) => {
        // console.error("Error fetching data:", e);
        setIsLoaded(true);
      });
  }, [dispatch]);

  // Grab all states and send them as props
  const songs = useSelector((s) => Object.values(s.songs.Songs));
  const isPlayingState = useSelector((s) => s.songs.isPlaying);
  const currentlyPlaying = useSelector((s) => s.songs.CurrentlyPlaying);
  const comments = useSelector((s) => s.songs.comments);

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
            <ProtectedRoute>
              <PostNewSong {...{ songs, isPlayingState, currentlyPlaying, comments }} />
            </ProtectedRoute>
          </Route>

          <Route exact path="/profile">
            <ProtectedRoute>
              <Profile {...{ songs, isPlayingState, currentlyPlaying, comments }} />
            </ProtectedRoute>
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
