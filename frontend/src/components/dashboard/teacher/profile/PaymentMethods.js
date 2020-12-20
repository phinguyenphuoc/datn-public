import React from "react";
import styled from "styled-components";
import { Form } from "reactstrap";
import stripe from "../../../../assets/images/stripe.svg";
import { getAuth } from "../../../../utils/helpers";
import { useSelector } from "react-redux";
import {
  getStripeLink,
} from "../../../../redux/actions/teacher";
import { Loading } from "../../../common";

const StyledPaymentMethods = styled.section`
  .form-info {
    padding: 30px 30px 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .stripe {
      width: 75%;
      display: flex;
      border: 1px solid #b5beec;
      border-radius: 4px;
      padding: 10px 30px 10px 10px;
      p {
        margin: 0;
        font-size: 14px;
        margin: 0 30px 0 0;
        text-align: left;
      }
      img {
        width: 100px;
      }
    }
    .find {
      border: none;
      font-size: 12px;
      color: #ffffff;
      font-weight: 500;
      transition: 0.3s ease;
      background: #54c052;
      border-radius: 30px;
      height: 40px;
      margin-left: 30px;
      width: 25%;
      max-width: 200px;
      line-height: 40px;
      &:hover {
        transform: translateY(-3px);
        box-shadow: 0 4px 8px 0 #2d972b;
      }
    }
  }
  @media only screen and (max-width: 850px) {
    .form-info .stripe {
      p {
        font-size: 12px;
      }
      img {
        width: 85px;
      }
    }
  }
  @media only screen and (max-width: 762px) {
    .form-info {
      display: block;
      .stripe {
        width: 100%;
        margin-bottom: 20px;
      }
      .find {
        width: 150px;
        margin-left: 0px;
      }
    }
  }
  @media only screen and (max-width: 540px) {
    .form-info .stripe {
      display: block;
      padding: 10px;
      p {
        margin: 0 0 20px 0;
      }
    }
  }
`;

function PaymentMethods() {
  const storeTeacherStripe = useSelector((store) => store.teacher.stripe);

  React.useEffect(() => {
    getStripeLink();
    // eslint-disable-next-line
  }, []);

  let stripeLink = storeTeacherStripe.link;

  return (
    <StyledPaymentMethods>
      {storeTeacherStripe.loading ? (
        <Loading />
      ) : (
          <Form className="form-info">
            <div className="stripe">
              <p>
                We use Stripe to make sure you get paid on time and to keep your
                personal bank and details secure. Click{" "}
                <span className="fw-500">continue</span> to set up your payments
                on Stripe.
              </p>
              <img src={stripe} alt="stripe" />
            </div>
            <a className="find" href={stripeLink} target="_blank">
              Access my account
            </a>
          </Form>
        )}
    </StyledPaymentMethods>
  );
}

export default PaymentMethods;
