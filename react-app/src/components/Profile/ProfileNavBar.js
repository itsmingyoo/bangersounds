import React from "react";
import { useModal } from "../../context/Modal";
import EditProfileModal from "./EditProfileModal";
import "./Profile.css";

const ProfileNavBar = ({
  userRef,
  userSongs,
  isPlayingState,
  currentlyPlaying,
  comments,
  songs,
  togglePlayPause,
  active,
  setActive,
}) => {
  const { closeModal, setModalContent } = useModal();
  // states for each div if clicked to render their specific page on the same page
  const handleActiveClick = (index) => {
    setActive(index);
  };

  return (
    <div className="profile-navbar__main">
      <div className="profile-navbar__container">
        <div className="profile-navbar__left">
          <div
            className={`profile-navbar__item ${active === 0 ? "profile-navbar__item-active" : ""}`}
            onClick={() => {
              handleActiveClick(0);
            }}
          >
            All
          </div>
          <div
            className={`profile-navbar__item ${active === 1 ? "profile-navbar__item-active" : ""}`}
            onClick={() => {
              // handleActiveClick(1);
              alert("Feature coming soon!");
            }}
          >
            Popular Songs
          </div>
          <div
            className={`profile-navbar__item ${active === 2 ? "profile-navbar__item-active" : ""}`}
            onClick={() => {
              handleActiveClick(2);
            }}
          >
            Songs
          </div>
          <div
            className={`profile-navbar__item ${active === 3 ? "profile-navbar__item-active" : ""}`}
            onClick={() => {
              // handleActiveClick(3);
              alert("Feature coming soon!");
            }}
          >
            Albums
          </div>
          <div
            className={`profile-navbar__item ${active === 4 ? "profile-navbar__item-active" : ""}`}
            onClick={() => {
              handleActiveClick(4);
              alert("Feature coming soon!");
            }}
          >
            Playlists
          </div>
          <div
            className={`profile-navbar__item ${active === 5 ? "profile-navbar__item-active" : ""}`}
            onClick={() => {
              handleActiveClick(5);
              // alert("Feature coming soon!");
            }}
          >
            Reposts
          </div>
        </div>
        <div className="profile-navbar__right">
          <button onClick={() => alert("Feature coming soon!")}>Your Insights</button>
          <button onClick={() => alert("Feature coming soon!")}>Station</button>
          <button onClick={() => alert("Feature coming soon!")}>Share</button>
          <button onClick={() => setModalContent(<EditProfileModal userRef={userRef} closeModal={closeModal} />)}>
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileNavBar;
