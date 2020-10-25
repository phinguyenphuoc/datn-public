import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { ChevronRight } from "../../../common/icons";
import { useHistory } from "react-router-dom";
import { Collapse, IconButton, Menu, MenuItem } from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import { Table } from "reactstrap";
import moment from "moment";
import { formatPhoneNumber } from "../../../../utils/helpers";
import user from "../../../../assets/images/avatar-picture.svg";
import file from "../../../../assets/images/file-pdf.svg";
import VisibilityIcon from "@material-ui/icons/Visibility";
import star from "../../../../assets/images/star.svg";

const StyledMyStudent = styled.section`
  margin-bottom: auto;
  .mystudent__inner__text {
    display: flex;
    align-items: center;
    font-size: 18px;
    padding: 25px 0;
    margin-bottom: 2%;
    @media (max-width: 600px) {
      font-size: 15px;
    }
    @media (max-width: 380px) {
      font-size: 12px;
    }
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
  .mystudent-info {
    padding: 0;
    margin-bottom: 20px;
    &__item {
      display: flex;
      justify-content: space-between;
      background: #ffffff;
      padding: 10px 20px;
      border-radius: 4px;
      box-shadow: 0px 5px 25px rgba(98, 84, 232, 0.2);
      p {
        font-size: 14px;
        margin: 0;
      }
      &__left {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 40%;
        width: 100%;
        max-width: 300px;
        position: relative;
        padding-left: 75px;
        min-height: 46px;
        img {
          width: 55px;
          height: 55px;
          border: 3px solid #6254e8;
          border-radius: 100%;
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
        }
        h4 {
          font-size: 18px;
          font-weight: 600;
          margin: 0;
          text-transform: capitalize;
        }
        p {
          color: #8086aa;
          text-transform: capitalize;
        }
      }
      &__right {
        display: flex;
        align-items: center;
        p {
          color: #f6732f;
          padding-bottom: 5px;
          border-bottom: 1px solid #f6732f;
          margin: 0 10px 0 0;
          transition: 0.3s ease;
          cursor: pointer;
          &:hover {
            color: #08135a;
            border-bottom: 1px solid #08135a;
          }
        }
        svg {
          color: #000000;
        }
      }
    }
  }
  .collapse__inner {
    background: #ffffff;
    border-top: 1px solid #979bb2;
    h3,
    p,
    span {
      margin: 0;
      font-size: 14px;
    }
    .collapse__header {
      background: rgba(20, 30, 98, 0.03);
      padding: 12px 20px 12px;
      .--info {
        text-align: left;
        span {
          font-weight: 400;
          margin-left: 10px;
        }
        h3 {
          font-weight: 600;
        }
      }
      .address {
        margin-bottom: 5px;
      }
      .sort-by {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        svg,
        span {
          color: #8086aa;
        }
        > span {
          margin: 0 10px;
        }
        > button:first-child svg {
          transform: rotate(90deg);
        }
      }
    }
    .collapse__body {
      border-top: 1px solid #979bb2;
      padding: 0 20px;
      max-height: 290px;
      overflow: auto;
      .eye {
        color: #b5beec;
      }
      table {
        tr {
          border-bottom: 1px solid #b5beec;
          td {
            color: #08135a;
            font-size: 12px;
            text-align: left;
            padding: 10px 15px 10px 0;
            vertical-align: middle;
          }
          td:first-child {
            min-width: 100px;
            font-weight: 600;
            img {
              margin-right: 10px;
            }
          }
          td:last-child {
            padding: 10px 0px;
            text-align: right;
          }
          td:nth-child(2) {
            min-width: 42px;
            img {
              width: 25px;
              position: relative;
              top: -2px;
              margin: 0 0 0 2px;
            }
          }
          td:nth-child(3) {
            text-transform: capitalize;
          }
          td:nth-child(4) {
            width: 45%;
            p {
              font-size: 12px;
              width: 566px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              margin-bottom: 0;
            }
          }
          @media only screen and (max-width: 1040px) {
            td {
              font-size: 13px;
            }
            td:nth-child(4) {
              width: 35%;
              p {
                width: 420px;
              }
            }
          }
          @media only screen and (max-width: 857px) {
            td:nth-child(4) {
              p {
                width: 252px;
              }
            }
          }
          @media only screen and (max-width: 685px) {
            td {
              font-size: 12px;
            }
            td:nth-child(4) {
              display: none;
            }
            td:nth-child(2) {
              img {
                width: 18px;
              }
            }
          }
          @media only screen and (max-width: 500px) {
            td {
              font-size: 11px;
              padding: 10px 10px 10px 0;
            }
            td:last-child {
              .eye {
                padding: 4px;
              }
            }

            span {
              font-size: 12px;
            }
          }
        }
      }
    }
  }
  @media only screen and (max-width: 685px) {
    .collapse__inner {
      h3,
      span {
        font-size: 12px;
      }
    }
  }
  @media only screen and (max-width: 600px) {
    .mystudent-info__item {
      display: block;
      &__left {
        padding-left: 60px;
      }
      &__right {
        justify-content: flex-end;
      }
    }
  }
  @media only screen and (max-width: 500px) {
    .collapse__inner .collapse__body {
      max-height: 252px;
    }
  }
  @media only screen and (max-width: 500px) {
    .mystudent-info__item__left {
      img {
        width: 45px;
        height: 45px;
      }
      h4 {
        font-size: 15px;
      }
      p {
        font-size: 12px;
      }
    }
  }
  .--noData {
    margin: 30px;
    color: #b5beec;
    font-size: 22px;
    font-weight: 500;
  }
  @media only screen and (max-width: 460px) {
    .NoData {
      font-size: 16px;
    }
  }
`;

