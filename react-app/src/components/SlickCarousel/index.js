import React from "react";
import { useHistory } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../SplashPage/SplashPage.css";

const SplashCarousel = () => {
  const history = useHistory();
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <>
      <Slider className="slider" {...settings}>
        <div className="item-1" style={{ width: "100%" }}>
          <div className="splash-header-mid">
            <img src="https://a-v2.sndcdn.com/assets/images/sc_landing_header_web_b-447230ef.jpg" alt="c1" />
            <div className="content-slide">
              <div>Discover more with BangerSounds Go+</div>
              <div>BangerSounds Go+ lets you listen offline, ad-free, with over 320 million tracks — and growing.</div>
              <div className="content-slide-buttons">
                <button onClick={() => alert("Feature coming soon!")}>Learn more</button>
                <button onClick={() => history.push("/upload")}>Start uploading today</button>
              </div>
            </div>
          </div>
        </div>
        <div className="item-1" style={{ width: "100%" }}>
          <div className="splash-header-mid">
            <img
              src="https://a-v2.sndcdn.com/assets/images/sc_landing_header_web_featured_artists-8081257b.jpg"
              alt="c2"
            />
            <div className="content-slide">
              <div>Whats next in music is first on BangerSounds</div>
              <div>
                Upload your first track and begin your journey. BangerSounds gives you space to create, find your fans,
                and connect with other artists.
              </div>
              <button onClick={() => history.push("/upload")}>Start uploading today</button>
            </div>
          </div>
        </div>
      </Slider>
    </>
  );
};

export default SplashCarousel;
