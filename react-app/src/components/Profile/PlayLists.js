import React from "react";
import { useSelector, useDispatch } from "react-redux";
import SongDisplay from "../SongDisplay";

const Playlists = () => {
  const dispatch = useDispatch();
  const playlists = useSelector((s) => s.songs.Songs);
  console.log(playlists);

  // return <div><SongDisplay/></div>>
  return <div>Playlists</div>;
};

export default Playlists;
