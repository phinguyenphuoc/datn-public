import React from "react";
import group12 from "../../assets/images/Group12.png";
import group13 from "../../assets/images/Group13.png";
import group14 from "../../assets/images/Group14.png";
import group15 from "../../assets/images/Group15.png";

function HowItWorks(props) {
  return (
    <section className="teachWithUs__how-it-works">
      <div className="teachWithUs__how-it-works__inner white">
        <div className="text__title">
          <span className="icon-note"></span>
          <span className="icon-note-double"></span>
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
                nice profile. Get listed as a Homemuse Teacher right away.
              </p>
            </div>
            <img src={group12} alt="" />
          </div>
        </div>
        <div className="how-it-works__step step-2">
          <div className="how-it-works__step__inner">
            <div className="how-it-works__step__inner__text">
              <h3 className="h3 primary">
                Simplify your teaching with your Musical Dashboard
              </h3>
              <p className="text--xlarge">
                Upgrade your teaching experience with our fun and easy-to-use
                dashboard. Our team of music teachers and engineers have
                developped customized tools for you and your students.
              </p>
            </div>
            <img src={group13} alt="" />
          </div>
        </div>
        <div className="how-it-works__step step-3">
          <div className="how-it-works__step__inner">
            <div className="how-it-works__step__inner__text">
              <h3 className="h3 secondary">Choose your teaching options</h3>
              <p className="text--xlarge">
                Online or at-home music classes: it’s up to you! As a Homemuse
                Teacher, get all the flexibility you want
              </p>
            </div>
            <img src={group14} alt="" />
          </div>
        </div>
        <div className="how-it-works__step step-4">
          <div className="how-it-works__step__inner">
            <div className="how-it-works__step__inner__text">
              <h3 className="h3 primary">Teach what you love and earn</h3>
              <p className="text--xlarge">
                As your active partner, Homemuse will handle for you all the
                marketing and billing so you can focus on teaching
              </p>
            </div>
            <img src={group15} alt="" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
