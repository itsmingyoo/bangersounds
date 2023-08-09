import React from "react";
import { useSelector } from "react-redux";

function LandingPage() {
  const allSongs = useSelector((s) => Object.values(s.songs.Songs));
  //   console.log(allSongs);

  return (
    <>
      <h1>Hello, this is the landing page</h1>
      <div>Recently Played</div>
      {allSongs &&
        allSongs.map((s) => (
          <div>
            <img src={s.preview_imageURL} />
            <div>{s.artistId}</div>
            <div>{s.username}</div>
          </div>
        ))}
    </>
  );
}

export default LandingPage;
