import React from "react";
import moment from "moment";

function Banner({ title, subtitle, date }) {
  return (
    <section className="articlepage__banner">
      <div className="articlepage__banner__inner ds-primary">
        <div className="articlepage__banner__text">
          <h1 className="h1">{title}</h1>
          <p className="text--xxlarge">{subtitle}</p>
          <p className="text--large articlepage__banner__text__date">
            Last updated {moment(date).format("ll")}
          </p>
        </div>
      </div>
    </section>
  );
}

export default Banner;
