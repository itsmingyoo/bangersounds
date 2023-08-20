import React from "react";
import "./SplashPage.css";

const Splash = () => {
  return (
    <div className="splash-wrapper" style={{ width: "100%" }}>
      <div className="splash-container" style={{ width: "65%" }}>
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

              {/* Carousel 1 */}
              <div className="splash-header-mid">
                <div>H1 = Discover more with BangerSounds Go+</div>
                <div>
                  P = SoundCloud Go+ lets you listen offline, ad-free, with over 320 million tracks — and growing.
                </div>
                <button>Start uploading today</button>
              </div>

              {/* Carousel 2 */}
              <div className="splash-header-mid">
                <div>H1 = Whats next in music is first on BangerSounds</div>
                <div>
                  P = Upload your first track and begin your journey. SoundCloud gives you space to create, find your
                  fans, and connect with other artists.
                </div>
                <button>Start uploading today</button>
              </div>
            </div>
          </div>
          <div className="splash-search">
            <input type="type" placeholder="Search for artists, bands, songs, podcasts" />
          </div>
          <div className="splash-trending-songs">
            <div>H1 = Hear what’s trending for free in the SoundCloud community </div>
            <div className="splash-songs">
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
