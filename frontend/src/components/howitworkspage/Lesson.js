import React from "react";
import picture from "../../assets/images/picture-howitwork.PNG";

function Lesson(props) {
  return (
    <section className="trial-lesson">
      <div className="trial-lesson__wrap">
        <div className="trial-lesson__inner ds-primary">
          <div className="trial-lesson__inner__img">
            <img src={picture} alt="box" className="radius-l" />
          </div>
          <div className="trial-lesson__inner__text white">
            <div className="text-title">
              <span className="icon-note"></span>
              <span className="icon-note-double"></span>
              <h2 className="h2">Trial lesson</h2>
            </div>

            <p className="text--large">
              At Homemuse, we think that choosing the right music teacher is a
              big step in life: that’s why we help you to start on the right
              foot!
            </p>
            <p className="text--large">
              As music specialists, we have carefully pre-screened the best
              music teachers based on specific criterias including
              personalities, tutoring experience, teaching methods and
              interaction with students. This way we make sure that all students
              are satisfied with their lessons.
            </p>
            <p className="text--large">
              Experiencing a trial lesson is the best way to test drive a full
              music lesson without the concerns of a long term commitment, and
              make sure there is a perfect fit between the student and the
              teacher. If you’re not happy with your first lesson, no worries:
              Just let us know and we will guide you to find another teacher.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Lesson;
