import React from "react";

function Banner(props) {
  return (
    <section className="contact-us__banner">
      <div className="contact-us__banner__inner ds-primary">
        <div className="contact-us__banner__text">
          <h1 className="h1">Contact Us</h1>
          <p className="text--xxlarge">
            Have a question or comment? Drop us a line. We’re happy to answer
            any questions you have.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Banner;
