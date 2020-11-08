import React from "react";
import {
  Steps,
  Step1,
  Step2,
  Step3,
  ModalMessageBookLesson,
} from "../../../components/dashboard/teacher/bookALesson";
import moment from "moment";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  getBookingStudent,
  updateBooklesson,
  createLesson,
  getSchedules,
  //   getSetupBooking,
  createMakeupSchedule,
  //   resetInitBookings,
} from "../../../redux/actions/teacher";
import {
  getParam,
  convertTimeToNumber,
  roundCurrentTime
} from "../../../utils/helpers";

function BookALesson(props) {
  const lesson_id = getParam("lessonId");
  const schedule_id = getParam("scheduleId");
  const isCancelingLesson = lesson_id && schedule_id;

  const [step, setStep] = React.useState(1);
  const [student, setStudent] = React.useState({});
  const [errorDuration, setErrorDuration] = React.useState("");
  const [errorTime, setErrorTime] = React.useState("");
  const [errorTrial, setErrorTrial] = React.useState("");
  const [errorDate, setErrorDate] = React.useState("");
  const [error, setError] = React.useState({});
  const [form, setForm] = React.useState({
    duration: "",
    checkboxOnetime: lesson_id ? true : false,
    checkboxTrial: "",
  });
  const [
    openModalMessageBookLesson,
    setOpenModalMessageBookLesson,
  ] = React.useState(false);
  console.log("form", form)
  const storeBookingStudents = useSelector(
    (store) => store.teacher.bookingStudents
  );
  const storeBookLesson = useSelector((store) => store.teacher.bookLesson);
  const storeSetupBooking = useSelector((store) => store.teacher.setupBooking);
  const storeCreateLesson = useSelector((store) => store.teacher.createLesson);
  const storeCreateMakeupSchedule = useSelector(
    (store) => store.teacher.createMakeupSchedule
  );
  const isLoading = storeBookingStudents.loading || storeSetupBooking.loading;
  const isLoadingConfirmBooklesson =
    storeCreateLesson.loading || storeCreateMakeupSchedule.loading;

  React.useEffect(() => {
    getBookingStudent();
  }, []);

  React.useEffect(() => {
    if (lesson_id) {
      // getSetupBooking(lesson_id);
    }
  }, [lesson_id]);

  React.useEffect(() => {
    if (storeBookLesson.date) {
      getSchedules(moment(storeBookLesson.date).format("YYYY-MM-DD"));
    }
  }, [storeBookLesson.date]);

  let OPTIONS_STUDENT = [];
  if (lesson_id && storeSetupBooking.data && storeSetupBooking.data.student) {
    OPTIONS_STUDENT = [
      {
        value: storeSetupBooking.data.student.id,
        label: `${storeSetupBooking.data.student.first_name} ${storeSetupBooking.data.student.last_name}`,
      },
    ];
  } else {
    OPTIONS_STUDENT = storeBookingStudents.data.map((item) => {
      return {
        value: item.id,
        label: `${item.student.first_name} ${item.student.last_name}`,
      };
    });
  }

  React.useEffect(() => {
    if (
      OPTIONS_STUDENT.length === 1 &&
      student.value !== OPTIONS_STUDENT[0].value
    ) {
      setStudent(OPTIONS_STUDENT[0]);
    }
    // eslint-disable-next-line
  }, [OPTIONS_STUDENT]);
  const history = useHistory();

  React.useEffect(() => {
    if (openModalMessageBookLesson && OPTIONS_STUDENT.length === 1) {
      setTimeout(() => {
        setOpenModalMessageBookLesson(false);
        history.push("/dashboard/teacher");
      }, 3000);
    }
    // eslint-disable-next-line
  }, [openModalMessageBookLesson]);

  const handleSubmitStep1 = (event) => {
    event.preventDefault();
    const errorState = validate();
    if (student.value) {
      setStep(2);
    } else if (Object.keys(errorState).length > 0) {
      return setError(errorState);
    }
  };

  const validate = () => {
    const errorState = {};
    // check validate
    if (!student.value || student.length === 0) {
      errorState.student = "Please choose a student ";
    }

    return errorState;
  };

  const handleChangeStudent = (value) => {
    setStudent(value);
    if (value.label !== student.label) {
      setForm({
        duration: "",
        checkboxOnetime: false,
      });
      updateBooklesson({ date: "", time: roundCurrentTime() });
      setError({});
      setErrorDuration("");
      setErrorTrial("");
      setErrorTime("");
      setErrorDate("");
    }
  };

  const handleFocus = () => {
    setError({
      ...error,
      student: "",
    });
  };

  const handleStep1 = () => {
    setStep(1);
  };

  const handleCheckbox = async (event) => {
    await setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
    setErrorDuration("");
    setErrorTrial("");
  };

  const handleCheckboxOnetime = (event) => {
    if (lesson_id) {
      setForm({
        ...form,
        checkboxOnetime: true,
      });
    } else
      setForm({
        ...form,
        [event.target.name]: event.target.checked,
      });
    setErrorTrial("");
  };
  const handleClickDate = (value) => () => {
    if (moment(value).isAfter(moment(new Date()).subtract(1, "days"))) {
      updateBooklesson({ date: value });
    }
    setErrorDate("");
    setErrorTime("");
  };
  const storeSchedules = useSelector((store) => store.teacher.schedules);
  let dataSchedulesFiltered = [];
  if (storeBookLesson.date) {
    // Note: format date on server is YYYY-MM-DD
    const dateScheduleSelectedFormat = moment(storeBookLesson.date).format(
      "YYYY-MM-DD"
    );
    dataSchedulesFiltered = storeSchedules.data.filter(
      (item) =>
        item.date === dateScheduleSelectedFormat &&
        item.type === "booked" &&
        item.lesson.student
    );
  }

  const studentSelectedFilter = storeBookingStudents.data.filter(
    (item) => item.id === student.value
  );
  const studentSelected = studentSelectedFilter.length
    ? studentSelectedFilter[0]
    : {};

  const onTimeChange = (value) => {
    updateBooklesson({ time: value });
    setErrorTime("");
  };

  const handleSubmitStep2 = (event) => {
    event.preventDefault();
    let isValid = true;
    if (!form.duration) {
      isValid = false;
      setErrorDuration("Please select a duration");
    }
    if (!storeBookLesson.date) {
      isValid = false;
      setErrorDate("Please select date");
    }
    if (
      !form.checkboxTrial &&
      form.checkboxOnetime === true &&
      studentSelected.trial_available
    ) {
      isValid = false;
      setErrorTrial("Please select trial lesson option");
    }
    if (
      moment(storeBookLesson.date).format("YYYY-MM-DD") ===
      moment(storeBookLesson.time).format("YYYY-MM-DD") &&
      moment(storeBookLesson.time).isBefore(moment(new Date()))
    ) {
      isValid = false;
      setErrorTime("Time in the past not allowed");
    }
    dataSchedulesFiltered.forEach((item) => {
      if (item.start_hour && item.end_hour) {
        const startHourNumber = convertTimeToNumber(item.start_hour);
        const endHourNumber = convertTimeToNumber(item.end_hour);
        const currentTimeNumber = convertTimeToNumber(
          moment(storeBookLesson.time).format("HH:mm")
        );
        const durationNumber = convertTimeToNumber(
          moment(storeBookLesson.time)
            .add(parseInt(form.duration || 5), "minutes")
            .format("HH:mm")
        );
        if (
          (startHourNumber <= currentTimeNumber &&
            currentTimeNumber < endHourNumber) ||
          (startHourNumber < durationNumber && durationNumber <= endHourNumber)
        ) {
          setErrorTime("Time slot not available");
          isValid = false;
        }
      }
    });
    if (isValid) {
      setStep(3);
    }
  };

  const minute = parseInt(form.duration);
  const timeEnd = moment(storeBookLesson.time)
    .add(minute, "minutes")
    .format("hh:mm A");
  const timeLesson = `${moment(storeBookLesson.time).format(
    "hh:mm"
  )} - ${timeEnd}`;

  const handleNextBooking = () => {
    setStep(1);
    setOpenModalMessageBookLesson(!openModalMessageBookLesson);
    // getBookingStudent(booking_hash_id);
  };

  const handleToggleMessage = () => {
    setOpenModalMessageBookLesson(!openModalMessageBookLesson);
    history.push("/dashboard/teacher");
  };
  const handleClickEdit1 = () => {
    setStep(1);
  };

  const handleClickEdit2 = () => {
    setStep(2);
  };

  const handleConfirm = () => {
    let formData = {};
    if (isCancelingLesson) {
      formData = {
        lesson: {
          instrument: storeSetupBooking.data.instrument,
          date: moment(storeBookLesson.date).format("YYYY-MM-DD"),
          duration: form.duration,
        },
        booking: {
          id: storeSetupBooking.data.id,
        },
        schedule: {
          start_hour: moment(storeBookLesson.time).format("HH:mm"),
        },
      };
    } else {
      console.log(studentSelected)
      formData = {
        lesson: {
          instrument: studentSelected.instrument,
          start_date: moment(storeBookLesson.date).format("YYYY-MM-DD"),
          end_date: moment(storeBookLesson.date).add(1, "years").format("YYYY-MM-DD"),
          duration: form.duration,
          frequency: form.checkboxOnetime ? "one_time" : "weekly",
          trial: form.checkboxTrial === "true" ? true : false,
        },
        booking: {
          id: studentSelected.id,
        },
        schedule: {
          start_hour: moment(storeBookLesson.time).format("HH:mm"),
          end_hour: moment(storeBookLesson.time)
            .add(minute, "minutes")
            .format("HH:mm")
        },
      };
      if (!studentSelected.trial_available || !form.checkboxOnetime) {
        delete formData.lesson.trial;
      }
    }

    const handleAfterCallingAPISuccess = () => {
      // resetInitBookings();
      setOpenModalMessageBookLesson(!openModalMessageBookLesson);
      // Reset data
      setStudent({});
      setForm({
        duration: "",
        checkboxOnetime: false,
      });
      updateBooklesson({
        date: "",
        time: roundCurrentTime(),
      });
      setError({});
      setErrorDuration("");
      setErrorTrial("");
      setErrorTime("");
      setErrorDate("");
    };

    if (isCancelingLesson) {
      createMakeupSchedule(schedule_id, formData, () => {
        handleAfterCallingAPISuccess();
      });
    } else {
      createLesson(formData, () => {
        handleAfterCallingAPISuccess();
      });
    }
  };

  return (
    <>
      {!openModalMessageBookLesson && (
        <Steps
          step={step}
          handleStep1={handleStep1}
          handleStep2={handleSubmitStep1}
          handleStep3={handleSubmitStep2}
          student={student}
          storeBookLesson={storeBookLesson}
        />
      )}
      {step === 1 && (
        <Step1
          handleNext={handleSubmitStep1}
          onChangeStudent={handleChangeStudent}
          student={student}
          handleFocus={handleFocus}
          OPTIONS_STUDENT={OPTIONS_STUDENT}
          studentSelected={studentSelected}
          isLoading={isLoading}
          error={error}
          dataSetupBooking={storeSetupBooking.data}
        />
      )}
      {step === 2 && (
        <Step2
          handleNext={handleSubmitStep2}
          handleBack={handleStep1}
          studentSelected={studentSelected}
          storeBookLesson={storeBookLesson}
          handleCheckbox={handleCheckbox}
          handleCheckboxOnetime={handleCheckboxOnetime}
          handleClickDate={handleClickDate}
          onTimeChange={onTimeChange}
          form={form}
          error={errorDuration}
          errorTime={errorTime}
          errorDate={errorDate}
          errorTrial={errorTrial}
          dataSchedulesFiltered={dataSchedulesFiltered}
          dataSetupBooking={storeSetupBooking.data}
        />
      )}
      {(step === 3 && !openModalMessageBookLesson) && (
        <Step3
          storeBookLesson={storeBookLesson}
          studentSelected={studentSelected}
          timeLesson={timeLesson}
          handleClickEdit2={handleClickEdit2}
          handleClickEdit1={handleClickEdit1}
          handleConfirm={handleConfirm}
          isOnetimeLesson={form.checkboxOnetime}
          isTrialLesson={form.checkboxTrial}
          dataSetupBooking={storeSetupBooking.data}
          isSubmitting={isLoadingConfirmBooklesson}
        />
      )}
      <ModalMessageBookLesson
        isOpen={openModalMessageBookLesson}
        handleNextBooking={handleNextBooking}
        OPTIONS_STUDENT={OPTIONS_STUDENT}
        handleToggle={handleToggleMessage}
      />
    </>
  );
}

export default BookALesson;
