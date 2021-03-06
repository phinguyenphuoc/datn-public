import "./polyfills";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import store from "./redux/store/index";
import App from "./App";
import Amplify from "aws-amplify";
import config from "./configAuth.json";
import { STRIPE_KEY } from "./config";
// CSS
import "bootstrap/dist/css/bootstrap.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.scss";

const stripePromise = loadStripe(STRIPE_KEY);

Amplify.configure({
  Auth: {
    mandatorySignId: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID,
  },
});

ReactDOM.render(
  <Provider store={store}>
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <Elements stripe={stripePromise}>
        <App />
      </Elements>
    </MuiPickersUtilsProvider>
  </Provider>,
  document.getElementById("root")
);
