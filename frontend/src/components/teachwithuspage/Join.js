import React from "react";

function Join({ handleClickButton }) {
  return (
    <section className="try-homemuse">
      <div className="try-homemuse__inner ds-primary">
        <div className="try-homemuse__inner__text">
          <div className="text__title">
            <span className="icon-note"></span>
            <span className="icon-note-double"></span>{" "}
            <h2 className="h2 margin-b-l white">Join the community now</h2>
          </div>
          <p className="text--xxlarge white margin-b-l">
            Connect with hundreds of students and start teaching tomorrow.
          </p>
        </div>
        <button
          className="button button--secondary"
          onClick={handleClickButton}
        >
          Join Musical E Learning as teacher
        </button>
      </div>
    </section>
  );
}

export default Join;
