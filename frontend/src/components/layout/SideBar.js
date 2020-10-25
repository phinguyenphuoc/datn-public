import React from "react";
import { NavLink } from "react-router-dom";
function SideBar({ noSidebar, page }) {
  return noSidebar ? (
    <div className="side-bar">
      <div className="side-bar__inner">
        <NavLink
          to="/dashboardver2/parent/myaccount"
          className="side-bar__inner__item"
        >
          My account
        </NavLink>
        <NavLink
          to="/dashboardver2/parent/profiles"
          className="side-bar__inner__item"
        >
          Profiles
        </NavLink>
        <NavLink
          to="/dashboardver2/parent/profiles/payment"
          className="side-bar__inner__item"
        >
          Payment
        </NavLink>
        <NavLink
          to="/dashboardver2/parent/notifications"
          className="side-bar__inner__item"
        >
          Notifications
        </NavLink>
      </div>
    </div>
  ) : null;
}
export default SideBar;
