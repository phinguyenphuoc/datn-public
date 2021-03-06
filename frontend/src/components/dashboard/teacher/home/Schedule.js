import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from "moment";
import { UncontrolledPopover, PopoverBody } from "reactstrap";
import lesson from "../../../../assets/images/book-lesson.svg";
import avatarDefault from "../../../../assets/images/avatar-picture.svg";
import { OPTIONS_MONTHS, OPTIONS_YEARS } from "../../../../utils/constants";
import ClearIcon from "@material-ui/icons/Clear";
import {
  DatePicker,
  SingleSelectFormat,
  Loading,
  NoLesson,
  Status,
} from "../../../common";
import { EllipsisV } from "../../../common/icons";
import { formatTime1, formatTime2 } from "../../../../utils/helpers";
import {
  getInitBookings,
  updateDateSchedule,
  updateDateScheduleSelected,
} from "../../../../redux/actions/teacher";
import { getSchedules } from "../../../../redux/actions/teacher";
import camera from "../../../../assets/images/cameraZoom.svg";
import camera_gray from "../../../../assets/images/cameraZoomGray.svg";

const StyledSchedule = styled.section`
  font-size: 14px;
  margin: 0 0 auto;
  .schedule__inner {
    display: flex;
    justify-content: space-between;
    margin-bottom: 5%;
  }
  .schedule-item {
    background: #ffffff;
    box-shadow: 0px 5px 25px rgba(98, 84, 232, 0.2);
    border-radius: 4px;
    padding: 20px 30px;
  }
  .lesson-schedule {
    width: 39%;
    height: 100%;
    &__header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      button {
        background: #6254e8;
        border-radius: 30px;
        border: none;
        color: #fff;
        font-size: 12px;
        padding: 5px 5px 5px 22px;
        display: flex;
        align-items: center;
        max-width: 162px;
        transition: 0.3s ease;
        &:hover {
          transform: translateY(-3px);
          box-shadow: 0 4px 8px 0 #2d20a7;
        }
        span {
          background: #3e32b6;
          border-radius: 100%;
          padding: 7px 8px;
          display: inline-flex;
          margin-left: 10px;
        }
      }
    }
    &__body {
      max-width: 600px;
      margin: 0 auto 20px;
      border-bottom: 1px solid #f2f4fd;
      position: relative;
      .today-date {
        position: absolute;
        left: 0;
        font-size: 18px;
        font-weight: 500;
        span {
          font-weight: 400;
        }
      }
    }
    &__footer {
      display: flex;
      justify-content: space-between;
      margin-top: 15px;
      flex-wrap: wrap;
      > div {
        display: flex;
        align-items: center;
        margin-bottom: 5px;
      }
      .--center {
        margin-right: 10px;
      }
      span {
        width: 16px;
        height: 16px;
        border-radius: 2px;
        display: block;
        margin-right: 10px;
      }
      .green {
        background: #54c052;
      }
      .orange {
        background: #f6732f;
      }
      .red {
        background: #dc3545;
      }
      .empty {
        width: 100px;
      }
    }
    @media only screen and (max-width: 1130px) {
      &__body {
        margin: 0 auto 10px;
      }
    }
    @media only screen and (max-width: 1080px) {
      &__footer {
        font-size: 12px;
      }
    }
    @media only screen and (max-width: 350px) {
      &__body {
        margin: 0 auto;
      }
    }
  }
  .class-schedule {
    width: 59%;
    padding: 20px 24px;
    height: 100%;
    &__header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 5px;
      button {
        color: #f6732f;
        font-size: 12px;
        border: none;
        background: transparent;
        p {
          border-bottom: 1px solid;
        }
        &:hover p {
          color: #08135a;
        }
      }
    }
    &__date {
      display: flex;
      width: 100%;
      max-width: 550px;
      margin-bottom: 20px;
      > div {
        width: calc(33.33% - 11px);
      }
      .--border {
        width: 1px;
        height: 30px;
        background: hsl(0, 0%, 80%);
        display: block;
        margin: 3px 10px 0 0;
      }
    }
    &__body {
      height: 370px;
      overflow: auto;
      .class-schedule__item {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
      }
      .time-and-information {
        display: flex;
        justify-content: space-between;
        width: 87%;
      }
      .time {
        width: 14%;
        background: #f2f4fd;
        border-radius: 4px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 5px;
        text-shadow: 0px 0px #082487;
        p {
          margin: 0;
        }
        .day {
          font-size: 18px;
          margin-bottom: 0;
          text-transform: uppercase;
        }
        .month {
          font-size: 10px;
          margin: -8px 0 0;
          span {
            font-size: 19px;
            margin: 0 0 0 4px;
            position: relative;
            bottom: -1px;
            text-shadow: 0px 0px #082487;
          }
        }
      }
      .information {
        background: #f2f4fd;
        width: 84%;
        display: flex;
        justify-content: space-between;
        padding: 8px;
        border-radius: 4px;
        div:first-child {
          display: flex;
          align-items: center;
          img {
            max-width: 48px;
            max-height: 48px;
            border-radius: 100%;
          }
        }
        .camera_and_dot {
          display: flex;
          justify-content: center;
          align-items: center;
          img {
            width: 40px;
            height: 40px;
            transition: 0.3s ease;
            &:hover {
              transform: scale(1.2);
            }
          }
        }
        .dot {
          display: flex;
          cursor: pointer;
          padding: 10px;
          align-items: center;
          color: #b5beec;
          &:hover {
            color: #f6732f;
          }
        }
        &__item {
          text-align: left;
          margin-left: 10px;
          p {
            font-size: 14px;
            margin-bottom: 0px;
            font-weight: 600;
            text-transform: capitalize;
            line-height: 18px;
            margin: 6px 0 0;
          }
          .--hour {
            display: flex;
            align-items: center;
            h4 {
              font-size: 14px;
              margin: 0;
            }
            span {
              margin: 0px 4px 6px;
              line-height: 20px;
            }
            p {
              font-weight: 400;
              margin: 0;
            }
          }
        }
      }
    }
  }
  @media only screen and (max-width: 1000px) {
    .schedule-item {
      width: 49%;
    }
    .class-schedule__date {
      display: block;
      > div {
        width: 50%;
        margin-bottom: 10px;
      }
      .--border {
        display: none;
      }
    }
    .class-schedule__item {
      flex-direction: column;
    }
    .class-schedule__body {
      .time-and-information {
        width: 100%;
      }
      .information {
        width: 86%;
      }
      .time {
        width: 16%;
        > div {
          border-right: 2px solid #e0e3ec;
        }
        .day {
          font-size: 14px;
        }
        .month {
          font-size: 9px;
        }
      }
      .information__item {
        p,
        .--hour h4 {
          font-size: 12px;
          line-height: 16px;
        }
      }
    }
  }
  @media only screen and (max-width: 800px) {
    .schedule-item {
      padding: 20px 15px;
    }
  }
  @media only screen and (max-width: 750px) {
    .schedule__inner {
      display: block;
    }
    .schedule-item {
      width: 100%;
      margin-bottom: 30px;
    }
  }
  @media only screen and (max-width: 500px) {
    .class-schedule__date {
      > div {
        width: 100%;
        max-width: 170px;
      }
      .--border {
        display: none;
      }
    }
  }
  @media only screen and (max-width: 435px) {
    .class-schedule__body {
      .information {
        div:first-child img {
          max-width: 40px;
          max-height: 40px;
        }
        .dot {
          padding: 6px;
        }
        .camera_and_dot img {
          width: 30px;
          height: 30px;
        }
      }
      .time {
        width: 20%;
        .day {
          font-size: 12px;
        }
      }
      .information__item {
        .--hour {
          h4,
          p {
            font-size: 10px;
          }
        }
      }
    }
  }
  @media only screen and (max-width: 400px) {
    .class-schedule,
    .lesson-schedule {
      padding: 20px 10px;
    }
    .lesson-schedule__header {
      flex-direction: column;
      margin-bottom: 20px;
      button {
        margin: 0 auto;
      }
    }
    .lesson-schedule__body {
      .today-date {
        left: inherit;
        right: 2px;
        top: -20px;
        font-size: 16px;
      }
    }
    .lesson-schedule__footer {
      font-size: 9px;
    }
  }
  .bt_date {
    background: #dce0f6;
    border-radius: 16px;
    border: none;
    padding: 6px 8px 6px 20px;
    color: #6254e8;
    font-weight: 500;
    align-items: center;
    display: flex;
    margin-bottom: 15px;
    cursor: default;
    svg {
      color: #b2b0b0;
      font-size: 17px;
      margin-left: 10px;
      cursor: pointer;
      transition: 0.3s ease;
      &:hover {
        transform: scale(1.4);
        color: #686161;
      }
    }
  }
  @media only screen and (max-width: 400px) {
    .bt_date {
      font-size: 12px;
    }
  }
  .--list-lessons {
    height: 450px;
    .list-lessons__header {
      display: flex;
      padding: 10px 0;
      p {
        margin: 0;
      }
      span {
        background: hsl(0, 0%, 80%);
        width: calc(100% - 160px);
        height: 2px;
        margin: auto 0px auto 20px;
      }
    }
    .past-lesson__header {
      span {
        width: calc(100% - 115px);
      }
    }
    .past-lesson {
      opacity: 50%;
    }
    @media only screen and (max-width: 1000px) {
      height: 506px;
    }
    @media only screen and (max-width: 880px) {
      height: 545px;
    }
    @media only screen and (max-width: 450px) {
      .list-lessons__header {
        p {
          font-size: 12px;
        }
        span {
          width: calc(100% - 140px);
        }
      }
      .past-lesson__header span {
        width: calc(100% - 102px);
      }
    }
  }
  .sticky {
    position: sticky;
    top: -10px;
    z-index: 222;
    background: #fff;
  }
`;

