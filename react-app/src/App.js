import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useLocation } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import * as songActions from "./store/songs";
import * as playlistActions from "./store/playlists";
import LandingPage from "./components/LandingPage";
import SongDetailsPage from "./components/SongDetailsPage";
import PostNewSong from "./components/PostNewSong";
import AudioPlayer from "./components/AudioPlayer";
import Profile from "./components/Profile";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AllUserComments from "./components/Profile/AllUserComments";
import Splash from "./components/SplashPage";
import SplashCarousel from "./components/SlickCarousel";
import LikesPage from "./components/LikesPage";
import Library from "./components/Profile/Library";
import "./index.css";

// !! REFACTORING CODE TO INITIALLY LOAD FASTER - SONGS LOADS 23s ONRENDER & 2.3s ON LOCAL
function App() {
  const dispatch = useDispatch();

  // THIS SOLVES THE ISSUE OF REDIRECTING FROM SPLASH PAGE TO ANOTHER PAGE AND IT WOULD SOLVE THE PROBLEM OF NAVBAR/AUDIOPLAYER NOT SHOWING - DONT ASK WHY OR HOW - IT JUST WORKS
  // PSA - WE'RE NOT EVEN USING THIS ANYWHERE AND IT SOLVES IT - YEAH DONT ASK - IT JUST SOLVES IT
  useLocation();
  // const locationRef = useRef(location);

  const [isLoaded, setIsLoaded] = useState(false);
  // const [path, setPath] = useState(window.location.pathname);

  // useEffect(() => {

  // });
  //* useSelector is unreliable with finding the updated state after an async function (i.e. the dispatches in the useEffect)
  //* Solution: we pass the user that uses a useSelector into useRef(user) then in a useEffect we set userRef.current = user
  const user = useSelector((s) => s.session.user);
  const userRef = useRef(user);
  useEffect(() => {
    userRef.current = user;
  });
  useEffect(() => {
    dispatch(authenticate())
      .then(() => dispatch(songActions.thunkGetLandingPageSongs()))
      .then(() => dispatch(songActions.thunkGetAllComments()))
      .then(() => dispatch(playlistActions.thunkGetAllPlaylists()))
      .then(() => {
        //* now we have the updated meta data of the user from the state after authenticating so it if user logs in, we will instantly have their data to compare within these async conditional dispatches
        if (userRef.current !== null) {
          return Promise.all([dispatch(songActions.thunkGetUserComments())]);
        }
        return Promise.resolve();
      })
      .then(() => {
        setIsLoaded(true);
      })
      .then(() => dispatch(songActions.thunkGetAllSongs()))

      //! CATCH ERRORS
      .catch((e) => {
        console.error("\n\n\n\nError fetching data:", e);
        // setIsLoaded(true);
      });
  }, [dispatch]);

  // const store = useSelector((s) => s);
  // console.log("this is my store: ", store);

  // Fix render issues
  // this fixes the audio player issues because we're passing in songs as props
  // if (songs.length === 0 || !songs || !comments) return null;
  if (isLoaded === false) return null;

  return (
    <>
      {/* <Navigation isLoaded={isLoaded} /> */}
      {isLoaded && window.location.pathname !== "/" && (
        <Navigation isLoaded={isLoaded} />
      )}
      {isLoaded && (
        <>
          <Switch>
            <Route exact path="/login">
              <LoginFormPage />
            </Route>
            <Route exact path="/signup">
              <SignupFormPage />
            </Route>

            <Route exact path="/splash">
              <SplashCarousel />
            </Route>

            <Route exact path="/upload">
              <ProtectedRoute>
                <PostNewSong />
              </ProtectedRoute>
            </Route>

            <Route exact path="/profile">
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            </Route>
            <Route exact path="/you/library">
              <ProtectedRoute>
                <Library />
              </ProtectedRoute>
            </Route>

            <Route exact path="/likes">
              <ProtectedRoute>
                <LikesPage />
              </ProtectedRoute>
            </Route>

            <Route exact path="/profile/comments">
              <ProtectedRoute>
                <AllUserComments />
              </ProtectedRoute>
            </Route>

            <Route exact path="/songs/:songId">
              <SongDetailsPage />
            </Route>

            <Route exact path="/discover">
              <LandingPage />
            </Route>

            <Route exact path="/">
              <Splash />
            </Route>
          </Switch>
        </>
      )}
      {/* <AudioPlayer {...{ isLoaded, songs, isPlayingState, currentlyPlaying, comments, userRef, previousSong }} /> */}
      <div
        className={
          isLoaded && window.location.pathname !== "/"
            ? ""
            : "hide-audio-player"
        }
      >
        <AudioPlayer
          {...{
            isLoaded,
          }}
        />
      </div>
    </>
  );
}

export default App;
