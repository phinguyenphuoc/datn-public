import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import classNames from "classnames";
import { ModalBody, Form } from "reactstrap";
import { Modal, FormGroup, ModalBanner } from "../../../common";
import { isEmpty } from "validator";
import { getCardSetup } from "../../../../redux/actions/parent";
import ErrorIcon from "@material-ui/icons/Error";
import tick from "../../../../assets/images/tick-CC-welcome.svg";

const StyledModal = styled(Modal)`
  && {
    max-width: 760px;
    @media only screen and (max-width: 400px) {
      padding: 20px 5px;
    }
    .modal-content {
      border: 0;
      border-radius: 4px;
      box-shadow: 0px 0px 6px 1px #696969;
    }
    .modal-message {
      h3,
      .note {
        display: none;
      }
      form {
        padding: 40px 16px 20px !important;
      }
    }
    .modal-body {
      text-align: center;
      padding: 0 0 30px;
      h3 {
        font-size: 20px;
        margin-bottom: 20px;
        background: #f6732f;
        line-height: 2.125;
        color: #fff;
      }
      .note {
        line-height: 20px;
        padding: 0 12px;
        font-size: 13px;
        p {
          text-align: center;
          color: #000000;
          width: 100%;
          max-width: 460px;
          margin: 0 auto;
        }
      }
      form {
        max-width: 680px;
        margin: 0 auto;
        padding: 20px 16px 20px;
        color: #000000;
        .form__wrapper {
          background: #f2f4fd;
          border: 1px solid #b5beec;
          border-radius: 4px;
          padding: 32px;
          margin: 0px 0 24px;
          overflow: hidden;
          display: flex;
          flex-wrap: wrap;
        }
        .form__item {
          width: 50%;
          float: left;
          padding: 8px;
          &:nth-child(3),
          &:nth-child(4),
          &:nth-child(5) {
            width: 33.33%;
          }
        }
        .message {
          color: #08135a;
          width: 100%;
          h5 {
            font-size: 21px;
            margin-bottom: 30px;
          }
          img {
            width: 70px;
            height: 70px;
          }
          h6 {
            font-size: 18px;
          }
          p {
            text-align: center;
            margin-bottom: 0;
          }
        }
        h4 {
          font-weight: 400;
          text-align: left;
          font-size: 16px;
        }
        input {
          min-height: 44px;
          font-size: 0.9rem;
          border-radius: 12px;
          &::placeholder {
            color: #979797;
          }
        }
        p {
          color: #08135a;
          font-size: 14px;
          text-align: left;
          line-height: 20px;
          margin-bottom: 32px;
          a {
            color: #7e72f2;
            border-bottom: 2px solid #7e72f2;
            &:hover {
              color: #3425c7;
            }
          }
        }
        button {
          background: #7e72f2;
          border: none;
          border-radius: 30px;
          padding: 10px 35px;
          color: #ffffff;
          font-size: 16px;
          transition: 0.3s ease;
          &:hover {
            transform: translateY(-3px);
            box-shadow: 0 4px 8px 0 #2d20a7;
          }
          &[disabled] {
            background: #8e8d9a;
            pointer-events: none;
          }
        }
      }

      @media only screen and (max-width: 830px) {
        h3 {
          font-size: 16px;
          line-height: 24px;
          padding: 10px 12px;
        }
      }
      @media only screen and (max-width: 610px) {
        form {
          p {
            font-size: 12px;
            line-height: 18px;
            margin-bottom: 8%;
          }
          .form__wrapper {
            padding: 24px 16px 12px;
          }
        }
      }
      @media only screen and (max-width: 520px) {
        form {
          .form__item {
            width: 100% !important;
          }
        }
      }
      @media only screen and (max-width: 440px) {
        padding: 0 0 15px;
        h3 {
          font-size: 13px;
          line-height: 18px;
          padding: 10px 10px;
        }
        form {
          button {
            border-radius: 30px;
            padding: 10px 25px;
            font-size: 12px;
          }
          h4 {
            font-size: 14px;
          }
        }
      }
    }
    .invalid-feedback {
      text-align: left;
    }
    .StripeElement {
      border-radius: 12px;
      min-height: 44px;
      padding: 10px 25px;
      color: #495057;
      border: 1px solid #ced4da;
      background: #fff;
      & > div {
        top: 4px !important;
      }
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
      text-align: left;
      svg {
        margin-right: 10px;
      }
    }
  }
`;

