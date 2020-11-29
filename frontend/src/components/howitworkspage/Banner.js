import React from "react";
import img from "../../assets/images/how-it-work.jpg";

function Banner(props) {
  return (
    <section className="how-it-word__banner">
      <div className=" ds-primary-2">
        <div className="how-it-word__banner__text">
          <h1 className="h1">
            How it <span className="primary">works</span>
          </h1>
          <div className="how-it-word__banner__text__title">
            <p className="text--xxlarge">
              “Music is a world within itself, with a language we all
              understand”
              </p>
          </div>
        </div>
        <img src={img} alt="introduce" className="how-it-work__custom__img"></img>
      </div>
    </section>
  );
}

export default Banner;
