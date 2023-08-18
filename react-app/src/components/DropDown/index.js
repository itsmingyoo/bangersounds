import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
// import { Helmet } from "react-helmet";
import DeleteSongModal from "../DeleteSongModal";
import { IoEllipsisHorizontalSharp } from "react-icons/io5";

import "./DropDown.css";

function DropDown({ iconClassName, list, songId, isUserSong, user, isClassName, icon1, icon2 }) {
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  // Change state of showMenu to True or False
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  // Function to close menu when clicking outside the menu
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

  // ul element class name listens to the showMenu state
  const ulClassName = showMenu ? "" : " hidden";

  // function to close menu by changing state to false
  const closeMenu = () => setShowMenu(false);

  return (
    <div className="dropdown">
      {/* <button onClick={openMenu} style={{ backgroundColor: showMenu ? "black" : "" }}> */}
      <button onClick={openMenu} style={{ height: "100%", width: "100%" }}>
        <IoEllipsisHorizontalSharp />
        More
        {iconClassName ? (
          isClassName ? (
            <i className={iconClassName} style={{ color: showMenu ? "white" : "" }} />
          ) : (
            <div>
              <img src={iconClassName} alt={`this is ${iconClassName}`} />
            </div>
          )
        ) : null}
        {/* {iconClassName ? (isClassName ? (
          <i className={iconClassName} style={{ color: showMenu ? "white" : "" }} />
        ) : (
          <div>
            <img src={iconClassName} alt={`this is ${iconClassName}`} />
          </div>
        ))} */}
      </button>
      <div className={`${ulClassName} dropdown-list`} ref={ulRef}>
        <ul className="dropdown-nav">
          {list?.map((item) => (
            <li key={item.name}>
              <NavLink to={item.to}>{item.name}</NavLink>
            </li>
          ))}
          {/* insert MODAL here */}
          {/* {isUserSong && <li onClick={handleDelete}>Delete</li>} */}
          {isUserSong && (
            <OpenModalButton
              buttonText="Delete"
              onItemClick={closeMenu}
              modalComponent={<DeleteSongModal songId={songId} user={user} />}
            />
          )}
        </ul>
      </div>
    </div>
  );
}

export default DropDown;
