import React from "react";
import { useSelector } from "react-redux";
import "./LandingPage.css";

function LandingPage() {
  const allSongs = useSelector((s) => Object.values(s.songs.Songs));
  //   console.log(allSongs);

  return (
    <>
      <h1>Hello, this is the landing page</h1>
      <div id="recently-played__container">
        <h2>Recently Played</h2>
        <div id="recently-played__songs">
          {allSongs &&
            allSongs.map((s) => (
              <div>
                <img
                  src={s.preview_imageURL}
                  className="recently-played__images"
                />
                <div>{s.artistId}</div>
                <div>{s.username}</div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default LandingPage;
