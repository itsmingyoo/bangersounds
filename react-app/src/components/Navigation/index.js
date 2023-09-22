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
    { name: "Library", to: "/you/library" },
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

        {navNames.map((nav, index) => {
          if (nav.name !== "Feed") {
            return (
              <div
                className="nav-bar__element"
                key={`nav-${nav.name}-${index}`} // Unique key
              >
                <NavLink to={nav.to}>{nav.name}</NavLink>
              </div>
            );
          } else {
            return (
              <div
                className="nav-bar__element"
                key={`nav-${nav.name}-${index}`} // Unique key
                onClick={() => alert("Feature coming soon!")}
              >
                <NavLink to={nav.to}>{nav.name}</NavLink>
              </div>
            );
          }
        })}
        <SearchBar />
        <MySocialSecurity />
        {navNames2.map((nav, index) => {
          if (nav.name !== "Upload") {
            return (
              <div
                className={`nav-bar__element`}
                key={`nav2-${nav.name}-${index}`} // Unique key
                onClick={() => alert("Feature coming soon!")}
              >
                <NavLink to={nav.to} className={`${nav.className}`}>
                  {nav.name}
                </NavLink>
              </div>
            );
          } else {
            return (
              <div
                className={`nav-bar__element`}
                key={`nav2-${nav.name}-${index}`} // Unique key
              >
                <NavLink to={nav.to} className={`${nav.className}`}>
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
  );
}

export default Navigation;
