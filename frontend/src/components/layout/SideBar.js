import React from "react";
import { NavLink } from "react-router-dom";
function SideBar({ noSidebar, page }) {
  return noSidebar ? (
    <div className="side-bar">
      <div className="side-bar__inner">
        <NavLink
          to="/dashboardver2/student/myaccount"
          className="side-bar__inner__item"
        >
          My account
        </NavLink>
        <NavLink
          to="/dashboardver2/student/profiles"
          className="side-bar__inner__item"
        >
          Profiles
        </NavLink>
        <NavLink
          to="/dashboardver2/student/profiles/payment"
          className="side-bar__inner__item"
        >
          Payment
        </NavLink>
        <NavLink
          to="/dashboardver2/student/notifications"
          className="side-bar__inner__item"
        >
          Notifications
        </NavLink>
      </div>
    </div>
  ) : null;
}
export default SideBar;
