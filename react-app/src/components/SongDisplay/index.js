import React from "react";
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
import EditSong from "../SongDetailsPage/EditSongModal";
import OpenModalButton from "../OpenModalButton";
import DropDown from "../DropDown";
import "./SongDisplay.css";

const SongDisplay = ({ user, userSongs, isPlayingState, currentlyPlaying, togglePlayPause, comments, songs }) => {
  return (
    <div>
      {userSongs?.map((song) => {
        const isUserSong = song.artistId === user.id;
        const list = [
          { name: "Add to Next Up", to: "#" },
          { name: "Add to Playlist", to: "#" },
          { name: "Station", to: "#" },
          { name: "Report", to: "#" },
        ];
        return (
          <div id="song-display-container" key={song.id}>
            <div className="song-display-pfp">
              <ProfilePicture user={user} />
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
                    <div className="song-display__title song-display-title">{song.title}</div>
                  </div>
                </div>
              </div>
              <div className="song-display-waveform">
                <WaveForm />
              </div>
              <div id="song-display-navbar">
                <div id="song-display-btns">
                  <button onClick={() => alert("Feature coming soon!")}>
                    <IoHeartSharp />
                  </button>
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
                <div id="song-display-stats">1 Play 1 Comment</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SongDisplay;
