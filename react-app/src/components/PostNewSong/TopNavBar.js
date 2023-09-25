import React from "react";
import { NavLink } from "react-router-dom";
import bangerSoundsLogo from "../../images/bangersounds-logo-new.ico";
import "./PostNewSong.css";

function TopNavBar() {
  const list = [
    { name: "Upload", to: "/upload" },
    { name: "Mastering", to: "#" },
    { name: "Your Tracks", to: "/you/library" },
    { name: "Insights", to: "#" },
    { name: "Artist Plans", to: "#" },
  ];
  return (
    <div id="nav-bar__container">
      <ul className="nav-bar__ul">
        {list.map((n) => (
          <li key={`navPost-${list.indexOf(n)}`} className="nav-bar__lists">
            <NavLink
              to={n.to}
              onClick={() => {
                if (n.to === "#") {
                  alert("Feature coming soon!");
                }
              }}
            >
              {n.name}
            </NavLink>
          </li>
        ))}
      </ul>
      <div className="nav-bar__bangersounds-link">
        <NavLink to="#">
          <img src={bangerSoundsLogo} />
          BangerSounds for Artists
        </NavLink>
      </div>
    </div>
  );
}

export default TopNavBar;
