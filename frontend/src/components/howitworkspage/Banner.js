import React from "react";

function Banner(props) {
  return (
    <section className="how-it-word__banner">
      <div className=" ds-primary">
          <div className="how-it-word__banner__text">
            <h1 className="h1">
              How it <span className="primary">works</span>
            </h1>
            <div className="how-it-word__banner__text__title">
              <p className="text--xxlarge">
                “Music is a world within itself, with a language we all
                understand”
              </p>
              <p className="text author">- Stevie Wonder -</p>
            </div>
          </div>
      </div>
    </section>
  );
}

export default Banner;
