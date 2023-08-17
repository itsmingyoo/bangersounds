import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { thunkEditSongById } from "../../store/songs";
import { useModal } from "../../context/Modal";
import "./SongDetailsPage.css";
import "../PostNewSong/PostNewSong.css";

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
  const { closeModal } = useModal();
  const [title, setTitle] = useState(song.title);
  const [genre, setGenre] = useState(song.genre);
  const [songURL, setSongURL] = useState(song.songURL);
  const [description, setDescription] = useState(song.description);
  const [privated, setPrivated] = useState(song.private);
  const [caption, setCaption] = useState(song.caption);
  const [thumbnail, setThumbnail] = useState(song.thumbnail);
  const [songUpload, setSongUpload] = useState("");
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

    const errObj = {};

    if (Object.values(errObj).length > 0) return setErrors(errObj);

    console.log("title", title);
    console.log("genre", genre);
    console.log("description", description);
    console.log("private", privated);
    console.log("caption", caption);
    console.log("thumbnail", thumbnail);
    console.log("song", songUpload);
    console.log("song_url", songURL);

    const formData2 = new FormData();
    formData2.append("title", title);
    formData2.append("genre", genre);
    formData2.append("description", description);
    formData2.append("private", privated);
    formData2.append("caption", caption);
    formData2.append("thumbnail", thumbnail);
    formData2.append("song", songUpload);
    formData2.append("song_url", songURL);
    console.log("formdata after appending", formData2.entries());

    let res = await dispatch(thunkEditSongById(song.id, formData2));

    console.log("this is res after edit song dispatch", res);

    if (!res.errors) {
      setSongLoading(true);
      // await dispatch(thunkGetSongById(res.id)); // remove this unless you have rendering issues after creating a new song
      closeModal();
    }
  };

  const downloadLinkRef = useRef(null);

  const handleDownloadClick = () => {
    downloadLinkRef.current.click();
  };
  return (
    <div id="edit__main-container">
      <div id="edit-wrapper">
        {/* flex row */}
        <div className="edit-files__container">
          <div className="download-file">
            <a href={song.songURL} download={"testdownload.mp3"}>
              Download File
            </a>
          </div>
          {/* TEST */}
          <div className="download-file">
            <a href={song.songURL} target="_blank" rel="noopener noreferrer" download="testdownload.mp3">
              TESTTEST
            </a>
          </div>
          {/* END TEST */}
          <div>
            <label className="upload-new" for="upload-new-file">
              <input
                type="file"
                accept="audio/*"
                onChange={(e) => setSongUpload(e.target.files[0])}
                // onChange={handleClick}
                className="orange-btn-white-txt cursor-pointer"
                style={{ display: "none" }}
                id="upload-new-file"
              />
              Replace file
            </label>
          </div>
        </div>
        <div className="edit-tabs">
          <span>Basic Info</span>
          <span>Metadata</span>
          <span>Permissions</span>
          <span>Advanced</span>
          <span>NEW</span>
        </div>
        <div className="edit-song-and-form__container">
          <div className="edit-song-img">
            <img
              src="https://images.all-free-download.com/images/graphiclarge/testing_with_magnifier_185604.jpg"
              alt="preview image here"
            ></img>
          </div>
          <div>
            <form className="edit-song__form" onSubmit={onSubmit} encType="multipart/form-data">
              {inputs.map((el, index) =>
                el.name === "description" ? (
                  <div key={el.name}>
                    <div>{el.name}</div>
                    <textarea
                      id={`textarea-${el.name}`}
                      rows="10"
                      value={el.value}
                      onChange={(e) => el.onChange(e.target.value)}
                    >
                      {el.value}
                    </textarea>
                  </div>
                ) : (
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
                )
              )}
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
                <button className="white-btn-black-txt" onClick={() => closeModal()}>
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
