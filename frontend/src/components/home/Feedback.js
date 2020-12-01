import React from "react";
import Slider from "react-slick";
import Author1Feedback from "../../assets/images/author1.jpg";
import Author3Feedback from "../../assets/images/author2.jpg";

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
    <section className="feedback">
      <div className="feedback__inner">
        <div className="text__title">
          <span className="icon-note"></span>
          <span className="icon-note-double"></span>
          <h2 className="h2">
            What <span className="text--primary">students</span> say
          </h2>
        </div>
        <Slider {...settings}>
          <article className="slide">
            <div className="slide__content">
              <h4 className="h4">About Jeanne</h4>
              <p>Piano teacher, San Francisco</p>
              <img src={Author1Feedback} alt="author feedback" />
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>
          </article>
          <article className="slide">
            <div className="slide__content">
              <h4 className="h4">About Asuka</h4>
              <p>Voice teacher, New York City</p>
              <img src={Author3Feedback} alt="author feedback" />
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>
          </article>
        </Slider>
      </div>
    </section>
  );
}

export default Feedback;
