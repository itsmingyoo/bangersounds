import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
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
import Waveform from "../Waveforms/Waveforms";

const Playlists = () => {
  const dispatch = useDispatch();
  const user = useSelector((s) => s.session.user);
  const playlists = useSelector((s) => Object.values(s.playlists));
  const songs = useSelector((s) => s.songs.Songs);
  const currentlyPlaying = useSelector((s) => s.songs.CurrentlyPlaying);
  const isPlayingState = useSelector((s) => s.songs.isPlaying);
  const [isCopied, setIsCopied] = useState(false);
  const [song, setSong] = useState(currentlyPlaying);
  // console.log("song state", song);
  console.log("currentlyPlaying", currentlyPlaying);

  // Local state to manage play/pause state for each song
  const [songStates, setSongStates] = useState({});

  // console.log("user", user);
  // console.log("playlists", playlists);

  // const userPlaylists = [];
  // playlists?.forEach((p) => {
  //   if (p.createdBy === user.id) {
  //     userPlaylists.push(p);
  //   }
  // });

  // refactored version
  const userPlaylists = playlists.filter((p) => p.createdBy === user.id);

  // console.log("user playlists", userPlaylists[0]["songs"][0]);

  const handleSongClick = (playlistSong, songId, isPlaying) => {
    // Update the song state
    setSong(playlistSong);

    // Toggle play/pause after the state has been updated
    togglePlayPause(playlistSong, dispatch, currentlyPlaying, isPlayingState);

    // Update the songStates
    setSongStates((prevStates) => ({
      ...prevStates,
      [songId]: !isPlaying,
    }));
  };

  return (
    <>
      <div>WIP</div>
      <Waveform audio={currentlyPlaying.songURL} />
      {userPlaylists.map((playlist) => {
        const firstSongId = playlist.songs[0];
        const firstSong = songs[firstSongId];
        const playlistHasCurrentlyPlaying = playlist.songs.includes(
          currentlyPlaying.id
        );
        // console.log("bruhhhhhhhh", playlistHasCurrentlyPlaying);
        return (
          <div id="playlist-container" key={playlist.id}>
            <div id="playlist">
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
                    onClick={() => {
                      setSong(firstSong);
                      togglePlayPause(
                        song,
                        dispatch,
                        currentlyPlaying,
                        isPlayingState
                      );
                    }}
                    id="playlist-play-button"
                  >
                    <div>
                      {playlistHasCurrentlyPlaying &&
                      currentlyPlaying.id === song.id &&
                      isPlayingState ? (
                        <IoPauseSharp id="playlist-play-button" />
                      ) : (
                        <IoPlaySharp id="playlist-play-button" />
                      )}
                    </div>
                  </button>
                  <div>
                    <div id="playlist-creator">{playlist.createdBy}</div>
                    <div id="playlist-title">{playlist.title}</div>
                  </div>
                </div>

                {/* Playlist-Songs */}
                {playlist.songs.map((songId, index) => {
                  const playlistSong = songs[songId];

                  // Get play/pause state for the current song
                  const isPlaying =
                    currentlyPlaying.id === songId && songStates[songId];

                  // console.log(
                  //   "playlistSong && isPlaying",
                  //   playlistSong,
                  //   isPlaying
                  // );

                  return (
                    <div
                      id="playlist-songs-container"
                      onClick={() => {
                        handleSongClick(playlistSong, songId, isPlaying);
                      }}
                      key={playlistSong.id}
                    >
                      <div id="playlist-song-title">
                        <div id="playlist-song-thumbnail">
                          <img
                            id="playlist-song-thumbnail"
                            src={playlistSong.thumbnail}
                            alt="playlist-song-thumbnail"
                          />
                        </div>
                        <div>
                          {index + Number(1)}
                          {playlistSong.title}
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
        );
      })}
    </>
  );
};

export default Playlists;
