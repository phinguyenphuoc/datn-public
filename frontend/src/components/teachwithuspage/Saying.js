import React from "react";
import Slider from "react-slick";
import AuthorFeedback1 from "../../assets/images/author1.jpg";
import AuthorFeedback2 from "../../assets/images/author2.jpg";
import AuthorFeedback3 from "../../assets/images/author1.jpg";

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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dignissim convallis aenean et tortor at. Egestas purus viverra accumsan in nisl. Id aliquet lectus proin nibh nisl condimentum id venenatis. Sodales ut etiam sit amet nisl purus in mollis. Eleifend quam adipiscing vitae proin sagittis nisl rhoncus mattis. Natoque penatibus et magnis dis parturient. Congue nisi vitae suscipit tellus mauris a diam maecenas. Erat nam at lectus urna. Urna nec tincidunt praesent semper feugiat. Interdum varius sit amet mattis vulputate enim nulla. Aenean euismod elementum nisi quis eleifend quam adipiscing vitae. Turpis nunc eget lorem dolor sed.
              </p>
            </div>
          </article>
          <article className="slide">
            <div className="slide__content">
              <h4 className="h4">Emily</h4>
              {/* <p>Piano teacher at Palo Alto</p> */}
              <img src={AuthorFeedback2} alt="author feedback" />
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dignissim convallis aenean et tortor at. Egestas purus viverra accumsan in nisl. Id aliquet lectus proin nibh nisl condimentum id venenatis. Sodales ut etiam sit amet nisl purus in mollis. Eleifend quam adipiscing vitae proin sagittis nisl rhoncus mattis. Natoque penatibus et magnis dis parturient. Congue nisi vitae suscipit tellus mauris a diam maecenas. Erat nam at lectus urna. Urna nec tincidunt praesent semper feugiat. Interdum varius sit amet mattis vulputate enim nulla. Aenean euismod elementum nisi quis eleifend quam adipiscing vitae. Turpis nunc eget lorem dolor sed.
              </p>
            </div>
          </article>
          <article className="slide">
            <div className="slide__content">
              <h4 className="h4">Michael</h4>
              {/* <p>Piano teacher at Palo Alto</p> */}
              <img src={AuthorFeedback3} alt="author feedback" />
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dignissim convallis aenean et tortor at. Egestas purus viverra accumsan in nisl. Id aliquet lectus proin nibh nisl condimentum id venenatis. Sodales ut etiam sit amet nisl purus in mollis. Eleifend quam adipiscing vitae proin sagittis nisl rhoncus mattis. Natoque penatibus et magnis dis parturient. Congue nisi vitae suscipit tellus mauris a diam maecenas. Erat nam at lectus urna. Urna nec tincidunt praesent semper feugiat. Interdum varius sit amet mattis vulputate enim nulla. Aenean euismod elementum nisi quis eleifend quam adipiscing vitae. Turpis nunc eget lorem dolor sed.
              </p>
            </div>
          </article>
        </Slider>
      </div>
    </section>
  );
}

export default Feedback;
