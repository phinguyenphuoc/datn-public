import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/images/logo.png";

function Footer(props) {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__inner__logo">
          <img src={logo} alt="" />
        </div>
        <div className="footer__inner__links">
          <div className="footer__inner__links__item">
            <p className="text--xlarge underline underline--secondary margin-b">
              learn more
            </p>
            <ul>
              <li>
                <NavLink
                  activeClassName="--active"
                  exact
                  to="/"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  activeClassName="--active"
                  to="/about"
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  activeClassName="--active"
                  to="/how-it-works"
                >
                  How it works
                </NavLink>
              </li>
              <li>
                <NavLink
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
                  activeClassName="--active"
                  to="/teach-with-us"
                >
                  Become our platform's teachers
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
