import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { thunkGetSongById, thunkPostNewSong } from "../../store/songs";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import "./PostNewSong.css";

function UploadNavBar() {
  return (
    <div id="new-song__upload-space">
      <div>
        <div>1% of free uploads used</div>
        <div>2 of 180 minutes (1%) used</div>
        <div>
          <NavLink to="#">Try Next Pro</NavLink> to get unlimited uploads.
        </div>
      </div>
      <div>
        <button className="orange-btn-outline-txt">Try Next Pro</button>
      </div>
    </div>
  );
}

export default UploadNavBar;
