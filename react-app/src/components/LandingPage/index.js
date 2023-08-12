import React from "react";
import { useSelector } from "react-redux";
// import { Redirect } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "./LandingPage.css";

function LandingPage() {
  const allSongs = useSelector((s) => Object.values(s.songs.Songs));
  // console.log(allSongs); // allSongs.artistInfo.display_name

  return (
    <>
      <h1>Hello, this is the landing page</h1>
      <div id="recently-played__container">
        <h2>Recently Played</h2>
        <div id="recently-played__songs">
          {/* START of loop */}
          {allSongs &&
            allSongs.map((s) => (
              <div key={s.id} id="recently-played__each-song-container">
                <div>
                  {/* Play button should play song when clicked */}
                  <button>Play Btn</button>
                  {/* Image should link to song id page */}
                  <NavLink to={`/songs/${s.id}`}>
                    <img
                      src={
                        s.thumbnail
                          ? s.thumbnail
                          : "https://i1.sndcdn.com/artworks-R5fUpysnmuGuxcMv-5ojqxQ-t500x500.png"
                      }
                      className="recently-played__images"
                      alt={`p-image__${s.title}`}
                      // onClick={() => Redirect(`/home`)}
                    />
                  </NavLink>
                </div>
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
          {/* END of loop */}
        </div>
      </div>
    </>
  );
}

export default LandingPage;
