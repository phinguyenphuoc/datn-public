import React from "react";
import customized_learning from "../../assets/images/customized_learning.png";
import pay_per_lesson from "../../assets/images/pay_per_lesson.png";
import anytime_anywhere from "../../assets/images/anytime_anywhere.png";

function WhyHomemuse(props) {
  return (
    <section className="why-homemuse">
      <div className="why-homemuse__inner">
        <div className="text__title">
          <span className="icon-note"></span>
          <span className="icon-note-double"></span>
          <h2 className="h2">
            Why <span className="primary">Us?</span>
          </h2>
        </div>
        <div className="items">
          <div className="item">
            <div className="item__inner">
              <img src={customized_learning} alt="" />
              <div className="item__inner__text">
                <h3 className="h3 underline underline--secondary">
                  Customized Learning
                </h3>
                <p className="text--xlarge">
                  Choose your music teacher for 1-on-1 music lessons based on
                  your goals and interests
                </p>
              </div>
            </div>
          </div>
          <div className="item">
            <div className="item__inner">
              <img src={pay_per_lesson} alt="" />
              <div className="item__inner__text">
                <h3 className="h3 underline underline--primary">
                  Pay per lesson
                </h3>
                <p className="text--xlarge">
                  You only pay per lesson and at the price that
                  meets your budget
                </p>
              </div>
            </div>
          </div>
          <div className="item">
            <div className="item__inner">
              <img src={anytime_anywhere} alt="" />
              <div className="item__inner__text">
                <h3 className="h3 underline underline--blue">
                  Anytime, Anywhere
                </h3>
                <p className="text--xlarge">
                  Take online lessons at the time and place that
                  suits you
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyHomemuse;
