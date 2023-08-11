import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
// import { Helmet } from "react-helmet";
import "./DropDown.css";
import DeleteSongModal from "../DeleteSongModal";

function DropDown({ iconClassName, list, songId, isUserSong, user }) {
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  console.log("user in the dropdown comp", user);

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
  console.log(iconClassName);
  let isClassName = false;
  // if (iconClassName.includes("fa")) {
  //   isClassName = true;
  // } else {
  //   isClassName = false;
  // }
  // console.log(isClassName);
  // console.log("this is iconclassname", iconClassName);

  // let ill = iconClassName.split("/")[3].split(".");
  // ill.splice(1, 1);
  // ill = ill.join(".");
  // console.log(ill);

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
            {/* <img src={iconClassName} /> */}
            {/* <img src={`/${ill}`} alt="this kaefkljl" /> */}
            {/* <img
              src={window.location.origin + "../../images/AddToQueue.png"}
              alt="test"
            /> */}
          </div>
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
