import React from "react";
import { getTeachersAPI } from "../../redux/actions/teachers";
import { useSelector } from "react-redux";

function Teachers() {
  const storeTeachers = useSelector((store) => store.teachers);
  const allTeachers = storeTeachers.dataFromAPI;

  React.useEffect(() => {
    if (!Object.keys(allTeachers).length && !storeTeachers.loading) {
      getTeachersAPI(storeTeachers);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="about__teacher">
      <div className="about__teacher__inner white ">
        <div className="about__teacher__imgs--left">
          {allTeachers[0] && (
            <img src={allTeachers[0].avatar} alt="teacher avatar" />
          )}
          {allTeachers[1] && (
            <img src={allTeachers[1].avatar} alt="teacher avatar" />
          )}
          {allTeachers[2] && (
            <img src={allTeachers[2].avatar} alt="teacher avatar" />
          )}
          {allTeachers[3] && (
            <img src={allTeachers[3].avatar} alt="teacher avatar" />
          )}
          {allTeachers[4] && (
            <img src={allTeachers[4].avatar} alt="teacher avatar" />
          )}
        </div>

        <div className="about__teacher__inner__wrap">
          <div className="text__title">
            <span className="icon-note"></span>
            <span className="icon-note-double"></span>
            <h2 className="h2">Meet our Teachers</h2>
          </div>
          <p className="text--large">
            Our teachers are highly qualified and dedicated music
            teachers.
          </p>
          <br />
          <br />
          <p className="text--large">
            Their lessons combine fun, engagement and
            encouragement to make effective practice a regular habit.
          </p>
          <br />
          <br />
          <p className="text--large">
            If you are looking for beginner music lessons to fulfill your dreams of playing music, our
            instructors are ready to help you now!
          </p>
          <br />
          <br />
        </div>

        <div className="about__teacher__imgs--right">
          {allTeachers[5] && (
            <img src={allTeachers[6].avatar} alt="teacher avatar" />
          )}
          {allTeachers[6] && (
            <img src={allTeachers[7].avatar} alt="teacher avatar" />
          )}
          {allTeachers[7] && (
            <img src={allTeachers[8].avatar} alt="teacher avatar" />
          )}
          {allTeachers[8] && (
            <img src={allTeachers[9].avatar} alt="teacher avatar" />
          )}
          {allTeachers[9] && (
            <img src={allTeachers[10].avatar} alt="teacher avatar" />
          )}
        </div>
      </div>
    </section>
  );
}

export default Teachers;
