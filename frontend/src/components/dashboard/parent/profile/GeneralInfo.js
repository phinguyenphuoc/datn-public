import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Form, Label } from "reactstrap";
import { FormGroup } from "../../../common";
import { isEmpty } from "validator";
import {
  formatPhoneNumber,
  getPhoneNumberOnlyDigits,
} from "../../../../utils/helpers";
// import { DatePicker } from "@material-ui/pickers";
import save from "../../../../assets/images/save.svg";
import moment from "moment";

const StyledGeneralInfo = styled.section`
  .form-info {
    padding: 30px 20px 10px;
    display: flex;
    flex-wrap: wrap;
    .form__item {
      float: left;
      width: 40%;
      text-align: left;
    }
    label {
      margin-left: 10px;
      font-size: 12px;
      font-weight: 600;
    }
    .date-of-birth {
      width: calc(100% - 20px);
      margin: 0 10px;
      > div:before {
        border-bottom: 1px solid #ced4da;
      }
      input {
        padding: 8px;
        border: 1px solid #ced4da;
        border-bottom: none;
        border-radius: 4px;
        font-size: 12px;
      }
      .Mui-disabled {
        background-color: #e9ecef;
        color: #495057;
      }
    }
    .form-group {
      margin: 0 10px 20px 10px;
      input {
        min-height: 36px;
        border-radius: 4px;
        font-size: 12px;
        padding: 8px;
      }
    }
    @media only screen and (max-width: 1190px) {
      .form__item {
        width: 50%;
      }
    }
    @media only screen and (max-width: 615px) {
      .form__item {
        width: 100%;
      }
    }
    @media only screen and (max-width: 370px) {
      padding: 30px 10px 10px;
      label {
        font-size: 11px;
      }
      .form-group {
        input {
          font-size: 10px;
        }
      }
    }
  }
  .wrap-button {
    width: 100%;
    overflow: hidden;
  }
  .find {
    border: none;
    padding: 3px 8px 3px 20px;
    font-size: 12px;
    color: #ffffff;
    line-height: 34px;
    font-weight: 500;
    transition: 0.3s ease;
    background: #54c052;
    border-radius: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 4px 8px 0 #2d972b;
    }
    &[disabled] {
      background: #717272;
      pointer-events: none;
      span {
        background: #4d4d4d;
      }
    }
    span {
      padding: 7px 7px;
      border-radius: 100%;
      margin-left: 5px;
      background: #2d972b;
      display: inline-flex;
      img {
        width: 16px;
        height: 16px;
      }
    }
  }
`;

