import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import SearchBar from "./SearchBar";
import MySocialSecurity from "./MySocialSecurity";
import bangerSoundsLogo from "../../images/bangersounds-logo.ico";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  const navNames = [
    { name: "Home", to: "/" },
    { name: "Feed", to: "/feed" },
    { name: "Library", to: "/library" },
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

        {navNames.map((nav) => (
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
        ))}

        <SearchBar />
        <MySocialSecurity />
        {navNames2.map((nav) => (
          <div
            className={`nav-bar__element`}
            key={`navMap-${nav.name}`} // key has to be unique, else RED ERRORRRS
          >
            <NavLink to={nav.to} className={`${nav.className}`} key={`navLink-${nav.className}-chick`}>
              {nav.name}
            </NavLink>
          </div>
        ))}
        <div id="user-nav">
          {isLoaded && <ProfileButton user={sessionUser} />}

          <div className="nav-bar__element">
            <NavLink to="/">Alerts (bell icon)</NavLink>
          </div>

          <div className="nav-bar__element">
            <NavLink to="/">Messages (mail icon)</NavLink>
          </div>
        </div>

        <div className="nav-bar__element">
          <NavLink to="/">Options (3 dots icon)</NavLink>
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
