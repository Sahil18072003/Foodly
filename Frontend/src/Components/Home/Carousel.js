// src/Carousel.js
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <section className="w-4/5 mx-36 my-10 body-font z-40 rounded-lg overflow-hidden">
      <Slider {...sliderSettings}>
        <div className="w-full">
          <img
            src={require(`./../../assets/Background/Bg_1.jpg`)}
            alt="Slide 1"
            className="w-full object-cover object-center rounded-lg"
            style={{ height: "450px" }}
          />
        </div>
        <div className="w-full">
          <img
            src={require(`./../../assets/Background/Bg_1.jpg`)}
            alt="Slide 2"
            className="w-full object-cover object-center rounded-lg"
            style={{ height: "450px" }}
          />
        </div>
        <div className="w-full">
          <img
            src={require(`./../../assets/Background/Bg_1.jpg`)}
            alt="Slide 3"
            className="w-full object-cover object-center rounded-lg"
            style={{ height: "450px" }}
          />
        </div>
      </Slider>
    </section>
  );
};

export default Carousel;
