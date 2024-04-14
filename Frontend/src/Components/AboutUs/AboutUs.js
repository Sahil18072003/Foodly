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
                Foodly is an online food delivery and dining platform dedicated
                to serving delicious meals and providing exceptional service to
                our customers. Whether you're craving your favorite comfort food
                or eager to try something new, Foodly has got you covered.
              </div>
            </div>
            <div className="img-container">
              <img
                src={require(`./../../assets/Aboutus/First.jpg`)}
                alt="Hold"
                className="rounded-lg"
              />
            </div>
          </div>

          <div className="problem-container">
            <div className="img-container">
              <img
                src={require(`./../../assets/Aboutus/second.jpg`)}
                alt="Hold"
                className="rounded-lg"
              />
            </div>
            <div className="text-container">
              <div className="text-heading">Our Mission</div>
              <div className="text-content">
                Foodly's mission is simple yet impactful: to delight customers
                with mouthwatering dishes crafted from the freshest ingredients.
                We believe that great food has the power to bring people
                together, and we are dedicated to creating memorable dining
                experiences for every guest.
              </div>
            </div>
          </div>
        </div>

        <div className="detail-container what-we-container">
          <div className="problem-container">
            <div className="text-container">
              <div className="text-heading">Our Story</div>
              <div className="text-content">
                Foodly was founded in 2013 by Sahil Dharaviya with the vision to
                revolutionize the dining experience in our community. What began
                as a small family-owned restaurant has evolved into a beloved
                establishment known for its flavorful cuisine and welcoming
                atmosphere.
              </div>

              <br />
              <div className="text-content">
                <span>Easy Matchmaking : </span>
                <span>
                  When the time comes for your pet to find a family, Foodly
                  makes the journey of finding the perfect match simple and
                  stress-free, eliminating the need to search every corner of
                  the internet.
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="detail-container why-we-container">
          <div className="problem-container">
            <div className="text-container">
              <div className="text-heading">Why Foodly</div>
              <div className="text-content">
                Foodly identified a gap in the online food delivery and dining
                landscape and set out to fill it. We aim to bring ease,
                reliability, and trust to the world of food delivery and dining.
                Whether you're ordering in or dining out, Foodly is here to
                simplify your culinary journey.
              </div>
            </div>
          </div>
        </div>

        <div className="community-wrapper">
          <div className="heading-text">Our Community</div>
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
