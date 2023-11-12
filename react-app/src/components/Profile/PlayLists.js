import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import SongDisplay from "../SongDisplay";
// import { setPlayingState, playUserSongAction } from "../../store/songs";
import { copyTextToClipboard } from "../../util/copyClipboard";
import { downloadFile } from "../../util/downloadFile";
import { togglePlayPause } from "../../util/togglePlay";
import {
  IoPlaySharp,
  IoPauseSharp,
  IoEllipsisHorizontalSharp,
  IoHeartSharp,
  IoShareOutline,
  IoLinkSharp,
} from "react-icons/io5";
import { BiRepost } from "react-icons/bi";
import "./Playlists.css";

const Playlists = () => {
  const dispatch = useDispatch();
  const user = useSelector((s) => s.session.user);
  const playlists = useSelector((s) => Object.values(s.playlists));
  const songs = useSelector((s) => s.songs.Songs);
  const currentlyPlaying = useSelector((s) => s.songs.CurrentlyPlaying);
  const isPlayingState = useSelector((s) => s.songs.isPlaying);
  const [isCopied, setIsCopied] = useState(false);

  console.log("user", user);
  console.log("playlists", playlists);

  const userPlaylists = [];
  playlists?.forEach((p) => {
    if (p.createdBy === user.id) {
      userPlaylists.push(p);
    }
  });

  console.log("user playlists", userPlaylists);

  return (
    <>
      <div>WIP</div>
      {userPlaylists.map((playlist) => (
        <div id="playlist-container">
          <div key={playlist.id} id="playlist">
            {/* Image */}
            <div id="playlist-thumbnail-container">
              <a>
                <img
                  id="playlist-thumbnail"
                  src={playlist.thumbnail}
                  alt={playlist.thumbnail}
                />
              </a>
            </div>

            {/* Play Button - Top Left of Waveform */}
            <div id="playlist-info">
              <div id="playlist-play">
                <button
                  onClick={() =>
                    togglePlayPause(dispatch, currentlyPlaying, isPlayingState)
                  }
                  id="playlist-play-button"
                >
                  <div>
                    {currentlyPlaying && isPlayingState ? (
                      <IoPauseSharp id="playlist-play-button" />
                    ) : (
                      <IoPlaySharp id="playlist-play-button" />
                    )}
                  </div>
                </button>
                <div>
                  <div id="playlist-creator">Playlist Creator</div>
                  <div id="playlist-title">Playlist Title</div>
                </div>
              </div>

              {/* Playlist-Songs */}
              {playlist.songs.map((songId, index) => {
                const song = songs[songId];
                console.log("this is mapped index of song", index);
                console.log("this is mapped song", song);

                // You can render song information here if needed
                return (
                  <div
                    id="playlist-songs-container"
                    onClick={() =>
                      togglePlayPause(
                        dispatch,
                        currentlyPlaying,
                        isPlayingState
                      )
                    }
                  >
                    <div key={song.id} id="playlist-song-title">
                      <div id="playlist-song-thumbnail">
                        <img
                          id="playlist-song-thumbnail"
                          src={song.thumbnail}
                          alt="playlist-song-thumbnail"
                        />
                      </div>
                      <div>
                        {index + Number(1)}
                        {song.title}
                      </div>
                      <div>Play: Count</div>
                    </div>
                  </div>
                );
              })}
              <div>
                <IoHeartSharp />
                <BiRepost />
                <IoShareOutline />
                <IoLinkSharp />
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Playlists;
