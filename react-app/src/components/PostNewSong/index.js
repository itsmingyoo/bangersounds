// Post a New Song Form
import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { thunkPostNewSong } from "../../store/songs";
import TopNavBar from "./TopNavBar";
import UploadNavBar from "./UploadNavBar";
import Dropzone from "../DropZone";
import "./PostNewSong.css";

function PostNewSong() {
  const dispatch = useDispatch();
  const history = useHistory();
  // Initializing useDropzone hooks with options
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [songURL, setSongURL] = useState("");
  const [description, setDescription] = useState("");
  const [privated, setPrivated] = useState(false);
  const [caption, setCaption] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [song, setSong] = useState(null);
  const [songLoading, setSongLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submittedForm, setSubmittedForm] = useState(false);

  // Testing class FormData - can only append, no dot or bracket notation, and append accepts two args ('key', value)
  // const testData = new FormData();
  // let test = "test text";
  // testData.append("test", test);

  // for (const [key, value] of testData.entries()) {

  // }

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmittedForm(true);

    // Error Handlers for Frontend
    const errObj = {};
    // Add error handlers below
    if (title === "") errObj.title = "Title is required";
    if (description === "") errObj.description = "Description is required";

    if (title.length > 100) errObj.title = "Title can be up to 100 characters";
    if (description.length > 4000) errObj.description = "Description can be up to 4000 characters";
    if (caption.length > 140) errObj.caption = "Caption can be up to 140 characters";
    if (thumbnail.length > 255) errObj.thumbnail = "Thumbnail can be up to 255 characters";

    // If errors, STOP HERE (with return) => Set errors state
    if (Object.values(errObj).length > 0) {
      setSubmittedForm(false);
      return setErrors(errObj);
    }

    // FORMDATA APPEND VALIDATED DATA BEFORE SENDING IT OFF
    // AWS Form data - APPEND TAKES TWO ARGS ("KEY IN QUOTES", VALUE)
    const formData = new FormData();
    formData.append("title", title);
    formData.append("genre", genre);
    formData.append("description", description);
    formData.append("private", privated);
    formData.append("caption", caption);
    formData.append("thumbnail", thumbnail);
    formData.append("song", song);
    formData.append("song_url", songURL);

    let res = await dispatch(thunkPostNewSong(formData));

    if (!res.errors) {
      setSongLoading(true);
      // await dispatch(thunkGetSongById(res.id)); // remove this unless you have rendering issues after creating a new song
      setSubmittedForm(false);
      history.push(`/songs/${res.id}`);
    }
  };

  // Change Song Submit State to Render the Form of the Song
  const handleClick = async (e) => {
    setSong(e.target.files[0]);

    setSubmitted(true);
  };

  // onDrop function
  const onDrop = useCallback((acceptedFiles) => {
    const reader = new FileReader();

    reader.onload = function (e) {
      const audioFile = acceptedFiles[0];
      setSong(audioFile); // Update the 'song' state with the audio file object
      setSubmitted(true);
    };

    reader.readAsDataURL(acceptedFiles[0]); // Read the data URL of the dropped file
  }, []);

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
    // audio etc stuff
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
      name: "description",
      value: description,
      placeHolder: "Description",
      onChange: setDescription,
      title: "Description",
    },
    {
      name: "caption",
      value: caption,
      placeHolder: "Caption (Optional)",
      onChange: setCaption,
      title: "Caption",
    },
    {
      name: "thumbnail",
      value: thumbnail,
      placeHolder: "Thumbnail URL (Optional)",
      onChange: setThumbnail,
      title: "Thumbnail",
    },
  ];

  if (submitted === false) {
    return (
      <div id="new-song__main-container">
        <div id="new-song-wrapper">
          <TopNavBar />
          <UploadNavBar />
          {/*! MAIN CONTENT - BUTTON WILL BE TO SELECT FILE TO UPLOAD WITH AWS THEN AFTER VALIDATING CORRECT FILE TYPE - IT LEADS TO THE FORM WHILE UPLOADING  */}
          {/* Provide FLAC, WAV, ALAC, or AIFF for highest audio quality -- .mp3 works as well */}
          <Dropzone onDrop={onDrop} accept={"audio/*"} />
        </div>
      </div>
    );
  }
  if (submitted === true) {
    return (
      <>
        <div>
          <form className="new-song__form" onSubmit={onSubmit} encType="multipart/form-data">
            {inputs.map((el, index) => {
              if (el.name === "description") {
                return (
                  <div key={el.name}>
                    <div>{el.title}</div>
                    <textarea
                      type="text"
                      name={el.name}
                      placeholder={el.placeHolder}
                      value={el.value}
                      onChange={(e) => el.onChange(e.target.value)}
                    />
                    {submitted && errors[el.name] && (
                      <div className="errors" key={`error-${el.name}`}>
                        {errors[el.name]}
                      </div>
                    )}
                  </div>
                );
              } else {
                return (
                  <div key={el.name}>
                    <div>{el.title}</div>
                    <input
                      type="text"
                      name={el.name}
                      placeholder={el.placeHolder}
                      value={el.value}
                      onChange={(e) => el.onChange(e.target.value)}
                    />
                    {submitted && errors[el.name] && (
                      <div className="errors" key={`error-${el.name}`}>
                        {errors[el.name]}
                      </div>
                    )}
                  </div>
                );
              }
            })}
            <div className="select-container">
              <div>Genre</div>
              <select
                className="select__dropdown"
                name="genre"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                required
              >
                <option value="">Select Genre</option>
                {genres.map((el) => (
                  <option value={el.name} key={`${el.name}-one`}>
                    {el.name}
                  </option>
                ))}
              </select>
            </div>
            <div id="new-song__radio-btns">
              <input
                type="radio"
                name="private"
                value="false"
                id="public"
                onChange={(e) => setPrivated(false)}
                checked={!privated}
              />
              <label for="public">Public</label>
              <input
                type="radio"
                name="private"
                value="true"
                id="private"
                onChange={(e) => setPrivated(true)}
                checked={privated}
              />
              <label for="private">Private</label>
            </div>
            {submitted && errors.genre && <div className="errors">{errors.genre}</div>}
            <div id="new-song__submit">
              <button className="white-btn-black-txt" onClick={(e) => history.push("/")}>
                Cancel
              </button>
              <button className={submittedForm ? "disabled-button" : "orange-btn-white-txt"} disabled={submittedForm}>
                Save
              </button>
              {songLoading && <p>Loading . . .</p>}
            </div>
          </form>
        </div>
      </>
    );
  }
}

