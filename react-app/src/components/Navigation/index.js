import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <div id="main-nav__container">
      {isLoaded && (
        <div>
          <ProfileButton user={sessionUser} />
        </div>
      )}
      <div className="nav-bar__element">
        <NavLink to="/">BangerSounds(Icon)</NavLink>
      </div>
      <div className="nav-bar__element">
        {/* Home button actually leads to discover on the real soundcloud */}
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
      <div className="nav-bar__element">
        <NavLink to="/">Profile PFP Dropdown Menu</NavLink>
      </div>
      <div className="nav-bar__element">
        <NavLink to="/">Alerts (bell icon)</NavLink>
      </div>
      <div className="nav-bar__element">
        <NavLink to="/">Messages (mail icon)</NavLink>
      </div>
      <div className="nav-bar__element">
        <NavLink to="/">Options (3 dots icon)</NavLink>
      </div>
    </div>
  );
}

export default Navigation;