function Schedule({
  handleToggleModalAssistance,
  handleToggleModalCancelLesson,
  handleToggleModalRescheduleLesson,
  handleToggleModalReportAProblem,
}) {
  const dataSchedules = useSelector((store) => store.teacher.schedules);
  const storeDateSchedule = useSelector((store) => store.teacher.dateSchedule);
  const storeDateScheduleSelected = useSelector(
    (store) => store.teacher.dateScheduleSelected
  );
  const storeStudents = useSelector((store) => store.teacher.students);
  const storeInitBookings = useSelector((store) => store.teacher.initBookings);
  const formatMonth = moment(storeDateSchedule).format("MMMM");
  const formatYear = moment(storeDateSchedule).format("YYYY");

  const [openId, setOpenId] = React.useState("");
  const [student, setStudent] = React.useState(null);

  const [newLessonLink, setnewLessonLink] = React.useState("");

  const optionsStudents = storeStudents.data.map((item) => ({
    value: item.id,
    label: `${item.first_name} ${item.last_name}`,
  }));

  const OPTIONT_STUDENTS = [{ value: "", label: "All" }, ...optionsStudents];

  const getDataDates = (type) => {
    if (!dataSchedules.data) return [];
    return dataSchedules.data.reduce((dates, item) => {
      if (item.type === type) {
        if (item.lesson.student) {
          dates.push(item.date);
        }
      }
      return dates;
    }, []);
  };

  const dateBooked = getDataDates("booked");
  const dateRescheduled = getDataDates("rescheduled");
  const dateCancelled = getDataDates("cancelled");
  React.useEffect(() => {
    getSchedules(moment(storeDateSchedule).format("YYYY-MM"));
  }, [storeDateSchedule]);

  React.useEffect(() => {
    if (
      (!storeInitBookings.called && !storeInitBookings.loading) ||
      (storeInitBookings.error &&
        storeInitBookings.error.status === "BAD_TOKEN")
    ) {
      // getInitBookings();
    } else {
      if (storeInitBookings.data.length) {
        setnewLessonLink(`?booking=${storeInitBookings.data}`);
      }
    }
  }, [storeInitBookings]);

  const handleChangeDateOnPicker = (value) => {
    if (
      moment(value).format("YYYY-MM") !==
      moment(storeDateSchedule).format("YYYY-MM")
    ) {
      updateDateSchedule(value);
    }
  };

  const handleClickDate = (value) => () => {
    updateDateScheduleSelected(value);
  };

  const handleChangeMonth = ({ value }) => {
    updateDateSchedule(moment(storeDateSchedule).month(value));
  };

  const handleChangeYear = ({ value }) => {
    updateDateSchedule(moment(storeDateSchedule).year(value));
  };

  const handleChangeStudent = (value) => {
    setStudent(value);
  };

  const handleRemoveFilterDate = () => {
    updateDateScheduleSelected(null);
  };

  let dataSchedulesFiltered = dataSchedules.data;
  const isFilterStudent = student && student.value;
  if (storeDateScheduleSelected) {
    // Note: format date on server is YYYY-MM-DD
    const dateScheduleSelectedFormat = moment(storeDateScheduleSelected).format(
      "YYYY-MM-DD"
    );
    dataSchedulesFiltered = dataSchedulesFiltered.filter(
      (item) => item.date === dateScheduleSelectedFormat
    );
  } else if (isFilterStudent) {
    dataSchedulesFiltered = dataSchedules.data.filter(
      (item) =>
        item.lesson.student.id &&
        item.lesson.student.id.toString() === student.value.toString()
    );
  }
  const upcomingLesson = [];
  const pastLesson = [];
  const todayDate = moment();

  dataSchedulesFiltered.filter((item) => {
    if (item.lesson.student) {
      const itemDateTime = moment(`${item.date} ${item.end_hour}`);
      if (itemDateTime > todayDate) {
        upcomingLesson.push(item);
      } else {
        pastLesson.push(item);
      }
    }
    return false;
  });

  const currentMonth = moment(new Date()).format("MM");

  const scheduleItem = (item, isZoomMeeting, isCurrentMonth) => (
    <div key={`${item.id}`}>
      <div className="class-schedule__item">
        <Status type={item.type} />
        <div className="time-and-information">
          <div className="time">
            <div>
              <p className="day">{`${moment(item.date).format("ddd")}.`}</p>
              <p className="month">
                {moment(item.date).format("MMM,")}
                <span>{moment(item.date).format("D")}</span>
              </p>
            </div>
          </div>
          <div className="information">
            <div>
              <img src={item.lesson.student.avatar || avatarDefault} alt="" />
              <div className="information__item">
                <p>{`${item.lesson.student.first_name} ${item.lesson.student.last_name}`}</p>
                <div className="--hour">
                  <h4>
                    {formatTime1(item.start_hour)}
                    {" - "}
                    {formatTime2(item.end_hour)}
                  </h4>
                  <span>.</span> <p>{`${item.lesson.instrument} lesson`}</p>
                </div>
              </div>
            </div>
            <div className="camera_and_dot">
              {isZoomMeeting && isCurrentMonth && (
                <a
                  href={item.zoom_meeting.join_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={camera} alt="camera" />
                </a>
              )}
              {isZoomMeeting && !isCurrentMonth && (
                <img src={camera_gray} alt="camera" />
              )}
              <div
                className="dot"
                id={`Popover-${item.id}`}
                onClick={() => setOpenId(item.id)}
              >
                <EllipsisV />
              </div>
            </div>
          </div>
        </div>
      </div>
      <UncontrolledPopover
        isOpen={openId === item.id}
        toggle={() => setOpenId("")}
        placement="bottom-end"
        target={`Popover-${item.id}`}
        trigger="legacy"
        className="popoverLesson"
      >
        {moment(`${item.date} ${item.start_hour}`) > moment() &&
          item.type === "booked" && (
            <PopoverBody
              onClick={() => {
                setOpenId("");
                handleToggleModalCancelLesson(item);
              }}
            >
              Cancel / reschedule lesson
            </PopoverBody>
          )}
        <PopoverBody
          onClick={() => {
            handleToggleModalReportAProblem(item);
            setOpenId("");
          }}
        >
          Report a problem
        </PopoverBody>
      </UncontrolledPopover>
    </div>
  );

  return (
    <StyledSchedule>
      <div className="container">
        <div className="schedule__inner">
          <div className="lesson-schedule schedule-item">
            <div className="lesson-schedule__header">
              <p className="fw-600">Lesson schedule</p>
              <Link to={`/dashboard/teacher/new-lesson${newLessonLink}`}>
                <button className="fw-500">
                  New lesson
                  <span>
                    <img src={lesson} alt="" />
                  </span>
                </button>
              </Link>
            </div>
            <div className="lesson-schedule__body">
              <span className="today-date">
                {todayDate.format("MMM, D YYYY")}
              </span>
              <DatePicker
                autoOk
                variant="static"
                openTo="date"
                value={storeDateSchedule}
                isSetColorSelectedDate={false}
                onChange={handleChangeDateOnPicker}
                onMonthChange={handleChangeDateOnPicker}
                dateBooked={dateBooked}
                dateRescheduled={dateRescheduled}
                dateCancelled={dateCancelled}
                orientation="portrait"
                dateClicked={storeDateScheduleSelected}
                onClickDate={handleClickDate}
              />
            </div>
            <div className="lesson-schedule__footer">
              <div>
                <span className="green"></span> Confirmed
              </div>
              {/* <div className="--center">
                <span className="orange"></span> Rescheduled
              </div> */}
              <div className="--center">
                <span className="red"></span> Canceled
              </div>
              <div className="empty"></div>
            </div>
          </div>
          <div className="class-schedule schedule-item">
            <div className="class-schedule__header">
              <p className="fw-600">Class schedule</p>
              <button onClick={handleToggleModalAssistance}>
                <p>Need assistance?</p>
              </button>
            </div>
            {storeDateScheduleSelected ? (
              <button className="bt_date">
                {moment(storeDateScheduleSelected).format("MMM Do YYYY")}
                <ClearIcon onClick={handleRemoveFilterDate} />
              </button>
            ) : (
                <div className="class-schedule__date">
                  <SingleSelectFormat
                    options={OPTIONT_STUDENTS}
                    placeholder="Student"
                    value={student}
                    onChange={handleChangeStudent}
                  />
                  <span className="--border"></span>
                  <SingleSelectFormat
                    options={OPTIONS_MONTHS}
                    placeholder="Month"
                    onChange={handleChangeMonth}
                    value={{ value: formatMonth, label: formatMonth }}
                  />
                  <SingleSelectFormat
                    options={OPTIONS_YEARS}
                    placeholder="Year"
                    onChange={handleChangeYear}
                    value={{ value: formatYear, label: formatYear }}
                  />
                </div>
              )}
            {dataSchedules.loading ? (
              <Loading />
            ) : upcomingLesson.length || pastLesson.length ? (
              <div className="class-schedule__body --list-lessons">
                {!!upcomingLesson.length && (
                  <div>
                    <div className="list-lessons__header sticky">
                      <p>Upcoming Lessons</p>
                      <span />
                    </div>
                    <div className="upcomming-lesson">
                      {upcomingLesson.map((item) => {
                        return scheduleItem(
                          item,
                          item.zoom_meeting?.join_url?.length > 0,
                          moment(item.date).format("MM") === currentMonth
                        );
                      })}
                    </div>
                  </div>
                )}
                {!!pastLesson.length && (
                  <div>
                    <div className="list-lessons__header past-lesson__header sticky">
                      <p>Past Lessons</p>
                      <span />
                    </div>
                    <div className="past-lesson">
                      {pastLesson.map((item) => {
                        return scheduleItem(item, false);
                      })}
                    </div>
                  </div>
                )}
              </div>
            ) : (
                  <NoLesson />
                )}
          </div>
        </div>
      </div>
    </StyledSchedule>
  );
}

export default Schedule;
