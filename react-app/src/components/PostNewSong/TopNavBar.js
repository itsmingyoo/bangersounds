import React from "react";
import { NavLink } from "react-router-dom";
import "./PostNewSong.css";

function TopNavBar() {
  const list = [
    { name: "Upload", to: "/new" },
    { name: "Mastering", to: "#" },
    { name: "Your Tracks", to: "/you/tracks" },
    { name: "Insights", to: "#" },
    { name: "Artist Plans", to: "#" },
  ];
  return (
    <div id="nav-bar__container">
      <ul className="nav-bar__ul">
        {list.map((n) => (
          <li key={`navPost-${list.indexOf(n)}`} className="nav-bar__lists">
            <NavLink to={n.to}>{n.name}</NavLink>
          </li>
        ))}
      </ul>
      <div className="nav-bar__bangersounds-link">
        <NavLink to="#">(ICON) BangerSounds for Artists</NavLink>
      </div>
    </div>
  );
}

export default TopNavBar;
