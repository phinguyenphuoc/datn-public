import React from "react";
import Slider from "react-slick";
import PIANO from "../../assets/images/piano.png";
import GUITAR from "../../assets/images/guitar.png";
import VOICE from "../../assets/images/voice.png";
import UKULELE from "../../assets/images/ukulele.png";
import DRUMS from "../../assets/images/drums.png";

const DATA = [
  {
    id: 1,
    src: PIANO,
  },
  {
    id: 2,
    src: GUITAR,
  },
  {
    id: 3,
    src: VOICE,
  },
  {
    id: 4,
    src: UKULELE,
  },
  {
    id: 5,
    src: DRUMS,
  },
];

const Photo = () => {
  const [settings, setSettings] = React.useState({
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  });

  React.useLayoutEffect(() => {
    function slides() {
      if (window.innerWidth <= 620) {
        setSettings({ ...settings, slidesToShow: 1 });
      } else if (window.innerWidth <= 890) {
        setSettings({ ...settings, slidesToShow: 2 });
      } else if (window.innerWidth <= 1130) {
        setSettings({ ...settings, slidesToShow: 3 });
      } else if (window.innerWidth <= 1300) {
        setSettings({ ...settings, slidesToShow: 2 });
      } else if (window.innerWidth > 1300) {
        setSettings({ ...settings, slidesToShow: 3 });
      }
    }
    window.addEventListener("resize", slides);
    slides();
    return () => window.removeEventListener("resize", slides);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="teacher__photo">
      <p className="text--xxlarge title">Photos</p>
      <Slider {...settings}>
        {DATA.map((item) => (
          <article className="slide" key={item.id}>
            <img src={item.src} alt={item.title} />
          </article>
        ))}
      </Slider>
    </div>
  );
};

export default Photo;
