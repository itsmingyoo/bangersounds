import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import WaveForm from "../SongDetailsPage/WaveForm";
import ProfilePicture from "../SongDetailsPage/ProfilePicture";
import {
  IoPlaySharp,
  IoPauseSharp,
  IoEllipsisHorizontalSharp,
  IoHeartSharp,
  IoShareOutline,
  IoLinkSharp,
} from "react-icons/io5";
import { FaComment } from "react-icons/fa";
import EditSong from "../SongDetailsPage/EditSongModal";
import OpenModalButton from "../OpenModalButton";
import DropDown from "../DropDown";
import "./SongDisplay.css";
import LikeButton from "../LikeButton";
import RepostButton from "../RepostButton";

const SongDisplay = ({ userSongs, isPlayingState, currentlyPlaying, togglePlayPause, comments, songs }) => {
  const user = useSelector((s) => s.session.user);
  return (
    <div>
      {userSongs?.map((song) => {
        const isUserSong = song.artistId === user.id;
        const isLiked = Object.keys(song.likes).includes(user.id.toString());
        const isRepost = Object.keys(song.reposts).includes(user.id.toString());

        const list = [
          { name: "Add to Next Up", to: "#" },
          { name: "Add to Playlist", to: "#" },
          { name: "Station", to: "#" },
          { name: "Report", to: "#" },
        ];

        return (
          <div id="song-display-container" key={song.id}>
            <div className="song-display-pfp">
              <ProfilePicture user={song.artistInfo} />
            </div>

            <div id="song-display__button-title-container">
              <div id="song-display__button-wrapper">
                <div id="song-display__button-container">
                  <button
                    onClick={() => togglePlayPause(song)}
                    className="orange-btn-white-txt song-display__play-btn-container"
                  >
                    <div className="song-display__play-btn">
                      {currentlyPlaying.id === song.id && isPlayingState ? (
                        <IoPauseSharp className="song-display__play-icon" />
                      ) : (
                        <IoPlaySharp className="song-display__play-icon" />
                      )}
                    </div>
                  </button>
                </div>
                <div id="song-display__content">
                  <div id="song-display__display-name">
                    <div className="song-display__display-name">{song.artistInfo.displayName}</div>
                  </div>
                  <div id="song-display__title-container">
                    <div className="song-display__title song-display-title">
                      <a
                        href={`/songs/${song.id}`}
                        style={{ textDecoration: "none", cursor: "pointer", color: "black" }}
                      >
                        {song.title}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="song-display-waveform">
                <WaveForm />
              </div>
              <div id="song-display-navbar">
                <div id="song-display-btns">
                  {/* <button onClick={() => alert("Feature coming soon!")}>
                    <IoHeartSharp />
                  </button> */}
                  <LikeButton {...{ song, user, isLiked }} />
                  <RepostButton {...{ song, user, isRepost }} />
                  <button onClick={() => alert("Feature coming soon!")}>
                    <IoShareOutline />
                    Share
                  </button>
                  <button onClick={() => alert("Feature coming soon!")}>
                    <IoLinkSharp />
                    Copy Link
                  </button>
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
                            songId: song.id,
                            isUserSong,
                            user,
                          }}
                        />
                      }
                    />
                  )}
                  {user && song?.artistId === user?.id && (
                    <DropDown list={list} songId={song.id} isUserSong={isUserSong} user={user} isClassName={false} />
                  )}
                </div>
                <div id="song-display-stats">
                  <span>
                    <IoPlaySharp /> 1.1m
                  </span>
                  <span>
                    <FaComment />
                    {song.comments.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SongDisplay;
