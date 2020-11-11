import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/images/logo_footer.svg";
import ReactGA from "react-ga";

function Footer(props) {
  const handleGaTracking = (link) => {
    ReactGA.event({
      category: "Navigation",
      action: `Navigation to ${link} Page at Footer`,
      label: `Click '${link} Link'`,
    });
  };

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__inner__logo">
          <img src={logo} alt="" />
          <p className="margin-t-s">© HOMEMUSE, Inc. 2020</p>
        </div>
        <div className="footer__inner__links">
          <div className="footer__inner__links__item">
            <p className="text--xlarge underline underline--secondary margin-b">
              learn more
            </p>
            <ul>
              <li>
                <NavLink
                  onClick={() => handleGaTracking("Home")}
                  activeClassName="--active"
                  exact
                  to="/"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  onClick={() => handleGaTracking("About")}
                  activeClassName="--active"
                  to="/about"
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  onClick={() => handleGaTracking("How it works")}
                  activeClassName="--active"
                  to="/how-it-works"
                >
                  How it works
                </NavLink>
              </li>
              <li>
                <NavLink
                  onClick={() => handleGaTracking("Teachers")}
                  activeClassName="--active"
                  to="/teachers"
                >
                  Our teachers
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="footer__inner__links__item">
            <p className="text--xlarge underline underline--primary margin-b">
              support
            </p>
            <ul>
              <li>
                <NavLink
                  onClick={() => handleGaTracking("FAQ")}
                  activeClassName="--active"
                  to="/"
                >
                  FAQ
                </NavLink>
              </li>
              <li>
                <NavLink
                  onClick={() => handleGaTracking("Contact Us")}
                  activeClassName="--active"
                  to="/contact-us"
                >
                  Contact us
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="footer__inner__links__item">
            <p className="text--xlarge underline underline--blue margin-b">
              teach with us
            </p>
            <ul>
              <li>
                <NavLink
                  onClick={() => handleGaTracking("Teach with us")}
                  activeClassName="--active"
                  to="/teach-with-us"
                >
                  Become our platform's teachers
                </NavLink>
              </li>
              {/* <li>
                <NavLink activeClassName="--active" to="/join-our-team">
                  Our solution
                </NavLink>
              </li> */}
            </ul>
          </div>
          <div className="footer__inner__links__item follow-us">
            <p className="text--xlarge underline underline--primary margin-b">
              Follow us
            </p>
            <ul>
              <li onClick={() => handleGaTracking("Twitter")}>
                {/* <a href="https://twitter.com/homemuse1"> */}
                <span className="icon-twitter"></span>
                {/* </a> */}
              </li>
              <li onClick={() => handleGaTracking("FaceBook")}>
                {/* <a href="https://www.facebook.com/Homemuse-1026442390874079"> */}
                <span className="icon-facebook"></span>
                {/* </a> */}
              </li>
              <li onClick={() => handleGaTracking("Instagram")}>
                {/* <a href="https://www.instagram.com/homemuse_musiclessons"> */}
                <span className="icon-instagram"></span>
                {/* </a> */}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
