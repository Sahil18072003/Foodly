import React, { useState } from "react";
import "./ProfileCard.css"; // Import the external CSS file.

const ProfileCard = (props) => {
  const [isSocialVisible, setSocialVisible] = useState(true);
  const [animationClass, setAnimationClass] = useState("down-animation");

  const toggleSocial = () => {
    if (animationClass === "animation") {
      setAnimationClass("down-animation");
      setTimeout(() => {
        setAnimationClass("");
      }, 1000);
    } else {
      setAnimationClass("animation");
    }

    setSocialVisible(!isSocialVisible);
  };

  return (
    <div className="profile-container" id={props.id}>
      <div className="profile-card">
        <div className="profile-card__border">
          <img
            src={props.image}
            alt="card image"
            className="profile-card__img"
          />
        </div>

        <h3 className="profile-card__name">{props.name}</h3>
        <span className="profile-card__profession">{props.role}</span>

        <div
          className={`profile-card__social ${animationClass}`}
          style={{
            backgroundColor: isSocialVisible
              ? "hsl(29, 80%, 58%)"
              : "var(--first-color)",
            transform: isSocialVisible ? "rotate(-135deg)" : "rotate(0)",
            animation: isSocialVisible
              ? "up-animation 1s ease-in-out forwards"
              : "none",
          }}
          onClick={toggleSocial}
        >
          <div className="profile-card__social-control">
            <div
              className="profile-card__social-toggle"
              onClick={toggleSocial}
              style={{
                backgroundColor: isSocialVisible
                  ? "hsl(29, 16%, 10%)"
                  : "hsl(29, 80%, 58%)",
                color: isSocialVisible
                  ? "var(--first-color)"
                  : "var(--black-color)",
                transform: isSocialVisible ? "rotate(0)" : "rotate(-135deg)",
              }}
            >
              <i className="fa-solid fa-plus" style={{ color: "white" }}></i>
            </div>

            <span
              className="profile-card__social-text"
              style={{
                color: isSocialVisible
                  ? "var(--black-color)"
                  : "var(--first-color)",
              }}
            >
              My social networks
            </span>

            <ul className="profile-card__social-list">
              <a
                href={props.github}
                target="_blank"
                className="profile-card__social-link"
              >
                <i className="fa-brands fa-github"></i>
              </a>

              <a
                href={props.linkedIn}
                target="_blank"
                className="profile-card__social-link"
              >
                <i className="fa-brands fa-linkedin-in"></i>
              </a>

              <a
                href={props.instagram}
                target="_blank"
                className="profile-card__social-link"
              >
                <i className="fa-brands fa-instagram"></i>
              </a>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
