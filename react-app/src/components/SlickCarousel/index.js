import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../SplashPage/SplashPage.css";

const SplashCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <Slider className="slider" {...settings}>
        <div className="splash-header-mid">
          Carousel 1<div>H1 = Discover more with BangerSounds Go+</div>
          <div>P = SoundCloud Go+ lets you listen offline, ad-free, with over 320 million tracks — and growing.</div>
          <button>Start uploading today</button>
        </div>

        <div className="splash-header-mid">
          <div>H1 = Whats next in music is first on BangerSounds</div>
          <div>
            P = Upload your first track and begin your journey. SoundCloud gives you space to create, find your fans,
            and connect with other artists.
          </div>
          <button>Start uploading today</button>
        </div>
      </Slider>
    </>
  );
};

export default SplashCarousel;
