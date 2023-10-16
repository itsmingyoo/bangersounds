import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import SongDisplay from "../SongDisplay";

const Playlists = () => {
  const dispatch = useDispatch();
  const user = useSelector((s) => s.session.user);
  const playlists = useSelector((s) => Object.values(s.playlists));
  const songs = useSelector((s) => s.songs.Songs);
  console.log("u", user);
  console.log("p", playlists);
  const userPlaylists = [];
  playlists?.forEach((p) => {
    if (p.createdBy === user.id) {
      userPlaylists.push(p);
    }
  });
  console.log("uppppp", userPlaylists);
  console.log('hello this is fresh pc')

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
        <div key={playlist.id} id="playlist">
          <div style={{ height: "100%" }}>
            <a style={{ width: "160px", height: "160px" }}>
              <img src={playlist.thumbnail} alt={playlist.thumbnail} style={{ width: "160px", height: "160px" }} />
            </a>
          </div>
          <div id="playlist-info">
            {playlist.songs.map((songId) => {
              const song = songs[songId];
              console.log("this is mapped song", song);

              // You can render song information here if needed
              return <div key={song.id}>{song.title}</div>;
            })}
          </div>
        </div>
      ))}
    </>
  );
};

export default Playlists;
