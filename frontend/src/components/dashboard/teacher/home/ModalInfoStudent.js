import React from "react";
import styled from "styled-components";
import { ModalHeader, ModalBody } from "reactstrap";
import { Modal } from "../../../common";
import moment from "moment";
import avatarDefault from "../../../../assets/images/avatar-picture.svg";
import { getSchedulesUpcomming } from "../../../../redux/actions/teacher";
import { useSelector } from "react-redux";
import { formatPhoneNumber, formatTime2 } from "../../../../utils/helpers";
import camera from "../../../../assets/images/cameraZoom.svg";

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
          margin-bottom: 0;
          text-transform: capitalize;
        }
        h3 {
          color: #6254e8;
          font-size: 16px;
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
        width: calc(50% - 15px);
        margin-right: 15px;
        div {
          margin-bottom: 20px;
        }
        h4 {
          color: #6254e8;
          font-size: 14px;
        }
        p {
          font-size: 14px;
          color: #08135a;
          word-wrap: break-word;
          // text-transform: capitalize;
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
          padding: 20px 10px;
          width: 100%;
          max-width: 240px;
          margin: 0 auto;
        }
        .modal__info {
          width: 100%;
        }
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
  }
`;

const ModalInfoStudent = ({ isOpen, handleToggle, data }) => {
  const studentId = data.id;
  React.useEffect(() => {
    if (studentId) {
      // getSchedulesUpcomming(studentId);
    }
  }, [studentId]);
  const schedule = useSelector((store) => store.teacher.schedulesUpcomming);
  return (
    <StyledModal
      isOpen={isOpen}
      toggle={handleToggle}
      wrapClassName="wrap-modalDashboard"
      id="modal-info-student"
      centered
    >
      <ModalHeader toggle={handleToggle}>
        <img src={data.avatar || avatarDefault} alt="" />
        <div className="modal-header__text">
          <p>{`${data.first_name} ${data.last_name}`}</p>
          <h3>{data.address && data.address.length > 3 && data.address[2]}</h3>
        </div>
      </ModalHeader>
      <ModalBody>
        <div className="modal__info">
          {/* <div>
            <h4>Instrument playing</h4>
            {data.skills &&
              data.skills.map((item, index) => (
                <p key={`${index}`}>{item.instrument}</p>
              ))}
          </div>
          <div>
            <h4>Home address</h4>
            {data.address && data.address.length > 3 && (
              <p>
                {data.address[0]} {data.address[1]}{" "}
                {data.address[2] && data.address[2]}
                {data.address[3] && `, ${data.address[3]}`}
              </p>
            )}
          </div> */}
          <div>
            <h4>Email address</h4>
            <p><a href={"mailto:" + data.email}>
              {data.email}
            </a></p>
          </div>
          <div>
            <h4>Phone number</h4>
            <p><a href={"tel:" + data.phone}>
              {formatPhoneNumber(data.phone)}
            </a></p>
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
              {schedule.data[0].zoom_meeting &&
                Object.keys(schedule.data[0].zoom_meeting).length > 0 && (
                  <a
                    href={schedule.data[0].zoom_meeting.join_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={camera} alt="camera" />
                  </a>
                )}
            </div>
          )}
        </div>
      </ModalBody>
    </StyledModal>
  );
};

export default ModalInfoStudent;
