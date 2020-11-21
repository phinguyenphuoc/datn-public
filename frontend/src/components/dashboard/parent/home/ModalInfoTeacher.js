import React from "react";
import styled from "styled-components";
import { ModalHeader, ModalBody } from "reactstrap";
import { Modal } from "../../../common";
import moment from "moment";
import { formatPhoneNumber, formatTime2 } from "../../../../utils/helpers";
import avatarDefault from "../../../../assets/images/avatar-picture.svg";
import { getSchedulesParentUpcomming } from "../../../../redux/actions/parent";
import { useSelector } from "react-redux";
import camera from "../../../../assets/images/cameraZoom.svg";
import { useHistory } from "react-router-dom";

const StyledModal = styled(Modal)`
  && {
    max-width: 580px;
    width: 100%;
    margin: 0 auto;
    padding: 15px;
    .modal-header {
      background: rgba(20, 30, 98, 0.03);
      position: relative;
      border-bottom: 1px solid #7480c3;
      .modal-title {
        display: flex;
        padding: 20px 15px;
      }
      img {
        border-radius: 100%;
        max-width: 110px;
        max-height: 110px;
        width: 100%;
        border: 8px solid #ffffff;
      }
      &__text {
        position: absolute;
        transform: translate(-50%, -50%);
        top: 50%;
        left: 50%;
        text-align: center;
        p {
          font-size: 21px;
          color: #08135a;
          font-weight: 400;
          margin-bottom: 5px;
          text-transform: capitalize;
        }
        h3 {
          color: #6254e8;
          font-size: 16px;
          text-align: center;
          text-transform: capitalize;
        }
      }
      .close {
        opacity: 1;
        span {
          color: #6254e8;
          font-size: 45px;
          font-weight: 400;
        }
      }
    }
    .modal-body {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 31px;
      .modal__info {
        width: 50%;
        > div {
          margin-bottom: 20px;
        }
        h4 {
          color: #6254e8;
          font-size: 14px;
        }
        p {
          font-size: 14px;
          color: #08135a;
          text-transform: capitalize;
        }
      }
      .modal__schedule {
        width: 50%;
        background: #6254e8;
        border-radius: 5px;
        padding: 20px 20px;
        text-align: center;
        min-height: 175px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        p {
          color: #d5d1fc;
          font-size: 16px;
          margin-bottom: 10px;
        }
        h2 {
          font-size: 18px;
          color: #ffffff;
        }
        h3 {
          font-size: 16px;
          color: #ffffff;
          font-weight: 400;
        }
        a {
          padding: 5px;
        }
        img {
          width: 35px;
          height: 35px;
          transition: 0.3s ease;
          &:hover {
            transform: scale(1.2);
          }
        }
      }
    }
    @media only screen and (max-width: 585px) {
      .modal-header .modal-title {
        padding: 0;
      }
      .modal-header__text {
        left: 60%;
      }
      .modal-body {
        display: block;
        padding: 16px;
        .modal__schedule {
          padding: 30px 10px;
          width: 100%;
          max-width: 240px;
          margin: 0 auto;
        }
        .modal__info {
          width: 100%;
        }
      }
    }
    @media only screen and (max-width: 454px) {
      .modal-header__text p {
        font-size: 18px;
      }
    }
    @media only screen and (max-width: 350px) {
      .modal-body .modal__info {
        h4,
        p,
        a {
          font-size: 12px;
        }
      }
      .modal-body .modal__schedule {
        padding: 10px;
        h3,
        p {
          font-size: 14px;
        }
      }
    }
    .--instrument {
      display: inline-flex;
    }
  }
`;

const ModalInfoTeacher = ({ isOpen, handleToggle, dataTeachers }) => {
  const teacherId = dataTeachers.id;
  const history = useHistory();

  React.useEffect(() => {
    if (teacherId) {
      getSchedulesParentUpcomming(teacherId);
    }
  }, [teacherId]);
  const schedule = useSelector((store) => store.parent.schedulesUpcomming);

  const joinMeeting = (roomId) => {
    history.push(`/dashboard/student/meeting/${roomId}`)
  }

  return (
    <StyledModal
      isOpen={isOpen}
      toggle={handleToggle}
      wrapClassName="wrap-modalDashboard"
      id="modal-info-student"
      centered
    >
      <ModalHeader toggle={handleToggle}>
        <img src={dataTeachers.avatar || avatarDefault} alt="" />
        <div className="modal-header__text">
          <p>{`${dataTeachers.first_name} ${dataTeachers.last_name}`}</p>
          <div className="--instrument">
            <h3>
              {schedule &&
                schedule.data.length &&
                schedule.data[0].lesson.instrument}
            </h3>
          </div>
        </div>
      </ModalHeader>
      <ModalBody>
        <div className="modal__info">
          <div>
            <h4>Instrument taught</h4>
            <div className="--instrument">
              {dataTeachers.skills &&
                dataTeachers.skills.length &&
                dataTeachers.skills.map((item, index) => {
                  if (index === 0) {
                    return <p key={`skills-${index}`}>{item.instrument}</p>;
                  } else {
                    return (
                      <p key={`skills-${index}`}>{`, ${item.instrument}`}</p>
                    );
                  }
                })}
            </div>
          </div>
          <div>
            <h4>Location</h4>
            <p>{dataTeachers.city}</p>
          </div>
          <div>
            <h4>Phone number</h4>
            <p>{formatPhoneNumber(dataTeachers.phone)}</p>
          </div>
        </div>
        <div className="modal__schedule">
          <p>Upcoming Lesson</p>
          {schedule && schedule.data.length && (
            <div>
              <h2>{moment(schedule.data[0].date).format("dddd")}</h2>
              <h3>{`${moment(schedule.data[0].date).format(
                "MMMM, Do YYYY"
              )} at ${formatTime2(schedule.data[0].start_hour)}`}</h3>
              {schedule.data[0].room_id &&
                <img src={camera} alt="camera" onClick={() => joinMeeting(schedule.data[0].room_id)} />
              }
            </div>
          )}
        </div>
      </ModalBody>
    </StyledModal>
  );
};

export default ModalInfoTeacher;
