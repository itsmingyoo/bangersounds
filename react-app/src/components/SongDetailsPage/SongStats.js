import React from "react";
import DropDown from "../DropDown";
import addToQueue from "../../images/AddToQueue.ico";

const SongStats = ({ song, songId, isUserSong, user }) => {
  const list = [
    { name: "Add to Next Up", to: "#" },
    { name: "Add to Playlist", to: "#" },
    { name: "Station", to: "#" },
    { name: "Report", to: "#" },
  ];
  return (
    <div id="song-details__nav-bar">
      <div id="song-details__nav-bar-buttons">
        <button>Like</button>
        <button>Reposted</button>
        <button>Share</button>
        <button>Copy Link</button>
        {/* <button>More</button> */}
        <DropDown
          iconClassName={addToQueue}
          list={list}
          songId={songId}
          isUserSong={isUserSong}
          user={user}
          isClassName={false}
        />
        <button>Free Download</button>
      </div>
      <div id="song-details__stats">
        <span>1 Play(s)</span>
        <span>1 Like(s)</span>
        <span>1 Repost(s)</span>
      </div>
    </div>
  );
};
export default SongStats;
