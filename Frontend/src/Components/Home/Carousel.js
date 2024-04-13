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
    <section className="w-11/12 body-font z-40">
      <div className="container py-12">
        <div className="flex shadow-lg">
          <div className="absolute justify-center w-full bg-orange-400">
            <div className="placeImgCont">
              <div className="mx-5 mt-5 mb-5">
                <div
                  id="carouselExampleFade"
                  className="carousel slide carousel-fade placeCarouse"
                  data-bs-ride="carousel"
                >
                  <Slider {...settings}>
                    <div className="h-full">
                      <img
                        src={require(`./../../assets/Background/Bg_3.jpg`)}
                        alt="Slide 1"
                        className="w-full object-cover object-center"
                        style={{ height: "450px" }}
                      />
                    </div>
                    <div className="flex items-center justify-center h-full">
                      <img
                        src={require(`./../../assets/Background/Bg_3.jpg`)}
                        alt="Slide 2"
                        className="w-full object-cover object-centerl"
                        style={{ height: "450px" }}
                      />
                    </div>
                    <div className="w-full items-center justify-center h-full">
                      <img
                        src={require(`./../../assets/Background/Bg_3.jpg`)}
                        alt="Slide 3"
                        className="w-full object-cover object-center"
                        style={{ height: "450px" }}
                      />
                    </div>
                  </Slider>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Carousel;
