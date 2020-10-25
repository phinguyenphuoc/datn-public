import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Label } from "reactstrap";
import { ModalBody } from "reactstrap";
import { Modal, FormGroup } from "../../../common";
import { isEmpty } from "validator";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import tick from "../../../../assets/images/tick-message.svg";
import logo from "../../../../assets/images/logo-format.svg";
import classNames from "classnames";
import {
  getCardSetup,
  postCardSave,
  resetCardSaveSuccess,
} from "../../../../redux/actions/parent";
import ErrorIcon from "@material-ui/icons/Error";

const StyledModal = styled(Modal)`
  && {
    max-width: 520px;
    padding: 0 15px;
    @media only screen and (max-width: 400px) {
      padding: 0 5px;
    }
    .modal-content {
      border: none;
      border-radius: 10px;
    }
    .modal-body {
      padding: 40px 20px;
    }
    .modal-message {
      .message {
        background: #f6732f;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        color: #ffffff;
        text-align: center;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        h5 {
          font-size: 23px;
          margin-bottom: 80px;
        }
        .img-tick {
          width: 110px;
          height: 110px;
        }
        h4 {
          font-size: 27px;
        }
        p {
          font-size: 14px;
          margin-bottom: 60px;
        }
        .img-logo {
          position: absolute;
          right: -13px;
          bottom: 0;
          width: 160px;
        }
      }
    }
    @media only screen and (max-width: 480px) {
      .modal-message {
        .message {
          h5 {
            font-size: 21px;
            margin-bottom: 44px;
          }
          .img-tick {
            width: 90px;
            height: 90px;
          }
          h4 {
            font-size: 21px;
            margin-bottom: 8px;
            line-height: 15px;
          }
          p {
            font-size: 10px;
            margin-bottom: 30px;
            line-height: 17px;
          }
          .img-logo {
            width: 140px;
          }
        }
      }
    }
    .modal-inner {
      max-width: 400px;
      margin: 0 auto;
      h5 {
        color: #0c1544;
        font-size: 16px;
      }
    }
    form {
      .form-inner {
        margin: 50px 0;
        .form-info__group {
          overflow: hidden;
        }
        .form__item {
          width: 100%;
        }
        .number {
          margin-bottom: 20px;
        }
        label {
          margin-left: 10px;
          color: #082487;
          font-size: 9px;
        }
        .form-group {
          margin: 0 10px 20px 10px;
          input {
            min-height: 40px;
            border-radius: 4px;
            font-size: 12px;
            padding: 8px 8px 8px 15px;
            border: 1px solid #b5beec;
            &::placeholder {
              color: #979797;
            }
          }
        }
        .info-card {
          display: flex;
          .expiry,
          .cvv-code {
            width: 30%;
          }
          .zip-code {
            width: 40%;
          }
        }
      }
      .bt-group {
        text-align: center;
        .--bt {
          border-radius: 40px;
          height: 40px;
          border: none;
          font-size: 12px;
          transition: 0.3s ease;
          color: #fff;
          margin: 5px 10px;
          display: inline-block;
          padding: 0 20px;

          &:hover {
            transform: translateY(-3px);
            box-shadow: 0 4px 8px 0 #2d20a7;
          }
          &[disabled] {
            background: #8e8d9a;
            pointer-events: none;
          }
        }
        .button-back {
          background: #ffffff;
          border: 1px solid #6254e8;
          color: #6254e8;
          padding: 0 25px;
          &[disabled] {
            color: #fff;
          }
        }
        .button-save {
          background: #6254e8;
          padding: 0 25px;
        }
      }
    }
    @media only screen and (max-width: 480px) {
      .modal-body {
        padding: 40px 15px;
      }
      form .form-inner {
        margin: 20px 0;
        .form-group {
          label {
            margin-left: 0;
          }
          margin: 0 5px 12px 5px;
        }
        .number {
          margin-bottom: 12px;
        }
        .info-card {
          display: block;
          .cvv-code {
            .form-group {
              margin: 0 5px 12px 5px;
            }
          }
          .expiry,
          .cvv-code,
          .zip-code {
            width: 100%;
            margin-bottom: 12px;
          }
        }
      }
    }
  }
  .StripeElement {
    border-radius: 4px;
    min-height: 40px;
    padding: 10px 15px;
    color: #495057;
    border: 1px solid #b5beec;
    margin: 0 10px;
  }
  .errorStripe {
    width: 100%;
    margin-top: 0.25rem;
    font-size: 12px;
    color: #dc3545;
    padding: 0 10px;
    display: flex;
    align-items: center;
    line-height: 16px;
    svg {
      margin-right: 10px;
    }
    p {
      margin: 0;
    }
  }
  @media only screen and (max-width: 400px) {
    .errorStripe {
      line-height: 14px;
      font-size: 10px;
    }
  }
  @media only screen and (max-width: 480px) {
    .StripeElement {
      margin: 0 5px;
    }
  }
`;

