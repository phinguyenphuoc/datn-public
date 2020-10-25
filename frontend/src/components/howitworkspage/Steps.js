import React from "react";
import connect from "../../assets/images/connect.svg";
import search from "../../assets/images/search.svg";
import start from "../../assets/images/start.svg";
import get_ready from "../../assets/images/get_ready.svg";

function Steps(props) {
  return (
    <section className="how-it-work__steps">
      <div className="how-it-work__steps__inner">
        <div className="text__title">
          <span className="icon-note"></span>
          <span className="icon-note-double"></span>
          <h2 className="h2">
            How to book <span className="primary">a lesson?</span>
          </h2>
        </div>

        <div className="steps">
          <div className="step step1">
            <div className="step__wrap">
              <img src={search} alt="" />
              <div className="step__wrap__text">
                <p className="text--xxxlarge underline underline--secondary">
                  01
                </p>
                <p className="h4">Fill out the contact form</p>
                <p className="text--large">
                  You’ve got the choice between a dozen music teachers! Check their
                  profile and pick your teacher.{" "}
                </p>
                <p className="text--large">
                  Choose your lesson options and let your teacher know about
                  your goals and expectations.
                </p>
              </div>
            </div>
          </div>
          <div className="step step2">
            <div className="step__wrap">
              <img src={connect} alt="" />
              <div className="step__wrap__text">
                <p className="text--xxxlarge underline underline--primary">
                  02
                </p>
                <p className="h4">
                  Get contacted by your teacher within 24hours
                </p>
                <p className="text--large">
                  As soon as your teacher receives your request, he will contact you
                  to set the most convenient time to start your
                  weekly music classes.
                </p>
              </div>
            </div>
          </div>
          <div className="step step3">
            <div className="step__wrap">
              <img src={get_ready} alt="" />
              <div className="step__wrap__text">
                <p className="text--xxxlarge underline underline--blue">03</p>
                <p className="h4">Connect to your dashboard</p>
                <p className="text--large">
                  Receive your credentials and access your personal musical space.
                </p>
              </div>
            </div>
          </div>
          <div className="step step4">
            <div className="step__wrap">
              <img src={start} alt="" />
              <div className="step__wrap__text">
                <p className="text--xxxlarge underline underline--secondary">
                  04
                </p>
                <p className="h4">Keep track of your progress</p>
                <p className="text--large">
                  While having fun learning your favorite instrument, you can
                  monitor your improvment and grow your skills!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Steps;
