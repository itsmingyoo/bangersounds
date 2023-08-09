import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { ModalProvider, Modal } from "./context/Modal";
import configureStore from "./store";
import * as sessionActions from "./store/session";
import * as songActions from "./store/songs";
import App from "./App";

import "./index.css";

const store = configureStore();

if (process.env.NODE_ENV !== "production") {
  window.store = store;
  window.sessionActions = sessionActions;
  window.songActions = songActions;
}

// example to use in console to test thunk
// window.store.dispatch(window.actionName.thunkName(arg))
// window.store.dispatch(window.songActions.thunkGetSongById(1))
// POST NEW SONG COPY PASTA
// window.store.dispatch(window.songActions.thunkPostNewSong({
//   "title": "Test Route",
//   "genre": "TestGenre",
//   "song_url": "TestLink",
//   "description": "Test description",
//   "private": "false"
// }))

// Wrap the application with the Modal provider and render the Modal component
// after the App component so that all the Modal content will be layered as
// HTML elements on top of the all the other HTML elements:
function Root() {
  return (
    <ModalProvider>
      <Provider store={store}>
        <BrowserRouter>
          <App />
          <Modal />
        </BrowserRouter>
      </Provider>
    </ModalProvider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById("root")
);
