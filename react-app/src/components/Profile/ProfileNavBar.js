import React from "react";
import Reposts from "./Reposts";
import All from "./All";

const ProfileNavBar = () => {
  // states for each div if clicked to render their specific page on the same page
  return (
    <div>
      <div>
        <div>profile nav bar</div>
        <div>All</div>
        <div>Popular Songs</div>
        <div>Songs</div>
        <div>Albums</div>
        <div>Playlists</div>
        <div>Reposts</div>
      </div>
      <div>
        if conditionals to render...
        <Reposts />
        <All />
      </div>
    </div>
  );
};

export default ProfileNavBar;
