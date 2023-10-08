import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import SongDisplay from "../SongDisplay";

const Playlists = () => {
  // const dispatch = useDispatch();
  // const user = useSelector((s) => s.session.user);
  // const playlists = useSelector((s) => Object.values(s.playlists));
  // console.log("u", user);
  // console.log("p", playlists);
  // const userPlaylists = [];
  // const playlistSongIds = new Set();
  // playlists?.forEach((p) => {
  //   if (p.createdBy === user.id) {
  //     userPlaylists.push(p);
  //   }
  // });
  // console.log("uppppp", userPlaylists);
  // console.log("up", userPlaylists[0].songs); //{"1": 1, "2": 2, "3": 3}
  // console.log("ups", Object.values(userPlaylists[0].songs)); // 0: "{"
  // Object.values(userPlaylists[0].songs).forEach((song) => {
  //   if (Number(song)) playlistSongIds.add(song);
  //   console.log("song foreach", song);
  // });
  // console.log(playlistSongIds);

  // const [playlists, setPlaylists] = useState(Array(songComments.length).fill(false));

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

  const user = useSelector((s) => s.session.user);
  const playlists = useSelector((s) => Object.values(s.playlists));

  // Create an object to store songs by playlist
  const playlistSongs = {};

  // Filter user playlists and convert 'songs' to an array
  const userPlaylists = playlists
    .filter((p) => p.createdBy === user.id)
    .map((playlist) => {
      const playlistWithSongs = {
        ...playlist,
        songs: Object.values(playlist.songs), // Convert 'songs' to an array
      };

      // Store songs by playlist
      playlistSongs[playlist.id] = playlistWithSongs.songs;

      return playlistWithSongs;
    });

  // Create a set of playlist song IDs
  const playlistSongIds = {};
  userPlaylists.forEach((playlist) => {
    playlistSongIds[playlist.id] = new Set();
    playlist.songs.forEach((song) => {
      if (Number(song)) {
        playlistSongIds[playlist.id].add(Number(song));
      }
    });
  });

  console.log("User Playlists", userPlaylists);
  console.log("Playlist Songs", playlistSongs);
  console.log("Playlist Song IDs", playlistSongIds);

  return <div>Playlists</div>;
};

export default Playlists;
