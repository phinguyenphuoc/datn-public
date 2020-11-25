import React from "react";
import { Link } from "react-router-dom";
// import ReactGA from "react-ga";

function SearchTeachers() {
  const handleGaTracking = () => {
    // ReactGA.event({
    //   category: "Navigation",
    //   action: "Navigation to Teachers Page at Homepage",
    //   label: "Click 'Search for a music teacher Button'",
    // });
  };

  return (
    <section className="try-homemuse">
      <div className="try-homemuse__inner ds-primary">
        <div className="try-homemuse__inner__text">
          <div className="text__title">
            <span className="icon-note"></span>
            <span className="icon-note-double"></span>{" "}
            <h2 className="h2 margin-b-l white">Try Musical E Learning</h2>
          </div>
          <p className="text--xxlarge white margin-b-l">
            Start your musical journey today!
          </p>
        </div>
        <Link onClick={() => handleGaTracking()} to="/teachers">
          <button className="button button--secondary">
            Search for your music teacher
          </button>
        </Link>
      </div>
    </section>
  );
}

export default SearchTeachers;
