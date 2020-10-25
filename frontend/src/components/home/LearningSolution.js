import React from "react";

function LearningSolution(props) {
  return (
    <section className="learn-solution white">
      <div className="learn-solution__inner ">
        <div className="learn-solution__inner__img">
          <div className="block-large"></div>
          <div className="block-small"></div>
        </div>
        <div className="learn-solution__inner__text">
          <div className="text__title">
            <span className="icon-note"></span>
            <span className="icon-note-double"></span>
            <h2 className="h2 ">
              All-in-one <br />
              learning solution
            </h2>
          </div>

          <div className="solution-item solution-item--active">
            <span className="icon-calendar margin-r-l"></span>
            <div>
              <p className="text--xxlarge">Scheduling</p>
              <p className="text">Manage and view your lesson</p>
            </div>
          </div>
          <div className="solution-item">
            <span className="icon-monitor margin-r-l"></span>
            <div>
              <p className="text--xxlarge">Secure video technology</p>
              <p className="text">Learn Music in the comfort of your home</p>
            </div>
          </div>
          <div className="solution-item">
            <span className="icon-zap margin-r-l"></span>
            <div>
              <p className="text--xxlarge">Progress tracking</p>
              <p className="text">Keep up with your improvment</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LearningSolution;
