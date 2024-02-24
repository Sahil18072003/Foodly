import React from "react";
import "./Heading.css";

function Heading(props) {
  return (
    <>
      <header
        className={`heading-container heading-container-align-${props.align}`}
        data-aos="fade-up"
        data-aos-delay="50"
        data-aos-duration="1000"
      >
        <h2 className={`section-heading ${props.className}`} id={props.id}>
          {props.title}
        </h2>
      </header>
    </>
  );
}

export default Heading;