const ModalCardUpdated = ({ isOpen, handleToggle }) => {
  const [error, setError] = React.useState("");
  const [form, setForm] = React.useState({
    nameOnCard: "",
    ZIPCode: "",
  });
  const [isSubmit, setIsSubmit] = React.useState(false);
  const [isLoadingConfirm, setIsLoadingConfirm] = React.useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const storeCardSave = useSelector((store) => store.parent.cardSave);
  const storeCardSetup = useSelector((store) => store.parent.cardSetup);
  const isSubmitting =
    storeCardSave.loading || storeCardSetup.loading || isLoadingConfirm;

  React.useEffect(() => {
    if (storeCardSave.error.status && storeCardSave.error) {
      setError(
        "Credit card information failed, please check your information and try again"
      );
    }
  }, [storeCardSave]);

  React.useEffect(() => {
    if (!isOpen) {
      setIsSubmit(false);
      setForm({ ...form, nameOnCard: "", ZIPCode: "" });
      setError("");
    }
    /* eslint-disable */
  }, [isOpen]);

  React.useEffect(() => {
    if (storeCardSave.success) {
      if (isOpen) {
        setTimeout(() => {
          handleToggle();
        }, 3000);
      }
      resetCardSaveSuccess();
    }
  }, [storeCardSave]);

  const handleSubmitForm = async (event) => {
    event.preventDefault();
    let errorMessage =
      "Credit card information failed, please check your information and try again";
    if (!stripe || !elements) {
      return;
    }
    if (isEmpty(form.nameOnCard) || isEmpty(form.ZIPCode)) {
      return setError(errorMessage);
    }
    getCardSetup(async (data) => {
      setIsLoadingConfirm(true);
      const result = await stripe.confirmCardSetup(
        data.card_setup.client_secret,
        {
          payment_method: {
            card: elements.getElement(CardNumberElement),
            billing_details: {
              name: form.nameOnCard,
              address: {
                postal_code: form.ZIPCode,
              },
            },
          },
        }
      );
      setIsLoadingConfirm(false);
      if (result.error) {
        switch (result.error.code) {
          case "card_declined":
            errorMessage =
              "Credit card declined, please check your information or add another credit card";
          // no default
        }
        return setError(errorMessage);
      }
      setError("");
      if (result.setupIntent.status === "succeeded") {
        // Show a success message to your customer
        // There's a risk of the customer closing the window before callback
        // execution. Set up a webhook or plugin to listen for the
        // payment_intent.succeeded event that handles any business critical
        // post-payment actions.
        const dataCard = {
          payment_method_id: result.setupIntent.payment_method,
        };
        postCardSave(dataCard, (data) => {
          setIsSubmit(!isSubmit);
        });
      }
    });
  };

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };
  const handleFocus = () => {
    setError("");
  };
  return (
    <StyledModal
      isOpen={isOpen}
      toggle={handleToggle}
      wrapClassName="wrap-modalDashboard"
      id="modal-card-updated"
      centered
    >
      <ModalBody
        className={classNames("modal-body", { "modal-message": isSubmit })}
      >
        <div className="modal-inner">
          <h5>Update my credit card</h5>
          <form onSubmit={handleSubmitForm}>
            <div className="form-inner">
              <div>
                <div className="form__item number">
                  <div className="form__item__inner ">
                    <Label>CARD NUMBER</Label>
                    <CardNumberElement onFocus={handleFocus} />
                  </div>
                </div>
                <div className="form__item">
                  <div className="form__item__inner">
                    <Label>NAME ON CARD</Label>
                    <FormGroup
                      propsInput={{
                        name: "nameOnCard",
                        placeholder: "Enter your name on card  here…",
                        onChange: handleChange,
                        value: form.nameOnCard,
                        onFocus: handleFocus,
                      }}
                    />
                  </div>
                </div>
                <div className="form__item info-card">
                  <div className="expiry">
                    <Label>EXPIRY DATE</Label>
                    <CardExpiryElement onFocus={handleFocus} />
                  </div>
                  <div className="cvv-code">
                    <Label>CVV CODE</Label>
                    <CardCvcElement onFocus={handleFocus} />
                  </div>
                  <div className="zip-code">
                    <Label>ZIP CODE</Label>
                    <FormGroup
                      propsInput={{
                        type: "number",
                        name: "ZIPCode",
                        placeholder: "ZIP code",
                        onChange: handleChange,
                        value: form.ZIPCode,
                        onFocus: handleFocus,
                      }}
                    />
                  </div>
                </div>
              </div>
              {error && (
                <div className="errorStripe">
                  <ErrorIcon />
                  <p>{error}</p>
                </div>
              )}
            </div>
            <div className="bt-group">
              <button
                className=" --bt button-back fw-500"
                onClick={handleToggle}
                disabled={isSubmitting}
              >
                Back
              </button>
              <button
                className="--bt button-save fw-500"
                disabled={isSubmitting}
              >
                Save my changes
              </button>
            </div>
          </form>
        </div>
        {isSubmit && (
          <div className="message">
            <h5>Success</h5>
            <div>
              <img src={tick} alt="tick" className="img-tick" />
              <h4>Card succesfully added </h4>
              <p>This credit card is now linked to your account. </p>
            </div>
            <img src={logo} alt="logo" className="img-logo" />
          </div>
        )}
      </ModalBody>
    </StyledModal>
  );
};

export default ModalCardUpdated;
