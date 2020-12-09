import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Form, Label } from "reactstrap";
import { isEmpty } from "validator";
import { FormGroup } from "../../../common";
import save from "../../../../assets/images/save.svg";
import { validatePassword } from "../../../../utils/helpers";

const StyledPassword = styled.section`
  .form-info {
    padding: 30px 20px 10px;
    .form__item {
      width: 100%;
      text-align: left;
      max-width: 340px;
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

function Password({ handleSubmit, err }) {
  const isSubmitting = false;

  const [error, setError] = React.useState({});
  const [form, setForm] = React.useState({
    currentPassword: "",
    newPassword: "",
    newPasswordConfirm: ""
  });

  const submitErr = err !== "" ? err : undefined;

  const handleSubmitForm = (event) => {
    event.preventDefault();
    const errorState = validate();
    if (Object.keys(errorState).length > 0) {
      return setError(errorState);
    }
    const auth = localStorage.getItem("auth");
    const userLogin = auth ? JSON.parse(auth).user_login : "";

    const formData = {
      current_password: form.currentPassword,
      new_password: form.newPassword,
      login: userLogin,
    };

    handleSubmit(formData);
  };

  const validate = () => {
    const errorState = {};
    // check validate
    if (isEmpty(form.currentPassword)) {
      errorState.currentPassword = "Current password is required";
    }
    if (isEmpty(form.newPassword)) {
      errorState.newPassword = "New password is required";
    }
    if (isEmpty(form.newPasswordConfirm)) {
      errorState.newPasswordConfirm = "Confirm password is required";
    } else if (form.newPasswordConfirm !== form.newPassword) {
      errorState.newPasswordConfirm = "Confirm password is wrong";
    }

    return errorState;
  };

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleFocus = (event) => {
    setError({
      ...error,
      [event.target.name]: "",
    });
  };
  return (
    <StyledPassword>
      <Form className="form-info" onSubmit={handleSubmitForm}>
        <div className="form__item">
          <div className="form__item__inner">
            <Label>Current password</Label>
            <FormGroup
              propsInput={{
                name: "currentPassword",
                type: "password",
                placeholder: "Enter your current password here…",
                onChange: handleChange,
                onFocus: handleFocus,
                value: form.currentPassword,
                disabled: isSubmitting,
              }}
              error={error.currentPassword || submitErr}
            />
          </div>
        </div>
        <div className="form__item">
          <div className="form__item__inner">
            <Label>New password</Label>
            <FormGroup
              propsInput={{
                name: "newPassword",
                type: "password",
                placeholder: "Enter your new password here…",
                onChange: handleChange,
                onFocus: handleFocus,
                value: form.newPassword,
                disabled: isSubmitting,
              }}
              error={error.newPassword}
            />
          </div>
        </div>
        <div className="form__item">
          <div className="form__item__inner">
            <Label>New password (confirm)</Label>
            <FormGroup
              propsInput={{
                name: "newPasswordConfirm",
                type: "password",
                placeholder: "Confirm your new password here…",
                onChange: handleChange,
                onFocus: handleFocus,
                value: form.newPasswordConfirm,
                disabled: isSubmitting,
              }}
              error={error.newPasswordConfirm}
            />
          </div>
        </div>
        <button className="find" disabled={isSubmitting}>
          Save my changes
          <span>
            <img src={save} alt="save" />
          </span>
        </button>
      </Form>
    </StyledPassword>
  );
}

export default Password;
