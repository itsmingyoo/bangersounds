import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import SongDisplay from "../SongDisplay";
import "./Playlists.css";

const Playlists = () => {
  const dispatch = useDispatch();
  const user = useSelector((s) => s.session.user);
  const playlists = useSelector((s) => Object.values(s.playlists));
  const songs = useSelector((s) => s.songs.Songs);
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

  return (
    <>
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

            {/* Songs */}
            <div id="playlist-info">
              <div id="playlist-play">
                <button>Play</button>
                <div>
                  <div id="playlist-creator">Playlist Creator</div>
                  <div id="playlist-title">Playlist Title</div>
                </div>
              </div>
              {/* <div>
                <img src="#" alt="waveform" />
              </div> */}
              {playlist.songs.map((songId, index) => {
                const song = songs[songId];
                console.log("this is mapped index of song", index);
                console.log("this is mapped song", song);

                // You can render song information here if needed
                return (
                  <>
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
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Playlists;
