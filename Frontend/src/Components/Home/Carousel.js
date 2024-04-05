// src/Carousel.js
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <section className="w-full body-font z-40">
      <div className="container py-12 mx-auto">
        <div className="flex shadow-lg">
          <div className="absolute justify-center w-full bg-indigo-400"></div>
        </div>
      </div>
    </section>
  );
};

export default Carousel;
