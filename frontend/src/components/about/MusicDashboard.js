import React from "react";
import dashboard from "../../assets/images/dashboard-components.png";
import dashboard2x from "../../assets/images/dashboard-components@2x.png";

function MusicDashboard(props) {
  return (
    <section className="music-dashboard">
      <div className="music-dashboard__inner">
        <div className="music-dashboard__inner__img">
          <img
            src={dashboard}
            alt=""
            srcSet={`${dashboard} 1x, ${dashboard2x} 2x`}
          />
        </div>
        <div className="music-dashboard__inner__text">
          <div className="text__title">
            <span className="icon-note"></span>
            <span className="icon-note-double"></span>
            <h2 className="h2">
              Your Dashboard <br />{" "}
              <span className="primary">All-in-one learning tool</span>
            </h2>
          </div>
          <p className="text--large">
            An efficient partner in your musical learning journey.
          </p>
          <p className="text--large">
            As a Homemuse student, you get access to a personalized musical
            space.
          </p>
          <p className="text--large">
            Designed by a team of professionals, the dashboard allows you to
            manage your schedule and payments, share documents with your teacher
            and more importantly, keep track of your progress as your musical
            skills grow!
          </p>
        </div>
      </div>
    </section>
  );
}

export default MusicDashboard;