function GeneralInfo({ handleSubmit }) {
  const storeParentProfile = useSelector((store) => store.parent.profile);
  const storeParentUpdateProfile = useSelector(
    (store) => store.parent.updateProfile
  );
  const isSubmitting = storeParentUpdateProfile.loading;
  // const maxDate = moment().subtract(18, "year");
  const [error, setError] = React.useState({});
  // const [dayOfBirth, setDayOfBirth] = React.useState(maxDate);
  const [form, setForm] = React.useState({
    firstName: "",
    lastName: "",
    phone_number: "",
    email: "",
    address: "",
    city: "",
    addressZip: "",
  });

  React.useEffect(() => {
    const address =
      storeParentProfile.data.address &&
        storeParentProfile.data.address.length >= 3
        ? storeParentProfile.data.address
        : ["", "", ""];
    setForm({
      ...form,
      firstName: storeParentProfile.data.first_name || "",
      lastName: storeParentProfile.data.last_name || "",
      phone_number: formatPhoneNumber(storeParentProfile.data.phone_number) || "",
      email: storeParentProfile.data.email || "",
      address: address[0],
      city: address[1],
      addressZip: address[2],
    });
    // setDayOfBirth(
    //   storeParentProfile.data.birth_date
    //     ? moment(storeParentProfile.data.birth_date)
    //     : maxDate
    // );
    // eslint-disable-next-line
  }, [storeParentProfile]);
  const handleSubmitForm = (event) => {
    event.preventDefault();
    const errorState = validate();
    if (Object.keys(errorState).length > 0) {
      return setError(errorState);
    }

    const formData = {
      first_name: form.firstName,
      last_name: form.lastName,
      phone_number: getPhoneNumberOnlyDigits(form.phone_number),
      // birth_date: moment(dayOfBirth).format("YYYY/MM/DD"),
      address: [form.address, form.city, form.addressZip],
      city: form.city
    };
    handleSubmit(formData);
  };
  const validate = () => {
    const errorState = {};
    // check validate
    if (isEmpty(form.firstName)) {
      errorState.firstName = "First name is required ";
    }
    if (isEmpty(form.lastName)) {
      errorState.lastName = "Last name is required ";
    }
    if (isEmpty(form.phone_number)) {
      errorState.phone_number = "Phone number is required ";
    }
    if (isEmpty(form.city)) {
      errorState.city = "City is required ";
    }
    if (
      isEmpty(form.address) &&
      isEmpty(form.addressZip)
    ) {
      errorState.address = "Address, Zip fields are required";
    }
    return errorState;
  };

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleFocus = (event) => {
    let name = event.target.name;
    if (name.includes("address")) {
      name = "address";
    }
    setError({
      ...error,
      [name]: "",
    });
  };

  const handleChangeNumber = (e) => {
    const phone_number = e.target.value;
    if (phone_number.length > 14) {
      return;
    } else if (phone_number.length === 4) {
      return setForm({ ...form, phone_number });
    }
    setForm({ ...form, phone_number: formatPhoneNumber(phone_number) });
  };

  // const handleDateChange = date => {
  //   setDayOfBirth(date);
  // };

  return (
    <StyledGeneralInfo>
      <Form className="form-info" onSubmit={handleSubmitForm}>
        <div className="form__item">
          <div className="form__item__inner">
            <Label>First name</Label>
            <FormGroup
              propsInput={{
                name: "firstName",
                placeholder: "Enter your first name here...",
                onChange: handleChange,
                onFocus: handleFocus,
                value: form.firstName,
                disabled: isSubmitting,
              }}
              error={error.firstName}
            />
          </div>
        </div>
        <div className="form__item">
          <div className="form__item__inner">
            <Label>Last name</Label>
            <FormGroup
              propsInput={{
                name: "lastName",
                placeholder: "Enter your last name here...",
                onChange: handleChange,
                onFocus: handleFocus,
                value: form.lastName,
                disabled: isSubmitting,
              }}
              error={error.lastName}
            />
          </div>
        </div>
        {/* <div className="form__item">
          <div className="form__item__inner">
            <Label>Date of birth</Label>
            <DatePicker
              disableFuture
              openTo="year"
              format="DD/MM/YYYY"
              views={["year", "month", "date"]}
              value={dayOfBirth}
              onChange={handleDateChange}
              maxDate={moment().subtract(17, "year")}
              minDate={moment("01/01/1925")}
              className="date-of-birth"
              disabled={isSubmitting}
            />
          </div>
        </div> */}
        <div className="form__item">
          <div className="form__item__inner">
            <Label>Phone number</Label>
            <FormGroup
              propsInput={{
                name: "phone_number",
                placeholder: "Enter your phone number here…",
                onChange: handleChangeNumber,
                onFocus: handleFocus,
                value: form.phone_number,
                disabled: isSubmitting,
              }}
              error={error.phone_number}
            />
          </div>
        </div>
        <div className="form__item">
          <div className="form__item__inner">
            <Label>Email address</Label>
            <FormGroup
              propsInput={{
                name: "email",
                placeholder: "Enter your email address here…",
                value: form.email,
                disabled: true,
              }}
            />
          </div>
        </div>
        <div className="form__item">
          <div className="form__item__inner">
            <Label>Address</Label>
            <FormGroup
              propsInput={{
                name: "address",
                placeholder: "Enter your street address here…",
                onChange: handleChange,
                onFocus: handleFocus,
                value: form.address,
                disabled: isSubmitting,
              }}
              error={error.address}
            />
          </div>
        </div>
        <div className="form__item">
          <div className="form__item__inner">
            <Label>ZIP</Label>
            <FormGroup
              propsInput={{
                name: "addressZip",
                placeholder: "Enter your ZIP Code here…",
                onChange: handleChange,
                onFocus: handleFocus,
                value: form.addressZip,
                disabled: isSubmitting,
              }}
              error={error.address}
            />
          </div>
        </div>
        <div className="form__item">
          <div className="form__item__inner">
            <Label>City</Label>
            <FormGroup
              propsInput={{
                name: "city",
                placeholder: "Enter your city here…",
                onChange: handleChange,
                onFocus: handleFocus,
                value: form.city,
                disabled: isSubmitting,
              }}
              error={error.city}
            />
          </div>
        </div>
        <div className="wrap-button">
          <button className="find" disabled={isSubmitting}>
            Save my changes
            <span>
              <img src={save} alt="save" />
            </span>
          </button>
        </div>
      </Form>
    </StyledGeneralInfo>
  );
}

export default GeneralInfo;
