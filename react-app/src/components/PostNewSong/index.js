// Post a New Song Form
// frontend/src/components/Products/CreateNewProduct/index.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { thunkGetSongById, thunkPostNewSong } from "../../store/songs";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import "./PostNewSong.css";

function PostNewSong() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [songURL, setSongURL] = useState("");
  const [description, setDescription] = useState("");
  const [privated, setPrivated] = useState(false);
  const [caption, setCaption] = useState("");
  const [previewImageURL, setPreviewImageURL] = useState("");

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    // Error Handlers for Frontend
    const errObj = {};
    // Add error handlers below

    // If errors, STOP HERE (with return) => Set errors state
    if (Object.values(errObj).length > 0) return setErrors(errObj);

    let song = {
      title,
      genre,
      song_url: songURL,
      description,
      private: privated,
      caption,
      preview_imageURL: previewImageURL,
    };

    let res = await dispatchEvent(thunkPostNewSong(song));

    console.log("this is res after post new song dispatch", res);

    if (!res.errors) {
      await dispatch(thunkGetSongById(res.id));
      history.push(`/songs/${res.id}`);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
  };

  const list = [
    { name: "Upload", to: "/new" },
    { name: "Mastering", to: "#" },
    { name: "Your Tracks", to: "/you/tracks" },
    { name: "Insights", to: "#" },
    { name: "Artist Plans", to: "#" },
  ];
  return (
    <div id="new-song__main-container">
      <div id="nav-bar__container">
        <ul className="nav-bar__ul">
          {list.map((n) => (
            <li key={`navPost-${list.indexOf(n)}`} className="nav-bar__lists">
              <NavLink to={n.to}>{n.name}</NavLink>
            </li>
          ))}
        </ul>
        <div className="nav-bar__bangersounds-link">
          <NavLink to="#">(ICON) BangerSounds for Artists</NavLink>
        </div>
      </div>

      <div id="new-song__upload-space">
        <div>
          <div>1% of free uploads used</div>
          <div>2 of 180 minutes (1%) used</div>
          <div>
            <NavLink to="#">Try Next Pro</NavLink> to get unlimited uploads.
          </div>
        </div>
        <div>
          <button className="orange-btn-outline-txt">Try Next Pro</button>
        </div>
      </div>

      {/*! MAIN CONTENT - BUTTON WILL BE TO SELECT FILE TO UPLOAD WITH AWS THEN AFTER VALIDATING CORRECT FILE TYPE - IT LEADS TO THE FORM WHILE UPLOADING  */}
      {/* Provide FLAC, WAV, ALAC, or AIFF for highest audio quality -- .mp3 works as well */}
      <div id="new-song__upload-container">
        <div id="new-song__upload-button">
          <h1>Drag and drop your tracks & albums here</h1>
          <button className="orange-btn-white-txt" onClick={handleClick}>
            or choose files to upload
          </button>

          <label>
            <input type="checkbox" name="multiple-files" />
            Make a playlist when multiple files are selected
          </label>
        </div>
      </div>
    </div>
  );
}

export default PostNewSong;
