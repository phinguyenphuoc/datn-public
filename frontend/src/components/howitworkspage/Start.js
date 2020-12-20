import React from "react";
import { Link } from "react-router-dom";

function Start() {
  return (
    <section className="start">
      <div className="start__inner ds-primary">
        <div className="start__inner__text">
          <div className="text__title">
            <span className="icon-note"></span>
            <span className="icon-note-double"></span>
            <h2 className="h2 margin-b-l white">Let's start</h2>
          </div>
          <p className="text--xxlarge white margin-b-l">
            Discover our great music teachers
          </p>
        </div>
        <Link to="/teachers">
          <button className="button button--secondary">Check now</button>
        </Link>
      </div>
    </section>
  );
}

export default Start;
