import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Form, Label } from "reactstrap";
import { isEmpty } from "validator";
import { FormGroup } from "../../../common";
import save from "../../../../assets/images/save.svg";
import {
  formatPhoneNumber,
  getPhoneNumberOnlyDigits,
} from "../../../../utils/helpers";

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

const GeneralInfo = ({ data, handleSubmit }) => {
  const storeTeacherProfile = useSelector((store) => store.teacher.profile);
  const storeTeacherUpdateProfile = useSelector(
    (store) => store.teacher.updateProfile
  );
  const isSubmitting = storeTeacherUpdateProfile.loading;

  const [error, setError] = React.useState({});
  const [form, setForm] = React.useState({
    phoneNumber: "",
    email: "",
    address1: "",
    address2: "",
    city: "",
    zip: ""
  });

  React.useEffect(() => {
    setForm({
      ...form,
      phoneNumber: formatPhoneNumber(storeTeacherProfile.data.phone_number),
      email: storeTeacherProfile.data.email || "",
      address:
        storeTeacherProfile.data.address &&
        storeTeacherProfile.data.address.length > 2 &&
        storeTeacherProfile.data.address[0],
      city:
        storeTeacherProfile.data.address &&
        storeTeacherProfile.data.address.length > 2 &&
        storeTeacherProfile.data.address[1],
      zip:
        storeTeacherProfile.data.address &&
        storeTeacherProfile.data.address.length > 2 &&
        storeTeacherProfile.data.address[2]
    });
    // eslint-disable-next-line
  }, [storeTeacherProfile]);

  const handleSubmitForm = (event) => {
    event.preventDefault();
    const errorState = validate();
    if (Object.keys(errorState).length > 0) {
      return setError(errorState);
    }

    const formData = {
      phone: getPhoneNumberOnlyDigits(form.phoneNumber),
      address: [form.address, form.city, form.zip]
    };
    handleSubmit(formData);
  };

  const validate = () => {
    const errorState = {};
    // check validate

    if (isEmpty(form.phoneNumber)) {
      errorState.phoneNumber = "Phone number is required ";
    }
    if (isEmpty(form.city)) {
      errorState.city = "City is required ";
    }
    if (isEmpty(form.address)) {
      errorState.address1 = "Address 1 is required ";
    }
    if (isEmpty(form.zip)) {
      errorState.zip = "Zip is required ";
    }
    return errorState;
  };

  const handleChange = event => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleFocus = (event) => {
    setError({
      ...error,
      [event.target.name]: "",
    });
  };

  const handleChangeNumber = (e) => {
    const phoneNumber = e.target.value;
    if (phoneNumber.length > 14) {
      return;
    } else if (phoneNumber.length === 4) {
      return setForm({ ...form, phoneNumber });
    }
    setForm({ ...form, phoneNumber: formatPhoneNumber(phoneNumber) });
  };

  return (
    <StyledGeneralInfo>
      <Form onSubmit={handleSubmitForm}>
        <div className="form-info">
          <div className="form__item">
            <div className="form__item__inner">
              <Label>Phone number</Label>
              <FormGroup
                propsInput={{
                  name: "phoneNumber",
                  placeholder: "Enter your phone number here…",
                  onChange: handleChangeNumber,
                  onFocus: handleFocus,
                  value: form.phoneNumber,
                  disabled: isSubmitting,
                }}
                error={error.phoneNumber}
              />
            </div>
          </div>
          <div className="form__item">
            <div className="form__item__inner">
              <Label>Street address</Label>
              <FormGroup
                propsInput={{
                  name: "address",
                  placeholder: "Enter your street address here…",
                  onChange: handleChange,
                  onFocus: handleFocus,
                  value: form.address,
                  disabled: isSubmitting
                }}
                error={error.address1}
              />
            </div>
          </div>
          <div className="form__item">
            <div className="form__item__inner">
              <Label>ZIP Code</Label>
              <FormGroup
                propsInput={{
                  name: "zip",
                  placeholder: "Enter your ZIP Code here…",
                  onChange: handleChange,
                  onFocus: handleFocus,
                  value: form.zip,
                  disabled: isSubmitting
                }}
                error={error.zip}
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
                  disabled: isSubmitting
                }}
                error={error.city}
              />
            </div>
          </div>
        </div>
        <button className="find" disabled={isSubmitting}>
          Save my changes
          <span>
            <img src={save} alt="save" />
          </span>
        </button>
      </Form>
    </StyledGeneralInfo>
  );
};

export default GeneralInfo;
