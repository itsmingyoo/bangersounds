import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { thunkEditSongById } from "../../store/songs";
import "./SongDetailsPage.css";

const EditSong = ({
  song,
  songs,
  isPlayingState,
  currentlyPlaying,
  togglePlayPause,
  comments,
  songId,
  isUserSong,
  user,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [songURL, setSongURL] = useState("");
  const [description, setDescription] = useState("");
  const [privated, setPrivated] = useState(false);
  const [caption, setCaption] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [songUpload, setSongUpload] = useState(null);
  const [songLoading, setSongLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [submittedForm, setSubmittedForm] = useState(false);
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
      placeHolder: "Caption",
      onChange: setCaption,
      title: "Caption",
    },
    {
      name: "thumbnail",
      value: thumbnail,
      placeHolder: "Thumbnail URL",
      onChange: setThumbnail,
      title: "Thumbnail",
    },
  ];
  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmittedForm(true);

    // Error Handlers for Frontend
    const errObj = {};
    // Add error handlers below

    // If errors, STOP HERE (with return) => Set errors state
    if (Object.values(errObj).length > 0) return setErrors(errObj);

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

    let res = await dispatch(thunkEditSongById(song.id, formData));

    // console.log("this is res after post new song dispatch", res);

    if (!res.errors) {
      setSongLoading(true);
      // await dispatch(thunkGetSongById(res.id)); // remove this unless you have rendering issues after creating a new song
      history.push(`/songs/${res.id}`);
    }
  };
  return (
    <div id="edit__main-container">
      <div id="edit-wrapper">
        {/* flex row */}
        <div className="edit-files__container">
          <button className="download-file">Download file</button>
          <button>
            <label className="upload-new" for="upload-new-file">
              <input
                type="file"
                accept="audio/*"
                onChange={(e) => setSongUpload(e.target.files[0])}
                // onChange={handleClick}
                className="orange-btn-white-txt"
                style={{ display: "none" }}
                id="upload-new-file"
              />
              Replace file
            </label>
          </button>
        </div>
        <div className="edit-tabs">
          <span>Basic Info</span>
          <span>Metadata</span>
          <span>Permissions</span>
          <span>Advanced</span>
          <span>NEW</span>
        </div>
        <div>
          <div>
            <img src="" alt="preview image here"></img>
          </div>
          <div>
            <form className="new-song__form" onSubmit={onSubmit} encType="multipart/form-data">
              {inputs.map((el, index) => (
                <div key={el.name}>
                  <div>{el.title}</div>
                  <input
                    type="text"
                    name={el.name}
                    placeholder={el.placeHolder}
                    value={el.value}
                    onChange={(e) => el.onChange(e.target.value)}
                  />
                  {submittedForm && errors[el.name] && (
                    <div className="errors" key={`error-${el.name}`}>
                      {errors[el.name]}
                    </div>
                  )}
                </div>
              ))}
              <div className="select-container">
                <div>Genre</div>
                <select
                  className="select__dropdown"
                  name="genre"
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                >
                  <option value="">Select Genre</option>
                  {genres.map((el) => (
                    <option value={el.name} key={`${el.name}-one`}>
                      {el.name}
                    </option>
                  ))}
                  {/* {console.log(genre)} */}
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
              {submittedForm && errors.genre && <div className="errors">{errors.genre}</div>}
              <div id="new-song__submit">
                <button className="white-btn-black-txt" onClick={(e) => history.push("/")}>
                  Cancel
                </button>
                <button className="orange-btn-white-txt">Save</button>
                {songLoading && <p>Loading . . .</p>}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditSong;
