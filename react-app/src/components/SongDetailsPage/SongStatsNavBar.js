import React from "react";
import DropDown from "../DropDown";
import addToQueue from "../../images/AddToQueue.ico";
import playNext from "../../images/PlayNext.ico";
import repost from "../../images/repost.png";
import { IoHeartSharp, IoShareOutline, IoLinkSharp, IoEllipsisHorizontalSharp } from "react-icons/io5";

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
        <button className="btn-container">
          <IoHeartSharp />
          Like
        </button>
        <button className="btn-container">
          <img src={repost} alt="repost" />
          Repost
        </button>
        <button className="btn-container">
          <IoShareOutline />
          Share
        </button>
        <button>
          <IoLinkSharp />
          Copy Link
        </button>
        {/* Modal Button Popup to Edit Song */}
        {/* {song.artistId === user.id && <button className="song-edit-btn">Edit</button>} */}
        <DropDown
          // iconClassName={IoEllipsisHorizontalSharp}
          list={list}
          songId={songId}
          isUserSong={isUserSong}
          user={user}
          isClassName={false}
          icon1={addToQueue}
          icon2={playNext}
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
