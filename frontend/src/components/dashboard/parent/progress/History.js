import React from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { Table } from "reactstrap";
import moment from "moment";
import { IconButton } from "@material-ui/core";
import { SingleSelectFormat, Loading, NoData } from "../../../common";
import imgNoDataProgress from "../../../../assets/images/no-data-progress.svg";
import { ChevronRight } from "../../../common/icons";
import { OPTIONS_MONTHS, OPTIONS_YEARS } from "../../../../utils/constants";
// import file from "../../../../assets/images/file-pdf.svg";
import VisibilityIcon from "@material-ui/icons/Visibility";
// import star from "../../../../assets/images/star.svg";
import { getAuth } from "../../../../utils/helpers";

const StyledHistory = styled.section`
  margin: 30px 15px auto;
  .history__text {
    display: flex;
    align-items: center;
    font-size: 16px;
    margin-bottom: 30px;
    .text-color {
      color: #6254e8;
      font-weight: 500;
    }
    .arrow {
      margin: 0 15px;
      font-size: 12px;
      svg {
        font-size: 12px;
      }
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
  .history {
    padding: 30px 28px 60px;
    margin: 0 auto 50px;
    background: #ffffff;
    box-shadow: 0px 5px 25px rgba(98, 84, 232, 0.203944);
    border-radius: 4px;

    &__header {
      display: flex;
      justify-content: space-between;
      p {
        color: #08135a;
        font-weight: 600;
        font-size: 14px;
        text-align: left;
      }
      .history__date {
        display: flex;
        width: 100%;
        max-width: 340px;
        > div {
          width: 49%;
        }
      }
    }
  }

  table {
    .eye {
      color: #b5beec;
    }
    tr {
      border-bottom: 1px solid #b5beec;
      th {
        color: #b5beec;
        font-size: 12px;
        text-align: left;
        font-weight: 400;
        text-transform: capitalize;
        padding: 10px 15px 10px 0;
      }
      td {
        color: #08135a;
        font-size: 12px;
        text-align: left;
        padding: 10px 15px 10px 0;
        vertical-align: middle;
        &:last-child {
          padding: 8px 0;
          text-align: right;
        }
      }
      td: first-child {
        font-weight: 600;
        img {
          margin-right: 10px;
        }
      }
      td:nth-child(4) {
        p {
          font-size: 12px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin-bottom: 0;
        }
      }
      td:nth-child(3) {
        img {
          width: 25px;
          margin-right: 5px;
        }
      }
    }
  }
  
  @media only screen and (max-width: 755px) {
    .history .history__header {
      display: block;
      .history__date {
        max-width: inherit;
      }
    }
  }

  @media only screen and (max-width: 725px) {
    margin: 30px 0px auto;
    table tr {
      td:nth-child(4),
      th:nth-child(4) {
        display: none;
      }
      td:nth-child(3) img {
        width: 20px;
      }
      .eye {
        padding: 8px;
      }
    }
  }
  @media only screen and (max-width: 626px) {
    .history__text {
      font-size: 13px;
    }
  }
  @media only screen and (max-width: 550px) {
    .history .history__header .history__date {
      flex-direction: column;
      > div {
        width: 100%;
        max-width: 175px;
        margin: 0 auto 7px;
      }
    }
    table tr {
      th,
      td {
        font-size: 9px;
      }
    }
  }
  @media only screen and (max-width: 400px) {
    .history__text {
      font-size: 10px;
      .arrow {
        font-size: 12px;
        margin: 0 9px;
        svg {
          width: 8px;
        }
      }
    }
  }
  @media only screen and (max-width: 370px) {
    table tr {
      td {
        padding: 10px 10px 10px 0;
      }
      td:nth-child(3) {
        width: 41px;
        img {
          width: 18px;
        }
      }
    }
  }
  .NoData {
    margin-top: 15px;
    h1 {
      color: #b5beec;
    }
  }
`;

function History({ studentProgressReport }) {
  const [month, setMonth] = React.useState(moment().format("MMMM"));
  const [year, setYear] = React.useState(moment().format("YYYY"));
  const [windowWidth, setWindowWidth] = React.useState(0);

  const history = useHistory();
  const isLoadingProgressReports = studentProgressReport.loading;
  const oldHistoryState = history.location.state ? history.location.state : {};

  const auth = getAuth();
  const studentName = auth.user_first_name;
  const handleClickViewProgressReport = (item = {}) => () => {
    history.push(
      `/dashboard/student/progress-report/history/${item.reported_date}`,
      {
        ...oldHistoryState,
        studentProgress: item,
      }
    );
  };

  const handleChangeMonth = (value) => {
    setMonth(value.value);
  };

  const handleChangeYear = (value) => {
    setYear(value.value);
  };

  let dataStudentProgressReport = studentProgressReport.data;
  if (month || year) {
    dataStudentProgressReport = dataStudentProgressReport.filter((item) =>
      month && year
        ? moment(item.reported_date).format("YYYY-MMMM") === `${year}-${month}`
        : month
          ? moment(item.reported_date).format("MMMM") === month
          : year
            ? moment(item.reported_date).format("YYYY") === year
            : ""
    );
  }

  React.useLayoutEffect(() => {
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const updateSize = () => {
    setWindowWidth(window.innerWidth);
  };

  return (
    <StyledHistory>
      <div className="container">
        <div className="history__text">
          <Link to="/dashboard/student">Home</Link>
          <p className="arrow">
            <ChevronRight />
          </p>
          <Link
            to={{
              ...history.location,
              pathname: "/dashboard/student/progress-report",
            }}
          >
            {studentName && `My progress: ${studentName}`}
          </Link>
          <p className="arrow">
            <ChevronRight />
          </p>
          <Link
            className="text-color"
            to="/dashboard/student/progress-report/history"
          >
            History
          </Link>
        </div>
        <div className="history">
          <div className="history__header">
            <p>My progress history</p>
            <div className="history__date">
              <SingleSelectFormat
                options={OPTIONS_MONTHS}
                placeholder="Month"
                onChange={handleChangeMonth}
                value={{ value: month, label: month }}
              />
              <SingleSelectFormat
                options={OPTIONS_YEARS}
                placeholder="Year"
                onChange={handleChangeYear}
                value={{ value: year, label: year }}
              />
            </div>
          </div>
          <div className="history__body">
            {isLoadingProgressReports ? (
              <Loading />
            ) : dataStudentProgressReport &&
              dataStudentProgressReport.length ? (
                  <Table borderless>
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Level</th>
                        <th>Teacher Comments</th>
                        <th>Piece</th>
                        <th>Progress</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {dataStudentProgressReport.map((item, index) => (
                        <tr key={index}>
                          <td>
                            {" "}
                            {moment(item.reported_date).format("MMMM, YYYY")}
                          </td>
                          <td>{item.level}</td>
                          <td>
                            <p>{item.comment}</p>
                          </td>
                          <td>
                            <p>{item.pieces[0].title}</p>
                          </td>
                          <td>
                            <p>{item.pieces[0].rate_percentage}</p>
                          </td>
                          <td>
                            <IconButton
                              className="eye"
                              onClick={handleClickViewProgressReport(item)}
                            >
                              <VisibilityIcon />
                            </IconButton>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                ) : (
                  <NoData
                    noDataText="NO PROGRESS REPORTS FOUND"
                    noDataImage={imgNoDataProgress}
                  />
                )}
          </div>
        </div>
      </div>
    </StyledHistory>
  );
}

export default History;
