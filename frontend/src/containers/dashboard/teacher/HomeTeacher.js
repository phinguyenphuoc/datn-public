import React from "react";
import {
  Info,
  Schedule,
  ModalInfoStudent,
  ModalCancelLesson,
} from "../../../components/dashboard/teacher/home";
import { useSelector } from "react-redux";
import {
  ModalAssistance,
  ModalRescheduleLesson,
  ModalReportAProblem,
  ModalPasswordUpdated,
} from "../../../components/common";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import {
  getStudents,
  cancelLesson,
  suspendLesson,
  getEarningCurrentDetails,
  getBookingStudent
} from "../../../redux/actions/teacher";
import { reportProblem } from "../../../redux/actions/reportProblem";
import { getAuth } from "../../../utils/helpers";
import star from "../../../assets/images/modal-star.svg";
import { postHelp } from "../../../redux/actions/help";
import { openModalMessage } from "../../../redux/actions/modalMessage";

function HomeTeacher(props) {
  const [openModalInfoStudent, setOpenModalInfoStudent] = React.useState(false);
  const [openModalAssistance, setOpenModalAssistance] = React.useState(false);
  const [openModalCancelLesson, setOpenModalCancelLesson] = React.useState(
    false
  );
  const [
    openModalRescheduleLesson,
    setOpenModalRescheduleLesson,
  ] = React.useState(false);
  const [openModalReportAProblem, setopenModalReportAProblem] = React.useState(
    false
  );
  // const [
  //   openModalPasswordUpdated,
  //   setOpenModalPasswordUpdated,
  // ] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState(false);

  const [dataStudents, setDataStudents] = React.useState({});
  const dataTeacher = useSelector((store) => store.teacher.profile.data);
  const storeStudents = useSelector((store) => store.teacher.students);
  const storeHelp = useSelector((store) => store.help);
  const storeEarningCurrentDetails = useSelector(
    (store) => store.teacher.earningCurrentDetails
  );

  const storeBookingStudents = useSelector((store) => store.teacher.bookingStudents);
  console.log({ storeBookingStudents })

  React.useEffect(() => {
    if (
      !Object.keys(storeEarningCurrentDetails.data).length &&
      !storeEarningCurrentDetails.loading
    ) {
      getEarningCurrentDetails();
    }
  }, [storeEarningCurrentDetails]);

  React.useEffect(() => {
    getStudents();
    getBookingStudent();
  }, []);

  React.useEffect(() => {
    if (storeBookingStudents.data.length) {
      openModalMessage({
        title: "New booking from students",
        body: (
          <div>
            <p>Welcome back, you are having {storeBookingStudents.data.length} booking pending</p>
            <p>Click button "new lesson" for more details</p>
          </div>
        ),
        timeout: 10000
      });
    }
  }, [storeBookingStudents])


  const handleModalInfoStudent = () => {
    setOpenModalInfoStudent(!openModalInfoStudent);
  };

  const handleClickStudent = (data) => () => {
    setDataStudents(data);
    setOpenModalInfoStudent(true);
  };

  const handleToggleModalAssistance = () => {
    setOpenModalAssistance(!openModalAssistance);
  };

  const handleToggleAndSetItemModalCancelLesson = (item = {}) => {
    setSelectedItem(item);
    setOpenModalCancelLesson(!openModalCancelLesson);
  };

  const handleModalRescheduleLesson = (e) => {
    e.preventDefault();
    setOpenModalRescheduleLesson(!openModalRescheduleLesson);
  };

  const handleToggleAndSetItemModalReportAProblem = (item = {}) => {
    setSelectedItem(item);
    setopenModalReportAProblem(!openModalReportAProblem);
  };

  const problems = [
    "We agreed to reschedule",
    "We had technical problems",
    "Student was absent",
    "Other problem",
  ];

  const handleHelp = (formData) => {
    postHelp(formData, () => {
      handleToggleModalAssistance();
      openModalMessage({
        title: "Thank you!",
        body: (
          <div>
            <p>Your message has been sent</p>
            <p>We will get back to you shortly!</p>
          </div>
        ),
      });
    });
  };

  const handleCancel = (formData) => {
    cancelLesson(selectedItem.lesson.id, selectedItem.id, formData, () => {
      setOpenModalCancelLesson(false);
      let message = "Your lesson has been canceled successfully.";
      if (formData.cancel.recurrence === "many") {
        message = "Your lessons have been canceled successfully.";
      }
      openModalMessage({
        title: "Cancel lesson",
        body: <p>{message}</p>,
      });
    });
  };
  const handleSuspend = (formData) => {
    suspendLesson(selectedItem.lesson.id, formData, () => {
      setOpenModalCancelLesson(false);
      openModalMessage({
        title: "Suspend lesson",
        body: <p>Your lesson has been suspended successfully.</p>,
      });
    });
  };
  const handleSubmitReport = (formData) => {
    reportProblem(formData, () => {
      setopenModalReportAProblem(false);
      openModalMessage({
        title: "Report a problem",
        body: (
          <p>
            Thank you, we have received your request. We will get back to you
            within 24H.
          </p>
        ),
        timeout: 5000,
      });
    });
  };
  return (
    <>
      <Info
        handleClick={handleClickStudent}
        dataStudents={storeStudents}
        dataTeacher={dataTeacher}
        storeEarningCurrentDetails={storeEarningCurrentDetails}
      />
      <Schedule
        handleToggleModalAssistance={handleToggleModalAssistance}
        handleToggleModalCancelLesson={handleToggleAndSetItemModalCancelLesson}
        handleToggleModalRescheduleLesson={handleModalRescheduleLesson}
        handleToggleModalReportAProblem={
          handleToggleAndSetItemModalReportAProblem
        }
      />
      <ModalInfoStudent
        isOpen={openModalInfoStudent}
        handleToggle={handleModalInfoStudent}
        data={dataStudents}
      />
      <ModalAssistance
        isOpen={openModalAssistance}
        handleToggle={handleToggleModalAssistance}
        onSubmit={handleHelp}
        loading={storeHelp.loading}
      />
      <ModalCancelLesson
        isOpen={openModalCancelLesson}
        handleToggle={handleToggleAndSetItemModalCancelLesson}
        data={selectedItem}
        handleCancel={handleCancel}
        handleSuspend={handleSuspend}
      />
      <ModalRescheduleLesson
        isOpen={openModalRescheduleLesson}
        handleToggle={handleModalRescheduleLesson}
        placeholder1="Tell your student why you need to reschedule this lesson..."
        placeholder2="Leave a message to your student (suggesting new slots for a make-up lesson)... "
      />
      <ModalReportAProblem
        isOpen={openModalReportAProblem}
        handleToggle={handleToggleAndSetItemModalReportAProblem}
        problems={problems}
        data={selectedItem}
        handleSubmit={handleSubmitReport}
      />
    </>
  );
}

export default HomeTeacher;
