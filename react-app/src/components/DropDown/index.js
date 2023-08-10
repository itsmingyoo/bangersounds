import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import { thunkDeleteUserSong } from "../../store/songs";
import { Helmet } from "react-helmet";
import "./DropDown.css";

function DropDown({ iconClassName, list, songId, isUserSong }) {
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
    dispatch(thunkDeleteUserSong(songId));
  };

  // ul element class name listens to the showMenu state
  const ulClassName = showMenu ? "" : " hidden";

  // function to close menu by changing state to false
  const closeMenu = () => setShowMenu(false);

  let isClassName;
  if (iconClassName.includes("fa")) {
    isClassName = true;
  } else {
    isClassName = false;
  }
  console.log(isClassName);
  console.log("this is iconclassname", iconClassName);

  let ill = iconClassName.split("/")[3].split(".");
  ill.splice(1, 1);
  ill = ill.join(".");
  console.log(ill);

  return (
    <div className="dropdown">
      <button
        onClick={openMenu}
        style={{ backgroundColor: showMenu ? "black" : "" }}
      >
        More
        {isClassName ? (
          <i
            className={iconClassName}
            style={{ color: showMenu ? "white" : "" }}
          />
        ) : (
          <div>
            <i className={ill} style={{ color: showMenu ? "white" : "" }} />
          </div>
          // <img src={`../../images/${ill}`} alt="alallalalal" />
          // <Helmet>
          //   <link
          //     rel="icon"
          //     type="image/x-icon"
          //     href={`${process.env.PUBLIC_URL}/${ill}`}
          //   />
          // </Helmet>
        )}
      </button>
      <div className={`${ulClassName} dropdown-list`} ref={ulRef}>
        <ul className="dropdown-nav">
          {list?.map((item) => (
            <li key={item.name}>
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
