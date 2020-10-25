import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Table } from "reactstrap";
import { useSelector } from "react-redux";
import moment from "moment";
import { SingleSelectFormat, Loading } from "../../../common";
import { ChevronRight } from "../../../common/icons";
import classNames from "classnames";
import {
  updateDateEarning,
  getEarnings,
} from "../../../../redux/actions/teacher";
import { OPTIONS_MONTHS, OPTIONS_YEARS } from "../../../../utils/constants";
import earningNoRecords from "../../../../assets/images/earning-no-records.svg";

const StyledDetails = styled.section`
  margin-bottom: auto;
  .details__inner {
    padding: 15px;
  }
  .details__inner__text {
    display: flex;
    align-items: center;
    font-size: 18px;
    padding: 10px 10px 35px;
    .text-color {
      color: #6254e8;
      font-weight: 500;
    }
    .arrow {
      margin: 0 15px;
      font-size: 14px;
      
    }
    a {
      color: #082487;
      :hover {
        color: #6254e8;
      }
    }
    p {
      margin: 0;
    }
  }
  .details-table {
    width: calc(100% - 20px);
    background: #ffffff;
    box-shadow: 0px 5px 25px rgba(98, 84, 232, 0.203944);
    border-radius: 4px;
    max-width: 1000px;
    margin: 0 auto 10%;
    padding: 40px;
  }
  .months-years {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    > div {
      max-width: 160px;
    }
  }
  table tr {
    border-bottom: 1px solid #b5beec;
    color: #08135a;
    th {
      color: #b5beec;
      font-weight: 400;
    }
    td:first-child {
      font-weight: 600;
    }
    td,
    th {
      padding: 20px 20px 20px 0;
      text-align: left;
    }
    td {
      text-transform: capitalize;
    }
    .confirmed {
      color: #54c052;
    }
    .cancelled {
      color: #dc3545;
    }
  }
  @media only screen and (max-width: 670px) {
    .details__inner {
      padding: 15px 0;
    }
    .details__inner__text {
      padding: 10px 0px 35px;
    }
    .details-table {
      width: 100%;
    }
  }
  @media only screen and (max-width: 620px) {
    .details-table {
      padding: 30px 20px;
    }
    table {
      tr {
        td,
        th {
          padding: 20px 10px 20px 0;
        }
      }
    }
  }
  @media only screen and (max-width: 540px) {
    table tr {
      td:nth-child(3),
      th:nth-child(3), 
      td:nth-child(4),
      th:nth-child(4) {
        display: none;
      }
      td {
        padding: 15px 10px 15px 0;
      }
      .cancelled_earning {
        color: #dc3545;
      }
      .confirmed_earning {
        color: #54c052;
      }
    }
  }
  @media only screen and (max-width: 370px) {
    table {
      font-size: 12px;
      }
    }
  }
  .earning__body__no-data {
    min-height: 383px;
    background: url(${earningNoRecords}) no-repeat transparent center/ 420px;
    p {
      color: #b5beec;
      font-size: 24px;
      text-align: left;
    }
    @media (max-width: 700px) {
      background-size: 90%;
      p {
        font-size: 20px;
      }
    }
  }
`;

function Details({ handleToggleModal }) {
  const storeDateEarnings = useSelector((store) => store.teacher.dateEarning);
  const storeEarnings = useSelector((store) => store.teacher.earnings);
  const isLoadingEarning = storeEarnings.loading;

  const formatMonth = moment(storeDateEarnings).format("MMMM");
  const formatYear = moment(storeDateEarnings).format("YYYY");

  React.useEffect(() => {
    getEarnings(moment(storeDateEarnings).format("YYYY-MM"));
  }, [storeDateEarnings]);
  const handleChangeMonth = ({ value }) => {
    updateDateEarning(moment(storeDateEarnings).month(value));
  };

  const handleChangeYear = ({ value }) => {
    updateDateEarning(moment(storeDateEarnings).year(value));
  };
  return (
    <StyledDetails>
      <div className="container">
        <div className="details__inner">
          <div className="details__inner__text">
            <Link to="/dashboard/teacher/earnings">Earnings</Link>
            <p className="arrow">
              <ChevronRight />
            </p>
            <p className="text-color">Details</p>
          </div>
          <div className="details-table">
            <div className="months-years">
              <SingleSelectFormat
                options={OPTIONS_MONTHS}
                placeholder="Months"
                onChange={handleChangeMonth}
                value={{ value: formatMonth, label: formatMonth }}
              />
              <SingleSelectFormat
                options={OPTIONS_YEARS}
                placeholder="Years"
                onChange={handleChangeYear}
                value={{ value: formatYear, label: formatYear }}
              />
            </div>
            {isLoadingEarning ? (
              <Loading />
            ) : storeEarnings.data && storeEarnings.data.length ? (
              <Table borderless>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Student</th>
                    <th>Class duration</th>
                    <th>Status</th>
                    <th>Earned</th>
                  </tr>
                </thead>
                <tbody>
                  {storeEarnings.data.map((item, index) => (
                    <tr key={index}>
                      <td>{moment(item.date).format("MMMM DD, YYYY")}</td>
                      <td>{`${item.student.first_name} ${item.student.last_name}`}</td>
                      <td>
                        {item.duration === "60_min"
                          ? "60 minutes"
                          : item.duration === "45_min"
                          ? "45 minutes"
                          : "30 minutes"}
                      </td>
                      <td
                        className={classNames({
                          cancelled: item.status === "cancelled",
                          confirmed: item.status === "booked",
                        })}
                      >
                        {item.status === "booked"
                          ? "confirmed"
                          : item.status === "cancelled"
                          ? "canceled"
                          : ""}
                      </td>
                      <td
                        className={classNames({
                          cancelled_earning:
                            item.status === "cancelled" && item.earned !== null,
                          confirmed_earning:
                            item.status === "booked" && item.earned !== null,
                        })}
                      >
                        {item.earned === null ? "N/A" : `$${item.earned}`}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <div className="earning__body__no-data">
                <p>No data available</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </StyledDetails>
  );
}

export default Details;
