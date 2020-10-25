import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Table } from "reactstrap";
import { IconButton } from "@material-ui/core";
import moment from "moment";
import { SingleSelectFormat, Loading } from "../../../common";
import { OPTIONS_MONTHS, OPTIONS_YEARS } from "../../../../utils/constants";
import {
  updateDateEarningReceipts,
  getEarningsReceipts,
} from "../../../../redux/actions/teacher";
import file from "../../../../assets/images/file-pdf.svg";
import dowload from "../../../../assets/images/dowload.svg";
import nextpayment from "../../../../assets/images/earning-payment.svg";
import earningbg from "../../../../assets/images/earning-bg.svg";
import turnover from "../../../../assets/images/turnover.svg";
import given from "../../../../assets/images/given.svg";
import earningNoRecords from "../../../../assets/images/earning-no-records.svg";
import { useSelector } from "react-redux";

const StyledEarnings = styled.section`
  margin-bottom: auto;
  font-size: 14px;
  .earnings__inner {
    display: flex;
    margin: 20px 0;
    justify-content: space-between;
    @media (max-width: 768px) {
      padding: 0;
    }
  }
  .earning-history {
    background: #ffffff;
    box-shadow: 0px 5px 25px rgba(98, 84, 232, 0.203944);
    border-radius: 4px;
    width: 70%;
    padding: 30px;
    .earning__header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 4%;
      h3 {
        font-size: 14px;
        color: #08135a;
        font-weight: 600;
        margin-bottom: 20px;
      }
      .earning__date {
        display: flex;
        width: 100%;
        max-width: 320px;
      }
    }
  }
  .earning__body__no-data {
    min-height: 383px;
    background: url(${earningNoRecords}) no-repeat transparent center/ 420px;
    p {
      color: #b5beec;
      font-size: 21px;
      text-align: left;
    }
    @media (max-width: 700px) {
      background-size: 90%;
      p {
        font-size: 18px;
      }
    }
  }
  table {
    tr {
      border-bottom: 1px solid #b5beec;
      th {
        color: #b5beec;
        font-size: 12px;
        text-align: left;
        font-weight: 400;
        text-transform: capitalize;
        padding: 15px 15px 15px 0;
      }
      td {
        color: #08135a;
        font-size: 12px;
        text-align: left;
        padding: 15px 15px 15px 0;
        vertical-align: middle;
        &:last-child {
          padding: 15px 0;
          text-align: right;
        }
        button {
          width: 46px;
        }
      }
      td: first-child {
        font-weight: 600;
        img {
          margin-right: 10px;
        }
      }
      td:nth-child(3) {
        p {
          font-size: 14px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin-bottom: 0;
          width: 400px;
          @media (max-width: 1130px) {
            width: 300px;
          }
          @media (max-width: 735px) {
            width: 250px;
          }
        }
      }
      @media (max-width: 735px) {
        td:nth-child(2) {
          width: 142px;
        }
        td: last-child {
          padding: 10px 0;
        }
        td {
          padding: 10px 10px 10px 0;
        }
      }
      @media (max-width: 370px) {
        td {
          button {
            width: 36px;
            padding: 7px;
          }
        }
      }
    }
  }
  .date-payment {
    width: calc(30% - 20px);
    > div {
      box-shadow: 0px 5px 25px rgba(98, 84, 232, 0.203944);
      border-radius: 4px;
    }
    .next-payment {
      background: url(${nextpayment}) #6254e8 no-repeat center / 446px;
      margin-bottom: 20px;
      padding: 25% 20px;
      color: #ffffff;
      display: flex;
      flex-direction: column;
      justify-content: center;
      p {
        font-size: 14px;
      }
      h1 {
        font-size: 29px;
      }
      &__no-data {
        h2 {
          font-size: 21px;
        }
        p {
          font-size: 15px;
          color: rgba(181, 190, 236, 0.75);
        }
      }
    }
    .date-earning {
      background: url(${earningbg}) #248d53 no-repeat center/125%;
      padding: 0 12px;
      color: #ffffff;
      padding: 15px 10px;
      position: relative;
      min-height: 245px;
      top: 0;
      left: 0;
      border-radius: 4px;
      @media (max-width: 1200px) {
        background-size: 150%;
      }
      @media (max-width: 610px) {
        background-size: 115%;
      }
      p {
        margin-bottom: 0;
        span {
          font-weight: 500;
        }
      }
      &__item {
        height: 42%;
        padding: 20px;
        text-align: left;
        &:nth-child(2) {
          border-bottom: 1.5px solid #fff;
          background: url(${turnover}) transparent no-repeat calc(100% - 20px)
            center / 60px;
        }
        &:nth-child(3) {
          background: url(${given}) transparent no-repeat calc(100% - 20px)
            center / 70px;
        }
        h2 {
          font-size: 22px;
          margin-bottom: 5px;
        }
        p {
          font-size: 26px;
          font-weight: 600;
          line-height: 30px;
          margin-left: 14px;
        }
        @media (max-width: 350px) {
          padding: 15px;
          h2 {
            font-size: 20px;
          }
          p {
            font-size: 24px;
            line-height: 25px;
          }
        }
      }
      .earning__details {
        text-align: right;
        a {
          color: #fff;
          border-bottom: 1px solid;
          margin-right: 20px;
          cursor: pointer;
          transition: 0.3s ease;
          &:hover {
            color: #ffae62;
          }
        }
      }
    }
  }
  @media only screen and (max-width: 1025px) {
    .earnings__inner {
      flex-direction: column;
    }
    div.earning-history {
      order: 2;
    }
    div.date-payment {
      order: 1;
      display: flex;
      justify-content: space-between;
    }
    .earning-history {
      width: 100%;
      margin: 0px auto 4%;
    }
    .date-payment {
      width: 100%;
      display: block;
      > div {
        width: 49%;
        margin-bottom: 20px;
      }
      .next-payment {
        padding: 6% 20px;
        max-height: 290px;
        background-size: 115%;
      }
    }
  }
  @media only screen and (max-width: 825px) {
    .date-payment .next-payment {
      background-size: 440px;
      h1 {
        font-size: 25px;
      }
    }
  }
  @media only screen and (max-width: 610px) {
    div.date-payment {
      display: block;
      > div {
        width: 100%;
      }
      .next-payment {
        background-size: 114%;
        height: 250px;
      }
    }
  }
  @media only screen and (max-width: 650px) {
    table tr td:nth-child(3),
    th:nth-child(3) {
      display: none;
    }
  }
  @media only screen and (max-width: 615px) {
    .earning-history .earning__header {
      display: block;
      .earning__date {
        max-width: inherit;
      }
    }
  }
  @media only screen and (max-width: 450px) {
    .earning-history {
      padding: 30px 15px;
    }
  }
  @media only screen and (max-width: 400px) {
    div.date-payment .next-payment {
      background-size: 400px;
      h1 {
        font-size: 23px;
      }
    }
  }
`;

