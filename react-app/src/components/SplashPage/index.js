import React from "react";
import { NavLink } from "react-router-dom";
import SplashCarousel from "../SlickCarousel";
import bangerSoundsLogo from "../../images/bangersounds-logo-new.ico";
import { FaSearch } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./SplashPage.css";

const Splash = ({ songs }) => {
  // import login/create acc stuff here
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
            <div>H1 = Hear what’s trending for free in the SoundCloud community </div>
            <div className="splash-songs">
              <NavLink to="/discover">Discover</NavLink>
              <div>Song</div>
              <div>Song</div>
              <div>Song</div>
              <div>Song</div>
              <div>Song</div>
              <div>Song</div>
              <div>Song</div>
            </div>
            <button onClick={() => alert("Feature coming soon!")}>Explore trending playlists</button>
          </div>
          <div className="splash-footer-top">
            <img src="https://a-v2.sndcdn.com/assets/images/never_stop_listening@1x-9c5264ff.jpg" alt="footer-top" />
            <button>Download on the App Store</button>
            <button>GET IT ON Google Play</button>
          </div>
          <div className="splash-footer-bot">
            <img
              src="https://a-v2.sndcdn.com/assets/images/hp_creator_image_featured_artists-798050ae.jpg"
              alt="footer-bot"
            />
            <button>Find out more</button>
          </div>
          <div className="footer-footer">
            <div>Thanks for listening. Now join in.</div>
            <div>Save tracks, follow artists and build playlists. All for free.</div>
            <button>Create account</button>
            <div>
              <label>
                Already have an account?
                <button>Sign In</button>
              </label>
            </div>
          </div>
          <hr></hr>
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
