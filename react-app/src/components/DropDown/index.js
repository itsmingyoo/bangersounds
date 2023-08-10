import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import "./DropDown.css";

function DropDown(iconClassName, list, isUserSong) {
  const dispatch = useDispatch();
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

  // Custom Function onClick Handler
  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  // ul element class name listens to the showMenu state
  const ulClassName = showMenu ? "" : " hidden";

  // function to close menu by changing state to false
  const closeMenu = () => setShowMenu(false);

  return (
    <div className="dropdown">
      <button
        onClick={openMenu}
        style={{ backgroundColor: showMenu ? "black" : "" }}
      >
        <i
          className={iconClassName}
          style={{ color: showMenu ? "white" : "" }}
        />
      </button>
      <div className={`${ulClassName} dropdown-list`} ref={ulRef}>
        <ul className="dropdown-nav">
          {list.map((item) => (
            <li>
              <NavLink to={item.to}>{item.name}</NavLink>
            </li>
          ))}
          {isUserSong && <li onClick={handleDelete}>Delete</li>}
        </ul>
      </div>
    </div>
  );
}

export default DropDown;
