import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./DeleteSongModal.css";
import { thunkDeleteUserSong } from "../../store/songs";

function DeleteSongModal({ songId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(thunkDeleteUserSong(songId));
  };

  return (
    <>
      {/* TOP */}
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
      {/* BOTTOM */}
      <div id="delete-modal__bot">
        {/*  */}
        {/*  */}
        {/*  */}
        {/* LEFT */}
        <div id="delete-modal__bot-left">
          {/* SLIGHTLY LARGER FONT THAN THE P TAGS */}
          <div>Permanently delete this track?</div>
          <p>
            Removing this track is irreversible. You will lose all the plays,
            likes and comments for this track with no way to get them back.
          </p>
          {/* BUTTONS NO BG - COLOR BLK - NO BORDER */}
          <button>Cancel</button>
          <button>Delete forever</button>
        </div>
        {/*  */}
        {/*  */}
        {/*  */}
        {/* RIGHT */}
        <div id="delete-modal__bot-right">
          <p>
            Never have to delete a track again. Unlock limitless upload time and
            the ability to replace tracks with a Pro plan.
          </p>
          {/* ORANGE BUTTON WHITE TEXT */}
          <button>Learn More</button>
        </div>
      </div>
    </>
  );
}

export default DeleteSongModal;
