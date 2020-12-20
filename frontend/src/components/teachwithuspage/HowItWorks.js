import React from "react";

function HowItWorks(props) {
  return (
    <section className="teachWithUs__how-it-works">
      <div className="teachWithUs__how-it-works__inner white">
        <div className="text__title">
          <h2 className="h2">
            How it {" "}
            <span className="primary">works?</span>
          </h2>
        </div>
        <div className="how-it-works__step">
          <div className="how-it-works__step__inner">
            <div className="how-it-works__step__inner__text">
              <h3 className="h3 secondary">
                Create your Music Teacher Profile for free
              </h3>
              <p className="text--xlarge">
                Show off your musical skills and experience by building a very
                nice profile. Get listed as Teacher right away.
              </p>
            </div>
          </div>
        </div>
        <div className="how-it-works__step step-2">
          <div className="how-it-works__step__inner">
            <div className="how-it-works__step__inner__text">
              <h3 className="h3 primary">
                Simplify your teaching with your Musical Dashboard
              </h3>
              <p className="text--xlarge">
                Upgrade your teaching experience with our
                dashboard. My platform provides fantastic customized tools for you and your students.
              </p>
            </div>
          </div>
        </div>
        <div className="how-it-works__step step-3">
          <div className="how-it-works__step__inner">
            <div className="how-it-works__step__inner__text">
              <h3 className="h3 primary">Teach what you love and earn</h3>
              <p className="text--xlarge">
                As your active partner, We will handle for you all the
                billing so you can focus on teaching
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