export default PostNewSong;

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
// const [song, setSong] = useState(null);
// const [songLoading, setSongLoading] = useState(false);

// const handleSubmit = async (e) => {
//   e.preventDefault();
//   const formData = new FormData();

//   // append the state to the formData
//   formData.append("song", song);

//   // aws uploads can be a bit slow—displaying
//   // some sort of loading message is a good idea

//   // change state of loading
//   setSongLoading(true);

// TEST AWS
// dispatch, save result, log response

// let res = await dispatch(thunkTestAws(formData));

//   "back in the component! its completed the dispatch; this is the res from that dispatch",
//   res
// );
// history.push("/images");
// };
// return (
//   <>
//     <div>
//       <form onSubmit={handleSubmit} encType="multipart/form-data">
//         <div>
//           <input
//             type="file"
//             accept="audio/*"
//             onChange={(e) => setSong(e.target.files[0])}
//           />
//           <button type="submit" style={{ "font-size": "100px" }}>
//             PRESS THIS TO TEST
//           </button>
//           {songLoading && <p>Loading...</p>}
//         </div>
//       </form>
//     </div>
//   </>
// );
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------
{
  /** OLD BORING CLICK TO UPLOAD SONG
        <div id="new-song__upload-container">
          <div id="new-song__upload-button">
            <h1>Drag and drop your tracks & albums here</h1>
            <div className="orange-btn-white-txt-upload">
              <label for="upload-new-song">
                <input
                  type="file"
                  accept="audio/*"
                  // onChange={(e) => setSong(e.target.files[0])}
                  onChange={handleClick}
                  className="orange-btn-white-txt-upload"
                  id="upload-new-song"
                  style={{ display: "none" }}
                />
                or choose files to upload
              </label>
            </div>

            <label>
              <input type="checkbox" name="multiple-files" />
              Make a playlist when multiple files are selected
            </label>
          </div>
        </div>
        */
}
