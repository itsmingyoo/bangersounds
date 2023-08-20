import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import SearchBar from "./SearchBar";
import MySocialSecurity from "./MySocialSecurity";
import bangerSoundsLogo from "../../images/bangersounds-logo-new.ico";
import notifications from "../../images/bell.ico";
import messages from "../../images/email.ico";
import { IoEllipsisHorizontalSharp } from "react-icons/io5";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  const navNames = [
    { name: "Home", to: "/discover" },
    { name: "Feed", to: "#" },
    { name: "Library", to: "#" },
  ];

  const navNames2 = [
    { name: "For Artists", to: "#", className: "" },
    { name: "Upload", to: "/upload", className: "" },
  ];
  return (
    <div id="main-nav__container">
      <div id="nav-element__container">
        <div className="nav-bar__element white-hover">
          <NavLink to="/">
            <img src={bangerSoundsLogo} />
          </NavLink>
        </div>

        {navNames.map((nav) => {
          if (nav.name === "Home") {
            return (
              <>
                <div
                  className="nav-bar__element"
                  key={`navMapEl-${navNames.indexOf(nav)}`} // key has to be unique, else RED ERRORRRS
                >
                  <NavLink to={nav.to} key={nav.name}>
                    {nav.name}
                  </NavLink>
                </div>
              </>
            );
          } else {
            return (
              <>
                <div
                  className="nav-bar__element"
                  key={`navMapEl-${navNames.indexOf(nav)}`} // key has to be unique, else RED ERRORRRS
                  onClick={() => alert("Feature coming soon!")}
                >
                  <NavLink to={nav.to} key={nav.name}>
                    {nav.name}
                  </NavLink>
                </div>
              </>
            );
          }
        })}
        <SearchBar />
        <MySocialSecurity />
        {navNames2.map((nav) => {
          if (nav.name !== "Upload") {
            return (
              <div
                className={`nav-bar__element`}
                key={`navMap-${nav.name}`} // key has to be unique, else RED ERRORRRS
                onClick={() => alert("Feature coming soon!")}
              >
                <NavLink to={nav.to} className={`${nav.className}`} key={`navLink-${nav.className}-chick`}>
                  {nav.name}
                </NavLink>
              </div>
            );
          } else {
            return (
              <div
                className={`nav-bar__element`}
                key={`navMap-${nav.name}`} // key has to be unique, else RED ERRORRRS
              >
                <NavLink to={nav.to} className={`${nav.className}`} key={`navLink-${nav.className}-chick`}>
                  {nav.name}
                </NavLink>
              </div>
            );
          }
        })}
        <div id="user-nav">
          {isLoaded && <ProfileButton user={sessionUser} />}

          <div className="nav-bar__element" onClick={() => alert("Feature coming soon!")}>
            <NavLink to="#">
              <img src={notifications} alt="Alerts" style={{ width: "60%", height: "60%", filter: "invert(100%)" }} />
            </NavLink>
          </div>

          <div className="nav-bar__element" onClick={() => alert("Feature coming soon!")}>
            <NavLink to="#">
              <img src={messages} alt="Messages" style={{ width: "60%", height: "60%", filter: "invert(100%)" }} />
            </NavLink>
          </div>
        </div>
        <div className="nav-bar__element" onClick={() => alert("Feature coming soon!")}>
          <NavLink to="/">
            <IoEllipsisHorizontalSharp style={{ color: "white" }} />
          </NavLink>
        </div>
      </div>
    </div>
    // old code before mapping
    /* <div className="nav-bar__element">
        <NavLink exact to="/discover">
          Home 'Discover'
        </NavLink>
      </div>
      <div className="nav-bar__element">
        <NavLink to="/">Feed</NavLink>
      </div>
      <div className="nav-bar__element">
        <NavLink to="/">Library</NavLink>
      </div>
      <div>Search Bar Here</div>
      <div className="nav-bar__element">
        <NavLink to="/">Try Go+</NavLink>
      </div>
      <div className="nav-bar__element">
        <NavLink to="/">Try Next Pro</NavLink>
      </div>
      <div className="nav-bar__element">
        <NavLink to="/">For Artists</NavLink>
      </div>
      <div className="nav-bar__element">
        <NavLink to="/">Upload</NavLink>
      </div>
      */
  );
}

export default Navigation;
