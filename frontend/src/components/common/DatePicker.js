import React from "react";
import { DatePicker as MuiDatePicker } from "@material-ui/pickers";
import styled from "styled-components";
import classNames from "classnames";

const StyledDatePicker = styled.div`
  && {
    .MuiPickersCalendarHeader-switchHeader {
      background: #08135a;
      color: #fff;
      border-radius: 4px;
      padding: 0px 4px;
      margin: 0 0 28px;
      .MuiPickersCalendarHeader-transitionContainer {
        height: 58px;
        p {
          font-size: 18px;
          font-weight: 600;
          line-height: 30px;
          top: calc(50% - 14px);
        }
      }
      button {
        background: transparent;
        color: #fff;
        svg {
          font-size: 25px;
        }
      }
    }
    .MuiPickersCalendarHeader-daysHeader {
      margin-bottom: 20px;
      span {
        color: #0c1544;
        font-size: 14px;
        text-transform: uppercase;
        font-weight: 600;
      }
    }
    .MuiPickersBasePicker-pickerView {
      max-width: 600px;
      min-height: 440px;
      overflow-x: inherit;
      margin-bottom: 57px;
    }
    .MuiPickersDay-daySelected {
      background: ${({ isSetColorSelectedDate }) =>
        isSetColorSelectedDate ? "#6254e8" : "transparent"};
      color: ${({ isSetColorSelectedDate }) =>
        isSetColorSelectedDate ? "#fff" : "rgba(0, 0, 0, 0.87)"};
    }
    .MuiPickersDay-current {
      color: #f6732f;
      font-weight: bold;
    }
    .MuiPickersCalendarHeader-daysHeader,
    .MuiPickersCalendar-week {
      justify-content: space-around;
    }
    .custom-date {
      p {
        font-size: 14px;
      }
      position: relative;
      margin: 5px;
      .MuiPickersDay-day {
        width: 40px;
        height: 40px;
      }
      .MuiPickersDay-hidden ~ .indicators {
        display: none;
      }
      .indicators {
        position: absolute;
        width: 90%;
        bottom: 0;
        left: 5%;
        height: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .--confirmed,
      .--rescheduled,
      .--cancelled {
        width: 100%;
        height: 100%;
        margin: 0 1px;
        border-radius: 4px;
      }
      .--confirmed {
        background: #54c052;
      }
      .--rescheduled {
        background: #f6732f;
      }
      .--cancelled {
        background: #dc3545;
      }
      &.-is-clicked {
        .MuiPickersDay-day {
          color: #fff;
          background: #6254e8;
        }
        .indicators {
          display: none;
        }
      }
    }
    @media (max-width: 1130px) {
      .custom-date {
        margin: 3px;
        .MuiPickersDay-day {
          width: 36px;
          height: 36px;
        }
      }
      .MuiPickersBasePicker-pickerView {
        margin-bottom: 15px;
      }
    }
    @media (max-width: 400px) {
      .custom-date p {
        font-size: 12px;
      }
      .MuiPickersStaticWrapper-staticWrapperRoot {
        min-width: 255px;
      }
      .MuiPickersBasePicker-pickerView {
        min-width: 255px;
        min-height: 310px;
      }
      .MuiPickersCalendarHeader-dayLabel {
        width: 30px;
      }
      .MuiPickersCalendar-transitionContainer {
        min-height: 180px;
      }
      .custom-date .MuiPickersDay-day {
        width: 28px;
        height: 28px;
      }
      .MuiPickersCalendarHeader-switchHeader
        .MuiPickersCalendarHeader-transitionContainer
        p {
        font-size: 16px;
      }
      .MuiPickersCalendarHeader-daysHeader {
        margin-bottom: 0;
        span {
          font-size: 12px;
        }
      }
    }
  }
`;

const DatePicker = ({
  dateBooked = [],
  dateRescheduled = [],
  dateCancelled = [],
  dateClicked,
  onClickDate = () => {},
  isSetColorSelectedDate = true,
  ...restProps
}) => {
  const ref = React.useRef(null);

  const dateClickedFormat = dateClicked
    ? dateClicked.format("YYYY-MM-DD")
    : null;

  const renderDay = (day, selectedDate, isInCurrentMonth, dayComponent) => {
    const currentDate = day.format("YYYY-MM-DD");

    const isClicked = dateClickedFormat === currentDate;
    const isDateBooked = dateBooked.includes(currentDate);
    const isDateRescheduled = dateRescheduled.includes(currentDate);
    const isDateCancelled = dateCancelled.includes(currentDate);

    return (
      <div
        className={classNames("custom-date", { "-is-clicked": isClicked })}
        onClick={onClickDate(day)}
      >
        {dayComponent}
        <div className="indicators">
          {isDateBooked && <span className="--confirmed"></span>}
          {isDateRescheduled && <span className="--rescheduled"></span>}
          {isDateCancelled && <span className="--cancelled"></span>}
        </div>
      </div>
    );
  };

  return (
    <StyledDatePicker ref={ref} isSetColorSelectedDate={isSetColorSelectedDate}>
      <MuiDatePicker
        {...restProps}
        renderDay={renderDay}
        ToolbarComponent={(props) => null}
      />
    </StyledDatePicker>
  );
};

export default DatePicker;
