import React from "react";
import styled from "styled-components";
import { Form, Table } from "reactstrap";
import { IconButton } from "@material-ui/core";
import moment from "moment";
import { FormGroup, SingleSelectFormat, Loading } from "../../../common";
import AddIcon from "@material-ui/icons/Add";
// import SearchIcon from "@material-ui/icons/Search";
import { OPTIONS_MONTHS, OPTIONS_YEARS } from "../../../../utils/constants";
import {
  updateDatePaymentsInvoices,
  getPaymentsInvoices,
} from "../../../../redux/actions/parent";
import noData from "../../../../assets/images/no-data-payment.svg";
import file from "../../../../assets/images/file-pdf.svg";
import dowload from "../../../../assets/images/dowload.svg";
import { formatExp } from "../../../../utils/helpers";
import { useSelector } from "react-redux";

const StyledPayment = styled.section`
  margin: 30px 15px auto;
  .form-info,
  .invoices {
    background: #ffffff;
    box-shadow: 0px 5px 25px rgba(98, 84, 232, 0.203944);
    border-radius: 4px;
    max-width: 1340px;
    p {
      text-align: left;
      color: #08135a;
      font-size: 14px;
    }
  }
  .form-info {
    padding: 30px 28px 28px;
    margin: 0 auto 30px;
    .form-inner {
      border: 2px solid #b5beec;
      border-radius: 4px;
      padding: 20px 18px;
      p {
        font-weight: 400;
      }
      > div {
        overflow: hidden;
      }
      .--nodata {
        div {
          font-size: 21px;
          color: #b5beec;
        }
      }
    }

    .form-info__group {
      overflow: hidden;
    }
    .--form {
      display: flex;
      align-items: center;
      justify-content: center;
      > div {
        display: flex;
        max-width: 850px;
      }
    }
    .form__item {
      display: flex;
      width: 50%;
      > div {
        flex: 1;
      }
      p {
        margin-left: 10px;
        color: #b5beec;
        font-size: 9px;
        margin-bottom: 10px;
      }
    }
    .form-group {
      margin: 0 10px 20px 10px;
      input {
        min-height: 36px;
        font-size: 12px;
        padding: 0px;
        border: none;
        &[disabled] {
          background: #fff;
        }
      }
    }
    @media only screen and (max-width: 880px) {
      .form__item {
        width: 100%;
        .form__item__inner {
          width: 50%;
        }
      }
      .--form > div {
        display: block;
      }
      .form-group input {
        border-radius: 4px;
        padding: 8px 8px 8px 15px;
        border: 1px solid #b5beec;
      }
    }
    @media only screen and (max-width: 550px) {
      .form__item {
        .form__item__inner {
          width: 100%;
        }
      }
      .number-name-card {
        display: block;
      }
      .info-card {
        .expiry-date,
        .zip-code,
        .cvv-code {
          width: 100%;
        }
      }
      .--form {
        display: block;
      }
    }
    @media only screen and (max-width: 440px) {
      padding: 30px 10px 10px;
      .form-inner {
        padding: 20px 5px;
        .--nodata {
          div {
            font-size: 18px;
            color: #b5beec;
            margin-bottom: 10px;
            line-height: 22px;
          }
        }
      }
      .form-group {
        input {
          font-size: 10px;
        }
      }
      .form__item {
        display: block;
        p {
          margin-bottom: 0px;
        }
      }
    }
  }
  .checkbox {
    display: block;
    position: relative;
    padding-left: 35px;
    cursor: pointer;
    user-select: none;
    .input_checkbox {
      position: absolute;
      opacity: 0;
      cursor: pointer;
      height: 0;
      width: 0;
      &:checked ~ .checkmark:after {
        display: block;
      }
      &:checked ~ .checkmark {
        background: #6254e8;
        border: none;
      }
    }
    .checkmark {
      position: absolute;
      left: 10px;
      top: 30px;
      height: 20px;
      width: 20px;
      background-color: #fff;
      border: 2px solid #b5beec;
      border-radius: 100%;
      &:after {
        content: "";
        position: absolute;
        display: none;
        border: 2px solid #fff;
        border-radius: 100%;
        top: 3px;
        left: 3px;
        width: 14px;
        height: 14px;
      }
    }
  }
  .add {
    border: none;
    padding: 3px 15px;
    font-size: 12px;
    color: #ffffff;
    line-height: 34px;
    font-weight: 500;
    transition: 0.3s ease;
    background: #6254e8;
    border-radius: 30px;
    margin: 10px;
    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 4px 8px 0 #6556f8;
    }
    svg {
      width: 20px;
      margin: 0 3px 2px 0;
    }
  }
  .invoices {
    padding: 30px 28px 60px;
    margin: 0 auto 50px;
    .invoices__header {
      display: flex;
      justify-content: space-between;
      .invoices__date {
        display: flex;
        width: 100%;
        max-width: 300px;
        > div {
          width: 50%;
        }
      }
    }
  }
  .-noData-incoice {
    padding-top: 20px;
    div {
      color: #b5beec;
      font-size: 21px;
      text-align: left;
    }
    img {
      width: 80%;
      max-width: 460px;
    }
  }
  .invoices__search {
    position: relative;
    input {
      width: 100%;
      border: 1px solid #ced4da;
      border-radius: 4px;
      padding: 7.5px 10px;
      &::placeholder {
        color: #b5beec !important;
      }
    }
    svg {
      position: absolute;
      right: 5px;
      top: 7px;
      width: 24px;
      height: 24px;
      color: #b5beec;
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
        padding: 10px 15px 10px 0;
      }
      td {
        color: #08135a;
        font-size: 12px;
        text-align: left;
        padding: 10px 15px 10px 0;
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

  @media only screen and (max-width: 755px) {
    .invoices .invoices__header {
      display: block;
      .invoices__date {
        max-width: inherit;
      }
    }
  }
  @media only screen and (max-width: 677px) {
    margin: 30px 0px auto;
  }
  @media only screen and (max-width: 650px) {
    table tr td:nth-child(3),
    th:nth-child(3) {
      display: none;
    }
  }
  @media only screen and (max-width: 550px) {
    .invoices .invoices__header .invoices__date {
      flex-direction: column;
      > div {
        width: 100%;
        max-width: 175px;
        margin: 0 auto 7px;
      }
    }
  }
  @media only screen and (max-width: 440px) {
    .form-info .add {
      float: inherit;
    }
    .-noData-incoice div {
      font-size: 18px !important;
      line-height: 20px;
    }
  }
  .edit {
    cursor: pointer;
    color: #6254e8;
    border-bottom: 1px solid #6254e8;
    &:hover {
      color: #f6732f;
      border-bottom: 1px solid #f6732f;
    }
  }
  @media only screen and (max-width: 880px) {
    .edit {
      top: 119px;
    }
  }
  @media only screen and (max-width: 550px) {
    .edit {
      position: inherit;
      width: 27px;
      float: right;
      margin-right: 13px;
    }
  }
  @media only screen and (max-width: 450px) {
    .invoices {
      padding: 30px 15px;
    }
  }
  @media only screen and (max-width: 440px) {
    .checkbox {
      padding-left: 26px;
    }
    .checkmark {
      left: 5px;
    }
  }
`;

