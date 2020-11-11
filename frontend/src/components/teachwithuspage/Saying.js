import React from "react";
import Slider from "react-slick";
import AuthorFeedback1 from "../../assets/images/robert.png";
import AuthorFeedback2 from "../../assets/images/emily.png";
import AuthorFeedback3 from "../../assets/images/michael.png";

function Feedback() {
  const [settings, setSettings] = React.useState({
    dots: false,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
  });

  React.useLayoutEffect(() => {
    function slides() {
      if (window.innerWidth <= 700) {
        setSettings({ ...settings, dots: true });
      } else {
        setSettings({ ...settings, dots: false });
      }
    }
    window.addEventListener("resize", slides);
    slides();
    return () => window.removeEventListener("resize", slides);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="feedback feedback__teacher">
      <div className="feedback__inner">
        <div className="text__title">
          <span className="icon-note"></span>
          <span className="icon-note-double"></span>
          <h2 className="h2 white">
            What teachers <span className="text--primary">are saying</span>
          </h2>
        </div>
        <Slider {...settings}>
          <article className="slide">
            <div className="slide__content">
              <h4 className="h4 primary">Robert</h4>
              {/* <p>Piano teacher at Palo Alto</p> */}
              <img src={AuthorFeedback1} alt="author feedback" />
              <p>
                I've finally tried the platform.
                I had never tried it before because anything related to technology scares me :).
                But it was so easy to use and so helpful that I changed my mind. My students loved it.
                It really helps me focus on the teaching only.
                Great tool. Thank you!
              </p>
            </div>
          </article>
          <article className="slide">
            <div className="slide__content">
              <h4 className="h4">Emily</h4>
              {/* <p>Piano teacher at Palo Alto</p> */}
              <img src={AuthorFeedback2} alt="author feedback" />
              <p>
                I got four new students through these past couple of weeks, I'm so happy.
                Thank you so much!
              </p>
            </div>
          </article>
          <article className="slide">
            <div className="slide__content">
              <h4 className="h4">Michael</h4>
              {/* <p>Piano teacher at Palo Alto</p> */}
              <img src={AuthorFeedback3} alt="author feedback" />
              <p>
                My main concern as a teacher was late payments from my students.
                The website handles that for me and it’s so convenient.
                I now have one less thing to worry about!! I also like their “48h cancelation policy”.
                It is great to work with an organization like. Thank you!!
              </p>
            </div>
          </article>
        </Slider>
      </div>
    </section>
  );
}

export default Feedback;