const ModalPaymentMethodUpdated = ({
  isOpen,
  onComplete,
  isPasswordUpdateSetToFalse,
  isSubmitCard,
  clickAccess,
}) => {
  const [error, setError] = React.useState("");
  const [form, setForm] = React.useState({
    nameOnCard: "",
    ZIPCode: "",
  });
  const [isLoadingConfirm, setIsLoadingConfirm] = React.useState(false);

  // React.useEffect(() => {
  //   getCardSetup();
  // }, []);

  const stripe = useStripe();
  const elements = useElements();

  const client_secret = useSelector(
    (store) => store.parent.cardSetup.data.client_secret
  );
  const storeCardSave = useSelector((store) => store.parent.cardSave);
  const isSubmitting = storeCardSave.loading || isLoadingConfirm;

  React.useEffect(() => {
    if (storeCardSave.error.status && storeCardSave.error) {
      setError(
        "Credit card information failed, please check your information and try again"
      );
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
    setIsLoadingConfirm(true);
    const result = await stripe.confirmCardSetup(client_secret, {
      payment_method: {
        card: elements.getElement(CardNumberElement),
        billing_details: {
          name: form.nameOnCard,
          address: {
            postal_code: form.ZIPCode,
          },
        },
      },
    });

    setIsLoadingConfirm(false);

    if (!stripe || !elements) {
      return;
    }
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
    // The payment has been processed!
    if (result.setupIntent.status === "succeeded") {
      // Show a success message to your customer
      // There's a risk of the customer closing the window before callback
      // execution. Set up a webhook or plugin to listen for the
      // payment_intent.succeeded event that handles any business critical
      // post-payment actions.
      const dataCard = {
        payment_method_id: result.setupIntent.payment_method,
      };
      onComplete(dataCard);
    }
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
      wrapClassName="wrap-modalDashboard"
      id="modal-payment-method-updated"
      centered
    >
      <ModalBanner />
      <ModalBody
        className={classNames("modal-body", { "modal-message": isSubmitCard })}
      >
        <h3>
          Prior to access your dashboard, link a credit card to your account
        </h3>
        <div className="note">
          <p>
            The card information you enter here will be the default card for all
            billings associated to your account.
          </p>
          <p>
            <strong>
              You won’t be charged until the day of your first lesson.
            </strong>
          </p>
        </div>
        <Form onSubmit={handleSubmitForm}>
          <div className="form__wrapper">
            {!isSubmitCard ? (
              <div>
                <div className="form__item">
                  <h4>Card Number</h4>
                  <CardNumberElement onFocus={handleFocus} />
                </div>
                <div className="form__item">
                  <h4>Name on card</h4>
                  <FormGroup
                    propsInput={{
                      name: "nameOnCard",
                      placeholder: "Cardholder name",
                      onChange: handleChange,
                      onFocus: handleFocus,
                      value: form.nameOnCard,
                    }}
                  />
                </div>
                <div className="form__item">
                  <h4>Expired date</h4>
                  <CardExpiryElement onFocus={handleFocus} />
                </div>
                <div className="form__item">
                  <h4>CVC code</h4>
                  <CardCvcElement onFocus={handleFocus} />
                </div>
                <div className="form__item">
                  <h4>ZIP code </h4>
                  <FormGroup
                    propsInput={{
                      name: "ZIPCode",
                      placeholder: "ZIP code ",
                      onChange: handleChange,
                      onFocus: handleFocus,
                      value: form.ZIPCode,
                    }}
                  />
                </div>
                {error && (
                  <div className="errorStripe">
                    <ErrorIcon />
                    <div>{error}</div>
                  </div>
                )}
              </div>
            ) : (
                <div className="message">
                  <h5>Success</h5>
                  <img src={tick} alt="tick" />
                  <h6>Card succesfully added </h6>
                  <p>This credit card is now linked to your account. </p>
                </div>
              )}
          </div>
          <p>
            By continuing, I authorise Homemuse to send instructions to the
            financial institution that issued my card to take payments from my
            card account in accordance with Homemuse{" "}
            <Link to="/terms" target="_blank">
              Terms of Service
            </Link>{" "}
            and I accept Homemuse{" "}
            <Link to="/privacy" target="_blank">
              Privacy Policy
            </Link>
          </p>
          {!isSubmitCard ? (
            <button disabled={isSubmitting}>Save my card</button>
          ) : (
              <button onClick={clickAccess}>
                {isPasswordUpdateSetToFalse ? "Continue" : "Access my dashboard"}
              </button>
            )}
        </Form>
      </ModalBody>
    </StyledModal>
  );
};

export default ModalPaymentMethodUpdated;
