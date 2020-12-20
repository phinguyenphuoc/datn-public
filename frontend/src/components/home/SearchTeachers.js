import React from "react";
import { Link } from "react-router-dom";

function SearchTeachers() {
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
        <Link to="/teachers">
          <button className="button button--secondary">
            Search for your music teacher
          </button>
        </Link>
      </div>
    </section>
  );
}

export default SearchTeachers;
