import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./DeleteSongModal.css";
import { useHistory } from "react-router-dom";
import { thunkDeleteUserSong } from "../../store/songs";

// forgot why i passed in user props... feature coming soon
function DeleteSongModal({ songId, user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();
  // console.log("user in the modal", user);

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch(thunkDeleteUserSong(songId)).then(() => history.push("/profile"));
    closeModal();
  };

  const learnMore = async (e) => {
    e.preventDefault();
    alert("Feature coming soon!");
  };

  return (
    <div id="delete-modal__container">
      {/* TOP TOP TOP TOP TOP TOP TOP TOP TOP TOP TOP TOP TOP TOP */}
      <div id="delete-modal__top">
        <div id="delete-modal__top-left">PROFILE PICTURE</div>
        <div id="delete-modal__top-right">
          INSERT COMPONENT WITH PLAY BUTTON, SONG NAME, ARTIST NAME, DATE, AND
          WAVEFORMS
        </div>
      </div>
      {/*  */}
      {/*  */}
      {/*  */}
      {/* BOTTOM BOTTOM BOTTOM BOTTOM BOTTOM BOTTOM BOTTOM BOTTOM */}
      <div id="delete-modal__bot">
        {/*  */}
        {/*  */}
        {/*  */}
        {/* LEFT LEFT LEFT LEFT LEFT LEFT LEFT LEFT LEFT LEFT LEFT */}
        <div id="delete-modal__bot-left">
          {/* SLIGHTLY LARGER FONT THAN THE P TAGS */}
          <div>Permanently delete this track?</div>
          <p>
            Removing this track is irreversible. You will lose all the plays,
            likes and comments for this track with no way to get them back.
          </p>
          {/* BUTTONS NO BG - COLOR BLK - NO BORDER */}
          <div id="delete-modal__bot-left-buttons">
            <button onClick={() => closeModal()}>Cancel</button>
            <button onClick={handleClick}>Delete forever</button>
          </div>
        </div>
        {/*  */}
        {/*  */}
        {/*  */}
        {/* RIGHT RIGHT RIGHT RIGHT RIGHT RIGHT RIGHT RIGHT RIGHT */}
        <div id="delete-modal__bot-right">
          <p>
            Never have to delete a track again. Unlock limitless upload time and
            the ability to replace tracks with a Pro plan.
          </p>
          {/* ORANGE BUTTON WHITE TEXT */}
          <div id="delete-modal_bot-right-button">
            <button onClick={learnMore}>Learn More</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteSongModal;
