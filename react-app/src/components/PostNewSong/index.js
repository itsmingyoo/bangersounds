// Post a New Song Form
// frontend/src/components/Products/CreateNewProduct/index.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { thunkGetSongById, thunkPostNewSong } from "../../store/songs";
// IMPORT TO TEST AWS
// import { thunkTestAws } from "../../store/songs";

import { NavLink } from "react-router-dom";
import TopNavBar from "./TopNavBar";
import "./PostNewSong.css";
import UploadNavBar from "./UploadNavBar";

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
    setSubmitted(true);
  };
  const genres = [
    { name: "None" },
    { name: "Alternative Rock" },
    { name: "Ambient" },
    { name: "Classical" },
    { name: "Country" },
    { name: "Dance & EDM" },
    { name: "Dancehall" },
    { name: "Deep House" },
    { name: "Disco" },
    { name: "Drum & Bass" },
    { name: "Dubstep" },
    { name: "Electronic" },
    { name: "Folk & Singer-Songwriter" },
    { name: "Hip-hop & Rap" },
    { name: "House" },
    { name: "Indie" },
    { name: "Jazz & Blues" },
    { name: "Latin" },
    { name: "Metal" },
    { name: "Piano" },
    { name: "Pop" },
    { name: "R&B & Soul" },
    { name: "Reggae" },
    { name: "Reggaeton" },
    { name: "Rock" },
    { name: "Soundtrack" },
    { name: "Techno" },
    { name: "Trance" },
    { name: "Trap" },
    { name: "Triphop" },
    { name: "World" },
    { name: "Audiobooks" },
    { name: "Business" },
    { name: "Comedy" },
    { name: "Entertainment" },
    { name: "Learning" },
    { name: "News & Politics" },
    { name: "Religion & Spirituality" },
    { name: "Sports" },
    { name: "Storytelling" },
    { name: "Technology" },
  ];
  const inputs = [
    {
      name: "title",
      value: title,
      placeHolder: "Title",
      onChange: setTitle,
      title: "Title*",
    },
    {
      name: "songURL",
      value: songURL,
      placeHolder: "Song URL",
      onChange: setSongURL,
      title: "Song URL",
    },
    {
      name: "description",
      value: description,
      placeHolder: "Description",
      onChange: setDescription,
      title: "Description",
    },
    {
      name: "caption",
      value: caption,
      placeHolder: "Caption",
      onChange: setCaption,
      title: "Caption",
    },
    {
      name: "previewImageURL",
      value: previewImageURL,
      placeHolder: "Preview Image URL",
      onChange: setPreviewImageURL,
      title: "Preview Image URL",
    },
  ];
  //   TESTING TWO DIFFERENT RENDERS - POST-TEST-RESULTS: WORKS
  //   if (submitted) {
  //     return <h1>submitted is TRUE</h1>;
  //   }
  //   if (submitted === false) {
  //     return (
  //       <>
  //         <h1>submitted is FALSE</h1>;
  //         <button onClick={() => setSubmitted(true)}>CHANGE STATE</button>;
  //       </>
  //     );
  //   }

  // ---------------------------------------------------------------------------------------------------------------------------------------------------------------------
  // TEST ROUTE FOR AWS
  const [song, setSong] = useState(null);
  const [songLoading, setSongLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    // append the state to the formData
    formData.append("song", song);

    // aws uploads can be a bit slow—displaying
    // some sort of loading message is a good idea

    // change state of loading
    setSongLoading(true);

    // TEST AWS
    // dispatch, save result, log response
    // console.log("you hit submit! now waiting for dispatch response");
    // let res = await dispatch(thunkTestAws(formData));
    // console.log(
    //   "back in the component! its completed the dispatch; this is the res from that dispatch",
    //   res
    // );
    // history.push("/images");
  };
  return (
    <>
      <div>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div>
            <input
              type="file"
              accept="audio/*"
              onChange={(e) => setSong(e.target.files[0])}
            />
            <button type="submit" style={{ "font-size": "100px" }}>
              PRESS THIS TO TEST
            </button>
            {songLoading && <p>Loading...</p>}
          </div>
        </form>
      </div>
    </>
  );
  // ---------------------------------------------------------------------------------------------------------------------------------------------------------------------
  // if (submitted === false) {
  //   return (
  //     <div id="new-song__main-container">
  //       <TopNavBar />
  //       <UploadNavBar />
  //       {/*! MAIN CONTENT - BUTTON WILL BE TO SELECT FILE TO UPLOAD WITH AWS THEN AFTER VALIDATING CORRECT FILE TYPE - IT LEADS TO THE FORM WHILE UPLOADING  */}
  //       {/* Provide FLAC, WAV, ALAC, or AIFF for highest audio quality -- .mp3 works as well */}
  //       <div id="new-song__upload-container">
  //         <div id="new-song__upload-button">
  //           <h1>Drag and drop your tracks & albums here</h1>
  //           <button className="orange-btn-white-txt" onClick={handleClick}>
  //             or choose files to upload
  //           </button>

  //           <label>
  //             <input type="checkbox" name="multiple-files" />
  //             Make a playlist when multiple files are selected
  //           </label>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }
  // if (submitted === true) {
  //   return (
  //     <>
  //       <div>
  //         <form className="new-song__form">
  //           {inputs.map((el) => (
  //             <div key={el.title}>
  //               <div>{el.title}</div>
  //               <input
  //                 type="text"
  //                 name={el.name}
  //                 placeholder={el.placeHolder}
  //                 value={`${el.value}`}
  //                 onChange={(e) => el.onChange(e.target.value)}
  //               />
  //               {submitted && errors[el.name] && (
  //                 <div className="errors">{errors[el.name]}</div>
  //               )}
  //             </div>
  //           ))}
  //           <div>Genre</div>
  //           <select
  //             name="genre"
  //             value={genre}
  //             onChange={(e) => setGenre(e.target.value)}
  //           >
  //             <option value="">Select Genre</option>
  //             {genres.map((el) => (
  //               <option value={el.name}>{el.name}</option>
  //             ))}
  //           </select>
  //           {submitted && errors.genre && (
  //             <div className="errors">{errors.genre}</div>
  //           )}
  //         </form>
  //       </div>
  //     </>
  //   );
  // }
}

export default PostNewSong;
