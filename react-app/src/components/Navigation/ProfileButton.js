import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import "./Navigation.css";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    // if (showMenu) return;

    // Set this to toggle instead of a return if true
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenuOnClickOutside = (e) => {
      // add a null check since we're getting an error here with our new modified code to implement signup - login modal buttons separate from the profile button
      if (!ulRef.current || !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenuOnClickOutside);

    return () => document.removeEventListener("click", closeMenuOnClickOutside);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  const ulClassName = showMenu ? "" : " hidden";
  const closeMenu = () => setShowMenu(false);

  return (
    <div className="profile-dropdown">
      {user ? (
        <>
          <button onClick={openMenu} className="dropdown-button" style={{ backgroundColor: showMenu ? "black" : "" }}>
            <i className="fas fa-user-circle" style={{ color: showMenu ? "white" : "" }} />
          </button>
          <div className={`${ulClassName} dropdown-list`} ref={ulRef}>
            <ul className="dropdown-nav">
              {/* Display user information here */}
              <li>{user.username}</li>
              <li>{user.email}</li>
              <li>
                <NavLink to="/profile">Profile</NavLink>
              </li>
              <li>
                <NavLink to="/likes">Likes</NavLink>
              </li>
              <li>
                <NavLink to="/playlists">Playlists</NavLink>
              </li>
              <li>
                <NavLink to="/follows">Follows</NavLink>
              </li>
              <li>
                <NavLink to="/tracks">Tracks</NavLink>
              </li>
              <li>
                <button onClick={handleLogout}>Log Out</button>
              </li>
            </ul>
          </div>
        </>
      ) : (
        <div>
          <OpenModalButton buttonText="Sign In" onItemClick={closeMenu} modalComponent={<LoginFormModal />} />
          <OpenModalButton
            buttonText="Create an account"
            onItemClick={closeMenu}
            modalComponent={<SignupFormModal />}
          />
        </div>
      )}
    </div>
  );
}

export default ProfileButton;
