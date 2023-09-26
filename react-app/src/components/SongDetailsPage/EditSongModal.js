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
    if (title === "") errObj.title = "Title is required";
    if (description === "") errObj.description = "Description is required";

    if (title.length > 100) errObj.title = "Title can be up to 100 characters";
    if (description.length > 4000) errObj.description = "Description can be up to 4000 characters";
    if (caption.length > 140) errObj.caption = "Caption can be up to 140 characters";
    if (thumbnail.length > 255) errObj.thumbnail = "Thumbnail can be up to 255 characters";
    if (Object.values(errObj).length > 0) return setErrors(errObj);

    const formData2 = new FormData();
    formData2.append("title", title);
    formData2.append("genre", genre);
    formData2.append("description", description);
    formData2.append("private", privated);
    formData2.append("caption", caption);
    formData2.append("thumbnail", thumbnail);
    formData2.append("song", songUpload);
    formData2.append("song_url", songURL);

    let res = await dispatch(thunkEditSongById(song.id, formData2));

    if (!res.errors) {
      setSongLoading(true);
      // await dispatch(thunkGetSongById(res.id)); // remove this unless you have rendering issues after creating a new song
      closeModal();
    }
  };

  // BREAKDOWN OF THIS FUNCTION SINCE 'download' attribute of <a> tag does not work as intended
  // pass in url, and file name

  const downloadFile = async (fileUrl, fileName) => {
    try {
      // fetch the url
      const response = await fetch(fileUrl);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // BLOB SYNTAX: const blob = new Blob([content], {type: "application/json",});
      // convert response to a blob object that can contain media files, and other types like binary data(tldr on mdn)
      const blob = await response.blob();

      // URL object provides a method createObjectURL and it takes a blob or file object to return a unique url (obj URL) to represent the blob 'content'
      // TLDR: blobUrl is the 'content' parameter in the blob syntax
      const blobUrl = URL.createObjectURL(blob);

      // simulate a "click" event by "creating" a new anchor tag (which is fake or just imagine its not there, its here for functionality of opening up the download window)
      const link = document.createElement("a");
      // set href of the anchor tag
      link.href = blobUrl;
      // sets the download name for the anchor tag
      link.download = fileName;
      // invokes a click on the anchor tag
      link.click();

      // Clean up the Blob URL by releasing the resources associated with the blobUrl (blob content) - why? they are temporary urls and may cause memory leaks if not released
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  return (
    <div id="edit__main-container">
      <div id="edit-wrapper">
        {/* flex row */}

        <div className="edit-song-and-form__container">
          <div className="edit-song-img">
            <img src={song.thumbnail} alt="preview image here"></img>
          </div>
          <div className="edit-files__container">
            <div className="download-file">
              <a
                href={song.songURL}
                onClick={(e) => {
                  e.preventDefault();
                  downloadFile(song.songURL, song.title);
                }}
              >
                Download
              </a>
              <a href="" download="sample.jpg" />
            </div>
            <div>
              <label className="upload-new" for="upload-new-file">
                <input
                  type="file"
                  accept="audio/*"
                  onChange={(e) => setSongUpload(e.target.files[0])}
                  // onChange={handleClick}
                  className="cursor-pointer"
                  style={{ display: "none" }}
                  id="upload-new-file"
                />
                Replace file
              </label>
            </div>
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
                <button id="edit-save-btn" className="orange-btn-white-txt">
                  Save
                </button>
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
