import React from "react";
import { useSelector } from "react-redux";
import { getTeachersAPI, setNewDataTeachers } from "../redux/actions/teachers";
import { getInstruments } from "../redux/actions/instruments";
import { openModalMessage } from "../redux/actions/modalMessage";
import { registerStudent } from "../redux/actions/student";
import { useParams, useHistory } from "react-router-dom";
import { TeacherInfo, ListTeachers, ModalContact } from "../components/teacher";

function Teacher() {
  const [openModalTeacher, setOpenModalTeacher] = React.useState(false);
  const storeTeachers = useSelector((store) => store.teachers);
  const storeInstruments = useSelector(
    (store) => store.instruments.data.instruments
  );
  const isLoadingTeacher = storeTeachers.loading;
  React.useEffect(() => {
    if (
      !Object.keys(storeTeachers.dataFromAPI).length &&
      !storeTeachers.loading
    ) {
      getTeachersAPI(storeTeachers);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (!storeInstruments) {
      getInstruments();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const teacherTag = useParams().teacherTag;

  const teacherSelectedFilter =
    storeTeachers.dataFromAPI.filter(
      (item) => item.tag.toString() === teacherTag.toString()
    )[0] || {};

  const history = useHistory();

  React.useEffect(() => {
    if (!Object.keys(teacherSelectedFilter).length && storeTeachers.apiCalled) {
      history.push("/teachers");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teacherSelectedFilter, storeTeachers]);

  const handleClickOnCard = (data) => () => {
    history.push(`/teachers/${data.tag}`);
  };

  const handleToggleModalTeacher = () => {
    setOpenModalTeacher(!openModalTeacher);
  };

  const handleRegisterStudent = (formData) => {
    registerStudent(formData, () => {
      setOpenModalTeacher(false);
      openModalMessage({
        title: "Thank you",
        body: (
          <p>
            The request has been sent. The teacher will contact you shortly.
          </p>
        ),
      });
      setNewDataTeachers(teacherSelectedFilter);
      history.push("/teachers");
    });
  };

  return (
    <>
      <TeacherInfo
        data={teacherSelectedFilter}
        isLoadingTeacher={isLoadingTeacher}
        handleClickButtonContact={handleToggleModalTeacher}
      />
      <ListTeachers
        data={storeTeachers}
        dataTeachers={teacherSelectedFilter}
        handleClick={handleClickOnCard}
      />
      <ModalContact
        data={teacherSelectedFilter}
        isOpen={openModalTeacher}
        handleToggle={handleToggleModalTeacher}
        handleSubmit={handleRegisterStudent}
        isLoading={storeTeachers.loading}
      />
    </>
  );
}

export default Teacher;