function MyStudent({ dataStudent, dataStudentsProgressReport }) {
  const [open, setOpen] = React.useState({});
  const [windowWidth, setWindowWidth] = React.useState(0);

  React.useEffect(() => {
    if (dataStudent) {
      const stateOpen = {};
      dataStudent.forEach((item) => {
        stateOpen[`student${item.id}`] = false;
      });
      setOpen(stateOpen);
    }
  }, [dataStudent]);

  const handleClick = (idStudent) => () => {
    setOpen({
      ...open,
      [idStudent]: !open[idStudent],
    });
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  // const handleClickDropdow = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const history = useHistory();
  const oldHistoryState = history.location.state ? history.location.state : {};

  const handleClickAddReport = (item = {}) => () => {
    history.push("/dashboard/teacher/my-students-page/progress-report-form", {
      ...oldHistoryState,
      dataStudent: item,
    });
  };

  const handleClickViewProgressReport = (item = {}) => () => {
    history.push("/dashboard/teacher/my-students-page/progress-report", {
      ...oldHistoryState,
      progressReport: item,
    });
  };

  React.useLayoutEffect(() => {
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const updateSize = () => {
    setWindowWidth(window.innerWidth);
  };

  return (
    <StyledMyStudent>
      <div className="container">
        <div className="mystudent__inner">
          <div className="mystudent__inner__text">
            <Link to="/dashboard/teacher">Home</Link>
            <p className="arrow">
              <ChevronRight />
            </p>
            <p className="text-color">My Students</p>
          </div>
          <div className="list-student">
            {dataStudent &&
              dataStudent.map((item, index) => (
                <div className="mystudent-info" key={index}>
                  <div className="mystudent-info__item">
                    <div className="mystudent-info__item__left">
                      <img src={item.avatar || user} alt="avatar" />
                      <h4>{`${item.first_name} ${item.last_name}`}</h4>
                      {item.skills &&
                        item.skills.length &&
                        item.skills.map((item, index) => {
                          if (index === 0) {
                            return (
                              <p key={`skills-${index}`}>{item.instrument}</p>
                            );
                          } else {
                            return (
                              <p
                                key={`skills-${index}`}
                              >{`, ${item.instrument}`}</p>
                            );
                          }
                        })}
                    </div>
                    <div className="mystudent-info__item__right">
                      <p onClick={handleClickAddReport(item)}>
                        Add progress report
                      </p>
                      <IconButton onClick={handleClick(`student${item.id}`)}>
                        {open[`student${item.id}`] ? (
                          <ExpandLess />
                        ) : (
                          <ExpandMore />
                        )}
                      </IconButton>
                    </div>
                  </div>
                  <Collapse
                    in={open[`student${item.id}`]}
                    timeout="auto"
                    unmountOnExit
                  >
                    <div className="collapse__inner">
                      <div className="collapse__header">
                        <div className="address --info">
                          <h3>
                            Home address{" "}
                            <span>
                              {item.address[0]} {item.address[1]}
                              {item.address[2] && `, ${item.address[2]}`}
                              {item.address[3] && `, ${item.address[3]}`}
                            </span>
                          </h3>
                        </div>
                        <div className="phone-number --info">
                          <h3>
                            Phone number
                            <span>{formatPhoneNumber(item.phone)}</span>
                          </h3>
                        </div>
                        {/* <div className="sort-by ">
                          <IconButton>
                            <SyncAlt />
                          </IconButton>
                          <span>Sort by</span>
                          <IconButton
                            aria-label="ArrowDropDown"
                            aria-controls="simple-menu"
                            aria-haspopup="true"
                            onClick={handleClickDropdow}
                          >
                            <ArrowDropDown />
                          </IconButton>
                        </div> */}
                      </div>
                      <div className="collapse__body">
                        {dataStudentsProgressReport &&
                        dataStudentsProgressReport[item.id] &&
                        dataStudentsProgressReport[item.id].length ? (
                          <Table borderless>
                            <tbody>
                              {dataStudentsProgressReport[item.id].map(
                                (progressReportItem, indexItem) => (
                                  <tr key={indexItem}>
                                    <td>
                                      {" "}
                                      <img src={file} alt="file" />{" "}
                                      {moment(
                                        progressReportItem.reported_date
                                      ).format("MMMM, YYYY")}
                                    </td>
                                    <td>
                                      {windowWidth > 450 ? (
                                        progressReportItem.rating === 1 ? (
                                          <img src={star} alt="star" />
                                        ) : progressReportItem.rating === 2 ? (
                                          <>
                                            <img src={star} alt="star" />{" "}
                                            <img src={star} alt="star" />{" "}
                                          </>
                                        ) : (
                                          <>
                                            <img src={star} alt="star" />{" "}
                                            <img src={star} alt="star" />
                                            <img src={star} alt="star" />
                                          </>
                                        )
                                      ) : progressReportItem.rating === 1 ? (
                                        <span>
                                          1<img src={star} alt="start" />
                                        </span>
                                      ) : progressReportItem.rating === 2 ? (
                                        <span>
                                          2<img src={star} alt="start" />
                                        </span>
                                      ) : (
                                        <span>
                                          3<img src={star} alt="start" />
                                        </span>
                                      )}
                                    </td>
                                    <td>{progressReportItem.level}</td>
                                    <td>
                                      <p>{progressReportItem.comment}</p>
                                    </td>
                                    <td>
                                      <IconButton
                                        className="eye"
                                        onClick={handleClickViewProgressReport(
                                          progressReportItem
                                        )}
                                      >
                                        <VisibilityIcon />
                                      </IconButton>
                                    </td>
                                  </tr>
                                )
                              )}
                            </tbody>
                          </Table>
                        ) : (
                          <div className="--noData">
                            NO PROGRESS REPORTS YET
                          </div>
                        )}
                      </div>
                    </div>
                  </Collapse>
                </div>
              ))}
          </div>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Day</MenuItem>
            <MenuItem onClick={handleClose}>Rate</MenuItem>
          </Menu>
        </div>
      </div>
    </StyledMyStudent>
  );
}

export default MyStudent;
