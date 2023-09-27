import React from "react";
import { useSelector, useDispatch } from "react-redux";
import SongDisplay from "../SongDisplay";

const Playlists = () => {
  const dispatch = useDispatch();
  const user = useSelector((s) => s.session.user);
  const playlists = useSelector((s) => Object.values(s.playlists));
  console.log("u", user);
  console.log("p", playlists);
  const userPlaylists = [];
  playlists?.forEach((p) => {
    if (p.createdBy === user.id) {
      userPlaylists.push(p);
    }
  });
  console.log("up", userPlaylists[0].songs); //{"1": 1, "2": 2, "3": 3}

  // return <div><SongDisplay/></div>>
  return <div>Playlists</div>;
};

export default Playlists;
