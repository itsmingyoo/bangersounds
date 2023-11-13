import React, { useState } from "react";
import {
  IoHeartSharp,
  IoShareOutline,
  IoLinkSharp,
  IoEllipsisHorizontalSharp,
  IoPlayBackSharp,
  IoPlaySharp,
} from "react-icons/io5";
import DropDown from "../DropDown";
import OpenModalButton from "../OpenModalButton";
import EditSong from "./EditSongModal";
import addToQueue from "../../images/AddToQueue.ico";
import playNext from "../../images/PlayNext.ico";
import repost from "../../images/repost.png";
import { BiRepost } from "react-icons/bi";
import LikeButton from "../LikeButton";
import RepostButton from "../RepostButton";
import { downloadFile } from "../../util/downloadFile";
import { copyTextToClipboard } from "../../util/copyClipboard";
const SongStats = ({
  song,
  songs,
  isPlayingState,
  currentlyPlaying,
  togglePlayPause,
  comments,
  songId,
  isUserSong,
  user,
}) => {
  const [isCopied, setIsCopied] = useState(false);
  const list = [
    { name: "Add to Next Up", to: "#" },
    { name: "Add to Playlist", to: "#" },
    { name: "Station", to: "#" },
    { name: "Report", to: "#" },
  ];
  const isLiked = Object.keys(song.likes).includes(user?.id.toString());
  const isRepost = Object.keys(song.reposts).includes(user?.id.toString());

  return (
    <div id="song-details__nav-bar">
      <div id="song-details__nav-bar-buttons">
        <LikeButton user={user} song={song} isLiked={isLiked} />

        <RepostButton user={user} song={song} isRepost={isRepost} />

        <button
          className="btn-container"
          onClick={() => alert("Feature coming soon!")}
        >
          <IoShareOutline />
          Share
        </button>

        <button
          onClick={() =>
            copyTextToClipboard(
              `https://bangersounds.onrender.com/songs/${song.id}`,
              setIsCopied
            )
          }
        >
          <IoLinkSharp />
          {isCopied ? "Copied!" : "Copy Link"}
        </button>

        {/* Modal Button Popup to Edit Song */}
        {user && song?.artistId === user?.id && (
          <OpenModalButton
            buttonText="Edit"
            modalComponent={
              <EditSong
                {...{
                  song,
                  songs,
                  isPlayingState,
                  currentlyPlaying,
                  togglePlayPause,
                  comments,
                  songId,
                  isUserSong,
                  user,
                }}
              />
            }
          />
        )}

        <DropDown
          list={list}
          songId={songId}
          isUserSong={isUserSong}
          user={user}
          isClassName={false}
          icon1={addToQueue}
          icon2={playNext}
        />
        <a
          href={song.songURL}
          onClick={(e) => {
            e.preventDefault();
            downloadFile(song.songURL, song.title);
          }}
          style={{
            textDecoration: "none",
            color: "black",
            border: "1px solid black",
            borderRadius: "4px",
            fontSize: "14px",
            padding: "1px 6px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Download
        </a>
      </div>
      <div id="song-details__stats">
        <span>
          1 <IoPlaySharp />
        </span>
        <span>
          <IoHeartSharp />
          {Object.values(song.likes).length}
        </span>
        <span>
          <BiRepost />
          {Object.values(song.reposts).length}
        </span>
      </div>
    </div>
  );
};
export default SongStats;
