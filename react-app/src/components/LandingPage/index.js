import React from "react";
import { useSelector } from "react-redux";
import "./LandingPage.css";

function LandingPage() {
  const allSongs = useSelector((s) => Object.values(s.songs.Songs));
  console.log(allSongs); // allSongs.artistInfo.display_name

  return (
    <>
      <h1>Hello, this is the landing page</h1>
      <div id="recently-played__container">
        <h2>Recently Played</h2>
        <div id="recently-played__songs">
          {allSongs &&
            allSongs.map((s) => (
              <div key={s.id} id="recently-played__each-song-container">
                <img
                  src={s.previewImageURL}
                  className="recently-played__images"
                />
                <div>
                  {/* need to change this later bc its not the real 'artist - song name' format from the AWS file link */}
                  {/* <div>
                    {s.artistInfo.firstName} {s.artistInfo.lastName}
                  </div> */}
                  <div>{s.title}</div>
                </div>
                <div>{s.artistInfo.displayName}</div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default LandingPage;
