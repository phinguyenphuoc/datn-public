import React, { useState } from "react";
import {
  Info,
  Schedule,
  ModalInfoTeacher,
  ModalCancelLesson,
  InfoSeveralStudent,
  ModalPaymentMethodUpdated,
} from "../../../components/dashboard/parent/home";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import {
  ModalAssistance,
  ModalRescheduleLesson,
  ModalReportAProblem,
  ModalPasswordUpdated,
} from "../../../components/common";
import {
  getTeachers,
  postCardSave,
  cancelLesson,
  suspendLesson,
  getProgressReport
} from "../../../redux/actions/parent";
import { getStudentProfile } from "../../../redux/actions/student";
import { reportProblem } from "../../../redux/actions/reportProblem";
import { getAuth, setAuth } from "../../../utils/helpers";
import star from "../../../assets/images/modal-star.svg";
import { postHelp } from "../../../redux/actions/help";
import { openModalMessage } from "../../../redux/actions/modalMessage";

const problems = [
  "We agreed to reschedule",
  "We had technical problems",
  "Teacher didn’t meet my expectations",
  "Teacher was late",
  "Teacher was absent",
  "Other problem",
];

function Home(props) {
  const [openModalInfoTeacher, setOpenModalInfoTeacher] = useState(false);
  const [openModalAssistance, setOpenModalAssistance] = useState(false);
  const [openModalCancelLesson, setOpenModalCancelLesson] = useState(false);
  const [openModalReportAProblem, setOpenModalReportAProblem] = useState(false);
  const [dataTeachers, setDataTeachers] = useState({});
  const [openModalRescheduleLesson, setOpenModalRescheduleLesson] = useState(false);
  const [openModalPaymentMethodUpdated, setOpenModalPaymentMethodUpdated] = useState(false);
  const [openModalPasswordUpdated, setOpenModalPasswordUpdated] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const storeStudentProfile = useSelector((store) => store.student.students);
  const storeTeacherProfile = useSelector((store) => store.parent.teachers);
  const storeHelp = useSelector((store) => store.help);
  const storeProgressReports = useSelector((store) => store.parent.progressReports);

  React.useEffect(() => {
    getTeachers();
    getStudentProfile();
    // getProgressReport();
  }, []);

  const auth = getAuth();
  const isCaseBothSetToFalse =
    auth.user_payment_updated === false && auth.user_password_updated === false;
  const isPasswordUpdateSetToFalse = auth.user_password_updated === false;
  React.useEffect(() => {
    if (auth.user_payment_updated === false || isCaseBothSetToFalse) {
      setOpenModalPaymentMethodUpdated(true);
    } else if (
      auth.user_password_updated === false &&
      openModalPaymentMethodUpdated === false
    ) {
      setOpenModalPasswordUpdated(true);
    }
  }, [auth, isCaseBothSetToFalse, openModalPaymentMethodUpdated]);

  const handleModalInfoTeacher = () => {
    setOpenModalInfoTeacher(!openModalInfoTeacher);
  };

  const handleToggleModalAssistance = () => {
    setOpenModalAssistance(!openModalAssistance);
  };

  const handleToggleAndSetItemModalCancelLesson = (item = {}) => {
    setOpenModalCancelLesson(!openModalCancelLesson);
    setSelectedItem(item);
  };

  const handleModalRescheduleLesson = (e) => {
    e.preventDefault();
    setOpenModalRescheduleLesson(!openModalRescheduleLesson);
  };

  const handleToggleAndSetItemModalReportAProblem = (item = {}) => {
    setSelectedItem(item);
    setOpenModalReportAProblem(!openModalReportAProblem);
  };

  const handleClickTeachers = (data) => () => {
    setDataTeachers(data);
    setOpenModalInfoTeacher(true);
  };

  const handleCompletePaymentMethod = (dataCard) => {
    if (isSubmit === false) {
      postCardSave(dataCard, (data) => {
        setIsSubmit(true);
        auth.user_payment_updated = true;
        setAuth(auth);
      });
    }
  };
  const handleClickAccess = (e) => {
    e.preventDefault();
    setOpenModalPaymentMethodUpdated(false);
  };
  const history = useHistory();
  const handleSubmitPassWordUpdated = () => {
    history.push("/dashboard/student/profile/password");
  };

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

  const handleSubmitCancelLesson = (formData, form) => {
    console.log("form.reason", form.reason, formData)
    if (form.reason === "Cancel this lesson") {
      cancelLesson(selectedItem.id, () => {
        setOpenModalCancelLesson(false);
        openModalMessage({
          title: "Cancel lesson",
          body: <p>Your lesson has been canceled successfully.</p>,
        });
      });
    } else {
      suspendLesson(selectedItem.lesson.id, formData, () => {
        setOpenModalCancelLesson(false);
        openModalMessage({
          title: "Suspend lesson",
          body: <p>Your lesson has been suspended successfully.</p>,
        });
      });
    }
  };

  const handleSubmitReport = (formData) => {
    reportProblem(formData, () => {
      setOpenModalReportAProblem(false);
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
      {storeStudentProfile.data && storeStudentProfile.data.length >= 1 ? (
        <InfoSeveralStudent
          handleToggleModal={handleModalInfoTeacher}
          dataTeachers={storeTeacherProfile}
          handleClick={handleClickTeachers}
          dataProgressReports={storeProgressReports}
        />
      ) : (
          <Info
            dataTeachers={storeTeacherProfile}
            dataStudent={storeStudentProfile}
            handleClick={handleClickTeachers}
            dataProgressReports={storeProgressReports}
          />
        )}
      <Schedule
        handleToggleModalAssistance={handleToggleModalAssistance}
        handleToggleModalCancelLesson={handleToggleAndSetItemModalCancelLesson}
        handleToggleModalRescheduleLesson={handleModalRescheduleLesson}
        handleToggleModalReportAProblem={
          handleToggleAndSetItemModalReportAProblem
        }
        dataStudents={storeStudentProfile.data}
      />
      <ModalInfoTeacher
        isOpen={openModalInfoTeacher}
        handleToggle={handleModalInfoTeacher}
        dataTeachers={dataTeachers}
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
        handleSubmit={handleSubmitCancelLesson}
      />
      <ModalRescheduleLesson
        isOpen={openModalRescheduleLesson}
        handleToggle={handleModalRescheduleLesson}
        placeholder1="Tell your teacher why you need to reschedule this lesson..."
        placeholder2="Leave a message to your teacher (suggesting new slots for a make-up lesson)... "
      />
      <ModalReportAProblem
        isOpen={openModalReportAProblem}
        handleToggle={handleToggleAndSetItemModalReportAProblem}
        problems={problems}
        data={selectedItem}
        handleSubmit={handleSubmitReport}
      />
      <ModalPaymentMethodUpdated
        isOpen={openModalPaymentMethodUpdated}
        onComplete={handleCompletePaymentMethod}
        isPasswordUpdateSetToFalse={isPasswordUpdateSetToFalse}
        isSubmitCard={isSubmit}
        clickAccess={handleClickAccess}
      />
      <ModalPasswordUpdated
        isOpen={openModalPasswordUpdated}
        onSubmit={handleSubmitPassWordUpdated}
        content={
          <div className="content">
            <div className="content__item">
              <img src={star} alt="star" />
              <p>
                For security reasons, please make sure to update your password.{" "}
                <Link to="/dashboard/student/profile/password">
                  Go to Profile &gt; Password.
                </Link>
              </p>
            </div>
          </div>
        }
      />
    </>
  );
}

export default Home;
