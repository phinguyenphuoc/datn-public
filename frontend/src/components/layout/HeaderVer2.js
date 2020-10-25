import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/images/logo.svg";
import DropdownUserMenu from "./DropdownUserMenu";

function HeaderVer2({ page }) {
  return (
    <header className="header-ver2">
      <div className="header-ver2__inner">
        <div className="header-ver2__inner__left">
          <NavLink to="/" className="header-ver2__inner__left__logo">
            <img src={logo} alt="Logo" />
          </NavLink>
          {page && (
            <NavLink to="/" className="header-ver2__inner__left__text">
              Back to Homepage
            </NavLink>
          )}
        </div>
        <div className="header-ver2__inner__right">
          <div className="header-ver2__inner__right__icons">
            <div />
            <div />
          </div>
          <div className="header-ver2__inner__right__avatar">
            <DropdownUserMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
export default HeaderVer2;
