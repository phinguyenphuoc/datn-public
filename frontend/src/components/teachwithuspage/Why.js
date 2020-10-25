import React from "react";
import free from "../../assets/images/free.svg";
import connect from "../../assets/images/connect-twu.svg";
import earn from "../../assets/images/earn.svg";
import focus from "../../assets/images/focus.svg";

function Why(props) {
  return (
    <section className="why">
      <div className="why__inner ds-primary white">
        <div className="text__title">
          <span className="icon-note"></span>
          <span className="icon-note-double"></span>
          <h2 className="h2">
            Why teach through <br />
            <span className="primary">Homemuse?</span>
          </h2>
        </div>
        <div className="reason">
          <div className="reason__item">
            <div className="reason__item__inner">
              <img src={free} alt="" />
              <p className="text--xxlarge">It’s 100% free !</p>
            </div>
          </div>
          <div className="reason__item">
            <div className="reason__item__inner">
              <img src={connect} alt="" />
              <p className="text--xxlarge">Connect with hundred of students</p>
            </div>
          </div>
          <div className="reason__item">
            <div className="reason__item__inner">
              <img src={earn} alt="" />
              <p className="text--xxlarge">
                Teach whenever you like and earn up to $6000 a month
              </p>
            </div>
          </div>
          <div className="reason__item">
            <div className="reason__item__inner">
              <img src={focus} alt="" />
              <p className="text--xxlarge">
                Focus on your teaching. We take care of the rest!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Why;