function Payment({ handleToggleModalCardUpdated, storeCardInfo }) {
  // const [form, setForm] = React.useState({
  //   option: null
  // });

  // const handleCheckbox = event => {
  //   setForm({
  //     ...form,
  //     reason: event.target.value
  //   });
  // };
  const storeDateInvoices = useSelector(
    (store) => store.parent.datePaymentsInvoices
  );
  const storePaymentsInvoices = useSelector(
    (store) => store.parent.paymentsInvoices
  );
  const isLoadingInvoices = storePaymentsInvoices.loading;
  const formatMonth = moment(storeDateInvoices).format("MMMM");
  const formatYear = moment(storeDateInvoices).format("YYYY");
  React.useEffect(() => {
    getPaymentsInvoices(moment(storeDateInvoices).format("YYYY-MM"));
  }, [storeDateInvoices]);
  const handleChangeMonth = ({ value }) => {
    updateDatePaymentsInvoices(moment(storeDateInvoices).month(value));
  };
  const handleChangeYear = ({ value }) => {
    updateDatePaymentsInvoices(moment(storeDateInvoices).year(value));
  };

  const isLoadingCardInfo = storeCardInfo.loading;
  return (
    <StyledPayment>
      <div className="container">
        <Form className="form-info">
          <p>Credit card </p>
          <div className="form-inner">
            <p>Credit card on file</p>
            {isLoadingCardInfo ? (
              <Loading />
            ) : storeCardInfo.data && Object.keys(storeCardInfo.data).length ? (
              <div>
                <div className="form-info__group">
                  {/* <label className="checkbox"> */}
                  {/* <input
                      type="radio"
                      className="input_checkbox"
                      name="reason"
                      onChange={handleCheckbox}
                      value={1}
                      checked
                    />
                    <span className="checkmark"></span> */}
                  <div className="--form">
                    <div>
                      <div className="form__item number-name-card">
                        <div className="form__item__inner">
                          <p>CARD NUMBER</p>
                          <FormGroup
                            propsInput={{
                              name: "cardNumber",
                              placeholder: "Card number ",
                              value: `**** **** **** ${storeCardInfo.data.last4}`,
                              disabled: true,
                            }}
                          />
                        </div>
                        <div className="form__item__inner">
                          <p>NAME ON CARD</p>
                          <FormGroup
                            propsInput={{
                              name: "nameOnCard",
                              placeholder: "Name on card ",
                              value: storeCardInfo.data.name,
                              disabled: true,
                            }}
                          />
                        </div>
                      </div>
                      <div className="form__item info-card">
                        <div className=" expiry-date">
                          <p>EXPIRY DATE</p>
                          <FormGroup
                            propsInput={{
                              name: "expiry date",
                              placeholder: " expiry date ",
                              value: formatExp(
                                storeCardInfo.data.exp_month,
                                storeCardInfo.data.exp_year
                              ),
                              disabled: true,
                            }}
                          />
                        </div>
                        <div className=" cvv-code">
                          <p>CVV CODE</p>
                          <FormGroup
                            propsInput={{
                              name: "CVVCode",
                              placeholder: "CVV code",
                              value: "***",
                              disabled: true,
                            }}
                          />
                        </div>
                        <div className=" zip-code">
                          <p>ZIP code</p>
                          <FormGroup
                            propsInput={{
                              name: "zipCode",
                              placeholder: "zip code",
                              value:
                                storeCardInfo.data.address &&
                                storeCardInfo.data.address.postal_code,
                              disabled: true,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div
                      className="edit"
                      onClick={handleToggleModalCardUpdated}
                    >
                      Edit
                    </div>
                  </div>
                  {/* </label> */}
                </div>
              </div>
            ) : (
              <div className="--nodata">
                <div>No credit card linked to your account</div>
                <button
                  className="add find"
                  onClick={handleToggleModalCardUpdated}
                >
                  {" "}
                  <AddIcon />
                  Add a new credit card
                </button>
              </div>
            )}
          </div>
        </Form>
        <div className="invoices">
          <div className="invoices__header">
            <p>Invoices</p>
            <div className="invoices__date">
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
          <div className="invoices__body">
            {isLoadingInvoices ? (
              <Loading />
            ) : storePaymentsInvoices.data &&
              storePaymentsInvoices.data.length ? (
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
                  {storePaymentsInvoices.data.map((item, index) => (
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
              <div className="-noData-incoice">
                <div>No invoices found</div>
                <img src={noData} alt="noData" />
              </div>
            )}
          </div>
        </div>
      </div>
    </StyledPayment>
  );
}

export default Payment;
