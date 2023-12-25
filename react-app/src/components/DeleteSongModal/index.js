import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import "./DeleteSongModal.css";
import { useHistory } from "react-router-dom";
import { thunkDeleteUserSong } from "../../store/songs";
import ProfilePicture from "../SongDetailsPage/ProfilePicture";

// forgot why i passed in user props... feature coming soon
function DeleteSongModal({ songId, user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();
  // const user = useSelector((s) => s.session.user);
  // const userRef = useRef(user);
  // useEffect(() => {
  //   userRef.current = user;
  // });

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
      <div id="delete-modal__bot">
        <div id="delete-modal__bot-left">
          <div>Permanently delete this track?</div>
          <p>
            Removing this track is irreversible. You will lose all the plays,
            likes and comments for this track with no way to get them back.
          </p>
          <div id="delete-modal__bot-left-buttons">
            <button onClick={() => closeModal()}>Cancel</button>
            <button onClick={handleClick}>Delete forever</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteSongModal;
