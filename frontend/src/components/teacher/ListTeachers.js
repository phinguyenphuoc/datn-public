import React from "react";
import Slider from "react-slick";
import { CardTeacher } from "../common";
import defaultAvatar from "../../assets/images/avatar-picture.svg";
import _ from "lodash";
const ListTeachers = ({ data, dataTeachers, handleClick }) => {
  const [settings, setSettings] = React.useState({
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
  });

  React.useLayoutEffect(() => {
    // TODO: it should be configed in a place
    function slides() {
      if (window.innerWidth <= 650) {
        setSettings({ ...settings, slidesToShow: 1, slidesToScroll: 1 });
      } else if (window.innerWidth <= 870) {
        setSettings({ ...settings, slidesToShow: 2 });
      } else if (window.innerWidth <= 1150) {
        setSettings({ ...settings, slidesToShow: 3 });
      } else if (window.innerWidth > 1150) {
        setSettings({ ...settings, slidesToShow: 4 });
      }
    }
    window.addEventListener("resize", slides);
    slides();
    return () => window.removeEventListener("resize", slides);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const suggestedTeachers = [];
  const teacherSkills = dataTeachers.skills
    ? dataTeachers.skills.map((item) => item.instrument)
    : [];
  data.dataFromAPI.forEach((item) => {
    if (item.id === dataTeachers.id) {
      return;
    }
    // same city or same skills
    if (
      item.city === dataTeachers.city ||
      item.skills.some((skill) => teacherSkills.includes(skill.instrument))
    ) {
      suggestedTeachers.push(item);
    }
  });

  return (
    <div className="list__teachers ds-primary">
      {!data.loading && (
        <>
          <h3 className="h3">You may also want to check these teachers</h3>
          <Slider
            {...settings}
            slidesToShow={
              settings.slidesToShow > suggestedTeachers.length
                ? suggestedTeachers.length
                : settings.slidesToShow
            }
          >
            {suggestedTeachers.map((item) => (
              <article className="slide" key={item.id}>
                <CardTeacher
                  id={item.id}
                  onClick={handleClick(item)}
                  key={`teacher-${item.id}`}
                  image={_.get(item, "avatar", null) || defaultAvatar}
                  name={`${item.first_name} ${item.last_name}`}
                  position={item.city}
                  description={item.pickup_line}
                  skills={item.skills}
                  pricings={item.pricings}
                  // For Rating && Lesson Types
                  rating={item.rating}
                />
              </article>
            ))}
          </Slider>
        </>
      )}
    </div>
  );
};

export default ListTeachers;
