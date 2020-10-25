import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { ModalBody } from "reactstrap";
import { Modal, ModalBanner } from "../common";

const StyledModal = styled(Modal)`
  && {
    max-width: 890px;
    padding: 0 15px;
    @media only screen and (max-width: 400px) {
      padding: 0 5px;
    }
    .modal-content {
      border: 1px solid #e5e5e5;
    }
    .modal-body {
      text-align: center;
      padding: 0 20px 30px;
      background: #f2f4fd;
      h5 {
        color: #f6732f;
        font-size: 21px;
        margin-bottom: 36px;
      }
      .content {
        max-width: 690px;
        margin: 0 auto 40px;
        .content__item {
          display: flex;
          text-align: left;
          margin: 0px 15px 20px;
          img {
            width: 24px;
            margin-right: 20px;
          }
          p,
          a {
            color: #000000;
            margin: 0;
          }
          a {
            font-weight: 500;
            border: none;
            transition: 0.3s ease;
            &:hover {
              color: #7e72f2;
            }
          }
        }
      }
      p {
        color: #08135a;
        font-size: 16px;
        line-height: 23px;
        margin-bottom: 40px;
        a {
          color: #7e72f2;
          border-bottom: 2px solid #7e72f2;
          &:hover {
            color: #3425c7;
          }
        }
      }
      button {
        background: #f6732f;
        border: none;
        border-radius: 30px;
        padding: 10px 25px;
        color: #ffffff;
        font-size: 16px;
        transition: 0.3s ease;
        &:hover {
          transform: translateY(-3px);
          box-shadow: 0 4px 8px 0 #d69777;
        }
      }
      @media only screen and (max-width: 700px) {
        h5 {
          font-size: 20px;
          margin-bottom: 20px;
        }
        p {
          font-size: 13px;
          line-height: 16px;
        }
        button {
          font-size: 14px;
        }
        .content {
          margin: 0 auto 25px;
          .content__item img {
            width: 20px;
            height: 20px;
            margin-right: 10px;
          }
        }
      }
      @media only screen and (max-width: 450px) {
        h5 {
          font-size: 16px;
        }
        p {
          font-size: 11px;
          line-height: 16px;
          margin-bottom: 30px;
        }
        button {
          border-radius: 30px;
          padding: 10px 20px;
          font-size: 12px;
        }
        .content .content__item {
          margin: 0px 0px 15px;
        }
      }
    }
  }
`;

const ModalPasswordUpdated = ({ isOpen, onSubmit, content }) => {
  return (
    <StyledModal
      isOpen={isOpen}
      wrapClassName="wrap-modalDashboard"
      id="modal-payment-method-updated"
      centered
    >
      <ModalBanner />
      <ModalBody>
        <div className="modal-body__inner">
          <h5>Easily view and manage your music lessons</h5>
          <div>{content}</div>
          <p>
            By continuing, you are accepting the Homemuse{" "}
            <Link to="/terms">Terms of Service</Link> and{" "}
            <Link to="/privacy">Privacy Policy</Link>{" "}
          </p>
          <button onClick={onSubmit}>Access my dashboard</button>
        </div>
      </ModalBody>
    </StyledModal>
  );
};

export default ModalPasswordUpdated;
