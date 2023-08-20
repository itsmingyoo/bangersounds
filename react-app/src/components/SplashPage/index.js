import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import SplashCarousel from "../SlickCarousel";
import bangerSoundsLogo from "../../images/bangersounds-logo-new.ico";
import ImageContainer from "../LandingPage/ImageContainer";
import { playUserSongAction, setPlayingState } from "../../store/songs";
import { FaSearch } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./SplashPage.css";

const Splash = ({ songs, isPlayingState, currentlyPlaying }) => {
  // import login/create acc stuff here

  const dispatch = useDispatch();

  const togglePlayPause = async (song) => {
    dispatch(playUserSongAction(song));

    if (currentlyPlaying) {
      if (currentlyPlaying.id === song.id) dispatch(setPlayingState(!isPlayingState));
      else dispatch(setPlayingState(true));
    }
  };

  const displayTopTransition = () => {
    window.scrollTo(0, 0);
  };
  return (
    <div className="splash-wrapper" style={{ width: "100%" }}>
      <div className="splash-container" style={{ width: "65%" }}>
        <SplashCarousel />
        <div className="splash-header">
          <div className="splash-header-content">
            <div className="splash-navbar">
              <img src={bangerSoundsLogo} alt="logo" />

              <div className="splash-navbar-right-buttons">
                <button>Sign In</button>
                <button>Create account</button>
                <div>For Artists</div>
              </div>
            </div>
          </div>
        </div>
        <div className="splash-content">
          <div className="splash-search">
            <div
              style={{
                position: "relative",
                width: "50%",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <input type="type" placeholder="Search for artists, bands, songs, podcasts" />
              <button className="splash-search-button">
                <FaSearch />
              </button>
            </div>
            <div>or</div>
            <button>Upload your own</button>
          </div>

          <div className="splash-trending-songs">
            {/* <NavLink to="/discover">Discover</NavLink> */}
            <div style={{ fontSize: "24px" }}>Hear what’s trending for free in the SoundCloud community </div>
            <div className="splash-songs">
              {songs &&
                songs.slice(0, 12).map((s) => (
                  <div
                    key={s.id}
                    id="recently-played__each-song-container"
                    style={{ flexBasis: "10%", width: "10%", padding: "20px" }}
                  >
                    <ImageContainer
                      {...{ s, togglePlayPause, currentlyPlaying, isPlayingState, songs, displayTopTransition }}
                    />
                    <NavLink to={`/songs/${s.id}`} onClick={displayTopTransition}>
                      <div style={{ whiteSpace: "nowrap", overflow: "hidden" }} title={s.title}>
                        {s.title}
                      </div>
                    </NavLink>
                    <div style={{ wordBreak: "break-all", overflow: "hidden", color: "#999" }}>
                      {s.artistInfo.displayName}
                    </div>
                  </div>
                ))}
            </div>
            <button onClick={() => alert("Feature coming soon!")}>Explore trending playlists</button>
          </div>
          <div className="splash-footer-top">
            <img src="https://a-v2.sndcdn.com/assets/images/never_stop_listening@1x-9c5264ff.jpg" alt="footer-top" />
            <div className="splash-footer-top-right-wrapper" style={{ backgroundColor: "#f2f2f2" }}>
              <div className="splash-footer-top-right">
                <h1 style={{ fontWeight: "400" }}>Never stop listening</h1>
                <h3 style={{ fontWeight: "100", width: "60%" }}>
                  BangerSounds is available on Web, iOS, Android, Sonos, Chromecast, and Xbox One.
                </h3>
                <div className="splash-footer-top-right-buttons">
                  <button>
                    <img src="https://a-v2.sndcdn.com/assets/images/appstore_badge@en-9e7292e6.png" alt="apple-dl" />
                  </button>
                  <button>
                    <img
                      src="https://a-v2.sndcdn.com/assets/images/google_play_badge@en-51d52194.png"
                      alt="google-dl"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="splash-footer-bot">
            <div className="splash-footer-bot-image">
              <div style={{ width: "50%" }} className="splash-footer-bot-content">
                <div style={{ color: "white" }} className="splash-footer-bot-text1">
                  Calling all creators
                </div>
                <div style={{ color: "white" }} className="splash-footer-bot-text2">
                  Get on BangerSounds to connect with fans, share your sounds, and grow your audience. What are you
                  waiting for?
                </div>
                <button className="splash-footer-bot-button">Find out more</button>
              </div>
              <div style={{ width: "50%" }}></div>
            </div>
          </div>

          <div className="footer-footer">
            <div className="splash-footer-bot-text3">Thanks for listening. Now join in.</div>
            <div className="splash-footer-bot-text4">
              Save tracks, follow artists and build playlists. All for free.
            </div>
            <button>Create account</button>
            <div className="already-have-an-account">
              <label>Already have an account?</label>
              <button>Sign In</button>
            </div>
          </div>

          <div className="horizontal-line"></div>

          <div className="footer-footer-footer">
            Directory - About us - Artist Resources - Blog - Jobs - Developers - Help - Legal - Do Not Sell or Share My
            Personal Information - Privacy - Cookie Policy - Cookie Manager - Imprint - Charts Language: English (US)
          </div>
        </div>
      </div>
    </div>
  );
};

export default Splash;
