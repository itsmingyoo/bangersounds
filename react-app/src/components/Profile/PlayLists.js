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
import WaveForm from "../SongDetailsPage/WaveForm";
import "./Playlists.css";

const Playlists = () => {
  const dispatch = useDispatch();
  const user = useSelector((s) => s.session.user);
  const playlists = useSelector((s) => Object.values(s.playlists));
  const songs = useSelector((s) => s.songs.Songs);
  const currentlyPlaying = useSelector((s) => s.songs.CurrentlyPlaying);
  const isPlayingState = useSelector((s) => s.songs.isPlaying);
  const [isCopied, setIsCopied] = useState(false);
  const [song, setSong] = useState(currentlyPlaying);

  // Local state to manage play/pause state for each song
  const [songStates, setSongStates] = useState({});

  const userPlaylists = playlists.filter((p) => p.createdBy === user.id);

  // console.log("song state", song);
  // console.log("currentlyPlaying", currentlyPlaying);
  // console.log("user", user);
  // console.log("playlists", playlists);
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
                  <div>
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
                      <div id='play-button-icons'>
                        {playlistHasCurrentlyPlaying &&
                        currentlyPlaying.id === song.id &&
                        isPlayingState ? (
                          <IoPauseSharp />
                        ) : (
                          <IoPlaySharp />
                        )}
                      </div>
                    </button>
                  </div>
                  <div id="playlist-title">
                    <div id="playlist-creator">{playlist.artistName}</div>
                    <div id="playlist-title">{playlist.title}</div>
                  </div>
                </div>
                <WaveForm style={{}} />

                {/* Playlist-Songs */}
                <div id="playlist-songs-container">
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
                        id="playlist-song-container"
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
                </div>
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
