import React from "react";
import connect from "../../assets/images/connect.svg";
import search from "../../assets/images/search.svg";
import start from "../../assets/images/start.svg";

function HowItWorks(props) {
  return (
    <section className="how-it-works">
      <div className="how-it-works__inner ds-primary">
        <div className="text__title">
          <span className="icon-note"></span>
          <span className="icon-note-double"></span>
          <h2 className="h2">
            How it <span className="primary">works</span>
          </h2>
        </div>
        <div className="items__wrapper clearfix">
          <div className="item">
            <h4 className="item__text h4">
              <span className="item__count text--xxxlarge underline underline--secondary">
                01
              </span>{" "}
              Choose your music teacher
            </h4>
            <img src={search} alt="" />
          </div>
          <div className="item">
            <h4 className="item__text h4">
              <span className="item__count text--xxxlarge underline underline--primary">
                02
              </span>
              Schedule your first lesson
            </h4>
            <img src={connect} alt="" />
          </div>
          <div className="item">
            <h4 className="item__text h4">
              <span className="item__count text--xxxlarge underline underline--blue">
                03
              </span>
              Keep track of your progress
            </h4>
            <img src={start} alt="" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
