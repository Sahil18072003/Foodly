import React, { useEffect } from "react";
import "./AboutUs.css";
import ProfileCard from "../AboutUs/ProfileCard";
import devloperInfo from "./Devloper";

const AboutUs = () => {
  useEffect(() => {
    document.title = "About Us | Foodly";
  }, []);

  return (
    <>
      <div className="wrapper">
        <div className="head-container">
          <div className="heading-text-container">
            <span>The Foodly Vision</span>
            <span>Connecting Hearts and Homes</span>
          </div>
          <div className="img-container">
            {/* <img
              src="client\src\assets\pet-group.png"
              alt=""
            /> */}
          </div>
        </div>

        <div className="detail-container intro-container">
          <div className="problem-container">
            <div className="text-container">
              <div className="text-heading">Welcome to Foodly</div>
              <div className="text-content">
                At Foodly, we're passionate about serving delicious food and
                providing exceptional service to our customers. Whether you're
                craving your favorite comfort food or looking to try something
                new, we've got you covered.
              </div>
            </div>
            <div className="img-container">
              <img
                // src="https://res.cloudinary.com/dxote5l0r/image/upload/v1701854206/Website%20Images/nrxmmc0kozhuqrpp3vpi.jpg"
                alt="Hold"
                className="s"
              />
            </div>
          </div>

          <div className="problem-container">
            <div className="img-container">
              <img
                // src="https://res.cloudinary.com/dxote5l0r/image/upload/v1701854563/Website%20Images/uti4fkuju9dh2dawh6hf.jpg"
                alt="Hold"
                className="s"
              />
            </div>
            <div className="text-container">
              <div className="text-heading">Our Mission</div>
              <div className="text-content">
                Our mission is simple: to delight our customers with
                mouthwatering dishes made from the freshest ingredients. We
                believe that great food brings people together, and we're
                dedicated to creating memorable dining experiences for every
                guest.
              </div>
            </div>
          </div>
        </div>

        <div className="detail-container what-we-container">
          <div className="problem-container">
            <div className="text-container">
              <div className="text-heading">Our Story</div>
              <div className="text-content">
                <span>
                  Foodly was founded in 2013 by Sahil Data with a vision to
                  revolutionize the dining experience in our community. What
                  started as a small family-owned restaurant has grown into a
                  beloved establishment known for its flavorful cuisine and
                  welcoming atmosphere.
                </span>
              </div>

              <br />
              <div className="text-content">
                <span>Easy Matchmaking : </span>
                <span>
                  When the time comes for your pet to have a family, we make the
                  journey of finding the perfect mate simple and stress-free. No
                  more scouring every corner of the internet.
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="detail-container why-we-container">
          <div className="problem-container">
            <div className="text-container">
              <div className="text-heading">Why PawsomeLife</div>
              <div className="text-content">
                <span>
                  We recognized a gap in the pet world in India, and we set out
                  to fill it. PawsomeLife is the solution that brings ease,
                  reliability, and trust to the world of pet ownership. Whether
                  you're looking for a new furry companion or aiming to expand
                  your pet family, we're here to simplify the journey.
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="community-wrapper">
          <div className="heading-text">our community</div>
          <div className="community-container">
            {devloperInfo.map((data) => {
              return <ProfileCard {...data} key={data.id} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
