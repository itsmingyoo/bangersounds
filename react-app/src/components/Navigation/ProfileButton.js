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
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenuOnClickOutside = (e) => {
      if (!ulRef.current.contains(e.target)) {
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
      <button
        onClick={openMenu}
        className="dropdown-button"
        style={{ "background-color": showMenu ? "black" : "" }}
      >
        <i
          className="fas fa-user-circle"
          style={{ color: showMenu ? "white" : "" }}
        />
      </button>
      <div className={`${ulClassName} dropdown-list`} ref={ulRef}>
        <ul className="dropdown-nav">
          {user ? (
            <>
              {/* <li>{user.username}</li> */}
              {/* <li>{user.email}</li> */}
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
            </>
          ) : (
            <>
              <OpenModalButton
                buttonText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />

              <OpenModalButton
                buttonText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

export default ProfileButton;