function Earnings({ handleToggleModal, storeEarningCurrentDetails }) {
  const isLoading = storeEarningCurrentDetails.loading;
  const storeDateRecepts = useSelector(
    (store) => store.teacher.dateEarningReceipt
  );
  const storeEarningsReceipts = useSelector(
    (store) => store.teacher.earningsReceipts
  );
  const isLoadingEarning = storeEarningsReceipts.loading;

  const formatMonth = moment(storeDateRecepts).format("MMMM");
  const formatYear = moment(storeDateRecepts).format("YYYY");
  React.useEffect(() => {
    getEarningsReceipts(moment(storeDateRecepts).format("YYYY-MM"));
  }, [storeDateRecepts]);
  const handleChangeMonth = ({ value }) => {
    updateDateEarningReceipts(moment(storeDateRecepts).month(value));
  };

  const handleChangeYear = ({ value }) => {
    updateDateEarningReceipts(moment(storeDateRecepts).year(value));
  };
  return (
    <StyledEarnings>
      <div className="container">
        <div className="earnings__inner">
          <div className="earning-history">
            <div className="earning__header">
              <h3>Earnings history</h3>
              <div className="earning__date">
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
            </div>
            <div className="earning__body">
              {isLoadingEarning ? (
                <Loading />
              ) : storeEarningsReceipts.data &&
                storeEarningsReceipts.data.length ? (
                <Table borderless>
                  <thead>
                    <tr>
                      <th>title</th>
                      <th>date</th>
                      <th>description</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {storeEarningsReceipts.data.map((item, index) => (
                      <tr key={index}>
                        <td>
                          <img src={file} alt="file" /> {item.name}
                        </td>
                        <td>{moment(item.date).format("MMMM DD, YYYY")}</td>
                        <td>
                          <p>{item.description}</p>
                        </td>
                        <td>
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <IconButton>
                              <img src={dowload} alt="dowload" />
                            </IconButton>
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <div className="earning__body__no-data">
                  <p>No receipts found</p>
                </div>
              )}
            </div>
          </div>
          <div className="date-payment">
            <div className="next-payment">
              {isLoading ? (
                <Loading />
              ) : storeEarningCurrentDetails.data &&
                storeEarningCurrentDetails.data.payment_date ? (
                <>
                  <p>Next payment</p>
                  <h1>
                    {moment(
                      storeEarningCurrentDetails.data.payment_date
                    ).format("MMMM, Do YYYY")}
                  </h1>
                </>
              ) : (
                <div className="next-payment__no-data">
                  <h2>NEXT PAYMENT</h2>
                  <p>No data available</p>
                </div>
              )}
            </div>
            <div className="date-earning">
              {isLoading ? (
                <Loading />
              ) : Object.keys(storeEarningCurrentDetails.data).length ? (
                <>
                  <p>
                    From{" "}
                    <span>
                      {moment(
                        storeEarningCurrentDetails.data.start_date
                      ).format("MM/DD/YYYY")}
                    </span>{" "}
                    to{" "}
                    <span>
                      {moment(storeEarningCurrentDetails.data.end_date).format(
                        "MM/DD/YYYY"
                      )}
                    </span>
                  </p>
                  <div className="date-earning__item">
                    <h2>TURNOVER</h2>
                    <p>
                      {storeEarningCurrentDetails.data.turnover
                        ? `$${storeEarningCurrentDetails.data.turnover}`
                        : "$0"}
                    </p>
                  </div>
                  <div className="date-earning__item">
                    <h2>LESSON GIVEN</h2>
                    <p>
                      {storeEarningCurrentDetails.data.lessons_given
                        ? storeEarningCurrentDetails.data.lessons_given
                        : 0}
                    </p>
                  </div>
                  <div className="earning__details">
                    <Link to="/dashboard/teacher/earnings/earnings-details">
                      See details
                    </Link>
                  </div>
                </>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </StyledEarnings>
  );
}

export default Earnings;
