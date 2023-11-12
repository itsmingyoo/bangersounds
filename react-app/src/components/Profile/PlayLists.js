import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import SongDisplay from "../SongDisplay";
import { setPlayingState, playUserSongAction } from "../../store/songs";
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

  // display a playlist of songs
  // thumbnail on left : list of playlist songs on the navbar__right
  // thumbnail of creator of playlist with play button (imagecontainer from landing page/likes)
  // loop through songs in their playlist
  // how to loop through songs in the playlist

  // 0. grab all playlists -> find playlist created by user -> Object.values(playlists).forEach(p => {if (p.createdBy === user.id) userPlaylists.push(p)})
  // 1. insert one playlist
  // 2. unpack songIds -> object.values -> grab ids with foreach pushing to a new array -> render each song based on song id from store
  // 3. grab creator's thumbnail
  // 4. grab current user's displayname (user who liked it etc)

  const togglePlayPause = async (song) => {
    dispatch(playUserSongAction(song));

    if (currentlyPlaying) {
      if (currentlyPlaying.id === song.id)
        dispatch(setPlayingState(!isPlayingState));
      else dispatch(setPlayingState(true));
    }
  };

  const downloadFile = async (fileUrl, fileName) => {
    try {
      // fetch the url
      const response = await fetch(fileUrl);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // BLOB SYNTAX: const blob = new Blob([content], {type: "application/json",});
      // convert response to a blob object that can contain media files, and other types like binary data(tldr on mdn)
      const blob = await response.blob();

      // URL object provides a method createObjectURL and it takes a blob or file object to return a unique url (obj URL) to represent the blob 'content'
      // TLDR: blobUrl is the 'content' parameter in the blob syntax
      const blobUrl = URL.createObjectURL(blob);

      // simulate a "click" event by "creating" a new anchor tag (which is fake or just imagine its not there, its here for functionality of opening up the download window)
      const link = document.createElement("a");
      // set href of the anchor tag
      link.href = blobUrl;
      // sets the download name for the anchor tag
      link.download = fileName;
      // invokes a click on the anchor tag
      link.click();

      // Clean up the Blob URL by releasing the resources associated with the blobUrl (blob content) - why? they are temporary urls and may cause memory leaks if not released
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  const copyTextToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 2000); // Reset the state after 2 seconds
      })
      .catch((err) => {
        console.error("Failed to copy text:", err);
      });
  };

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
                  onClick={() => togglePlayPause()}
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
                  <div id="playlist-songs-container" onClick={togglePlayPause}>
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
