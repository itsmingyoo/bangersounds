import React from "react";
import { NavLink } from "react-router-dom";
import SplashCarousel from "../SlickCarousel";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./SplashPage.css";

const Splash = ({ songs }) => {
  return (
    <div className="splash-wrapper" style={{ width: "100%" }}>
      <div className="splash-container" style={{ width: "65%" }}>
        <SplashCarousel />
        <div className="splash-content">
          Content
          <div className="splash-header">
            Header
            <div className="splash-header-content">
              <div className="splash-navbar">
                <div>SoundBangersLogo</div>

                <div className="splash-navbar-right-buttons">
                  <button>Sign In</button>
                  <button>Create account</button>
                  <div>For Artists</div>
                </div>
              </div>
            </div>
          </div>
          <div className="splash-search">
            <input type="type" placeholder="Search for artists, bands, songs, podcasts" />
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
