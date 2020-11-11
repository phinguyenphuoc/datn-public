import React from "react";
import { Home, User, Earning } from "../common/icons";
import classNames from "classnames";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import DropdownUserMenu from "./DropdownUserMenu";
import { getAuth, checkRolesAccepted } from "../../utils/helpers";
import { USER_ROLE_TEACHER, USER_ROLE_PARENT } from "../../utils/constants";
import { setHeightHeader, setTopHeader } from "../../redux/actions/global";
import { useSelector } from "react-redux";
import ReactGA from "react-ga";

let lastPageYOffset = 0;
function Header({ isDashboard, showHideHeader, page }) {
  const [open, setOpen] = React.useState(false);
  const [isSticky, setIsSticky] = React.useState(false);
  const [showHeader, setShowHeader] = React.useState(true);
  const auth = getAuth();
  const isTeacher = checkRolesAccepted(auth, [USER_ROLE_TEACHER]);
  const isParent = checkRolesAccepted(auth, [USER_ROLE_PARENT]);
  const storeGlobal = useSelector((store) => store.global);
  const location = useLocation();
  const headerRef = React.useRef(null);
  const headerNotiRef = React.useRef(null);
  const isProgressParentPage = location.pathname.includes(
    "/dashboard/student/progress-report"
  );
  const isMyStudentPage = location.pathname.includes(
    "/dashboard/teacher/my-students-page"
  );
  const isNewlessonPage = location.pathname.includes(
    "/dashboard/teacher/new-lesson"
  );

  const isDashboardParent = location.pathname.includes("/dashboard/student");
  const isDashboardTeacher = location.pathname.includes("/dashboard/teacher");
  const storageNoti = localStorage.getItem("notification");

  React.useEffect(() => {
    window.onbeforeunload = function (e) {
      localStorage.setItem("notification", "show");
    };
  });

  const stickyHeader = React.useCallback(() => {
    const isScrollDown = window.pageYOffset > lastPageYOffset;
    lastPageYOffset = window.pageYOffset;

    // sticky for adjusting color header
    if (window.pageYOffset > 10) {
      setIsSticky(true);
    } else setIsSticky(false);

    // for show/hide header
    if (isScrollDown && window.pageYOffset > storeGlobal.teachersFilter.top) {
      setShowHeader(false);
    } else {
      setShowHeader(true);
    }
  }, [storeGlobal.teachersFilter]);

  React.useLayoutEffect(() => {
    lastPageYOffset = window.pageYOffset;
    window.addEventListener("scroll", stickyHeader);
    stickyHeader();
    return () => window.removeEventListener("scroll", stickyHeader);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stickyHeader]);

  React.useEffect(() => {
    setTimeout(() => {
      checkHeightHeader();
    }, 100);
  }, [isSticky]);

  function checkHeightHeader() {
    if (headerRef.current) setHeightHeader(headerRef.current.offsetHeight);
    // to make sure it work on mobile
    setTimeout(() => {
      if (headerRef.current) setHeightHeader(headerRef.current.offsetHeight);
    }, 100);
  }

  React.useEffect(() => {
    window.addEventListener("resize", checkHeightHeader);
    checkHeightHeader();
    return () => window.removeEventListener("resize", checkHeightHeader);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    const topHeader =
      !showHeader && showHideHeader ? -storeGlobal.heightHeader : 0;
    setTopHeader(topHeader);
  }, [showHeader, showHideHeader, storeGlobal.heightHeader]);

  const handleClick = () => setOpen(!open);

  const handleCloseNotification = () => {
    setHeightHeader(
      storeGlobal.heightHeader - headerNotiRef.current.offsetHeight
    );
    const notification = document.querySelector(".header__notification");
    notification.style.height = "0px";
    notification.style.minHeight = "0px";
    notification.style.opacity = "0";
    setTimeout(() => {
      localStorage.setItem("notification", "close");
    }, 250); // 250 is time transition
  };

  const handleGaTracking = (link) => {
    ReactGA.event({
      category: "Navigation",
      action: `Navigation to ${link} Page at Footer`,
      label: `Click '${link} Link'`,
    });
  };

  const renderNavLinks = () => {
    if (isParent && isDashboardParent) {
      return (
        <>
          <NavLink
            className={classNames({ "--active": isProgressParentPage })}
            activeClassName="--active"
            to="/dashboard/parent"
            exact
          >
            <Home />
            <span>Home</span>
          </NavLink>
          <NavLink activeClassName="--active" to="/dashboard/student/profile">
            <User />
            <span>Profile</span>
          </NavLink>
          <NavLink activeClassName="--active" to="/dashboard/student/payment">
            <svg
              width="20"
              height="14"
              viewBox="0 0 20 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 4.03125C8.59375 4.03125 7.5 5.375 7.5 7.03125C7.5 8.71875 8.59375 10.0625 10 10.0625C11.375 10.0625 12.5 8.71875 12.5 7.03125C12.5 5.375 11.375 4.03125 10 4.03125ZM19.4062 0.71875C18.1875 0.21875 16.9688 0 15.75 0C11.9062 0 8.0625 1.96875 4.21875 1.96875C3.25 1.96875 2.28125 1.84375 1.3125 1.53125C1.21875 1.5 1.09375 1.46875 1 1.46875C0.46875 1.46875 0 1.90625 0 2.46875V12.4062C0 12.7812 0.21875 13.1562 0.5625 13.3125C1.78125 13.8125 3 14 4.21875 14C8.0625 14 11.9062 12.0625 15.75 12.0625C16.7188 12.0625 17.6875 12.1875 18.6562 12.5C18.75 12.5312 18.875 12.5312 18.9688 12.5312C19.5 12.5312 20 12.125 20 11.5625V1.625C20 1.25 19.75 0.875 19.4062 0.71875ZM18.5 9.09375C17.6562 9.1875 16.9688 9.8125 16.7812 10.625C16.4375 10.5938 16.125 10.5625 15.75 10.5625C13.6562 10.5625 11.5938 11.0938 9.625 11.5938C7.71875 12.0625 5.9375 12.5 4.21875 12.5C3.96875 12.5 3.71875 12.5 3.46875 12.5C3.4375 11.4062 2.5625 10.5625 1.5 10.5625V5.03125C2.46875 5.03125 3.25 4.34375 3.4375 3.40625C3.6875 3.4375 3.9375 3.46875 4.21875 3.46875C6.3125 3.46875 8.375 2.9375 10.3438 2.4375C12.25 1.96875 14.0312 1.5 15.75 1.5C16.0938 1.5 16.4062 1.53125 16.75 1.5625C16.7812 2.5625 17.5312 3.375 18.5 3.5V9.09375Z"
                fill="currentColor"
              />
            </svg>
            <span>Payment</span>
          </NavLink>
        </>
      );
    } else if (isTeacher && isDashboardTeacher) {
      return (
        <>
          <NavLink
            className={classNames({
              "--active": isMyStudentPage || isNewlessonPage,
            })}
            activeClassName="--active"
            to="/dashboard/teacher"
            exact
          >
            <Home />
            <span>Home</span>
          </NavLink>
          <NavLink activeClassName="--active" to="/dashboard/teacher/profile">
            <User />
            <span>Profile</span>
          </NavLink>
          <NavLink activeClassName="--active" to="/dashboard/teacher/earnings">
            <Earning />
            <span>Earnings</span>
          </NavLink>
        </>
      );
    }

    return (
      <>
        <NavLink activeClassName="--active" to="/" exact>
          <span>Home</span>
        </NavLink>
        <NavLink activeClassName="--active" to="/teachers">
          <span>Music teachers</span>
        </NavLink>
        <NavLink activeClassName="--active" to="/how-it-works">
          <span>How it works</span>
        </NavLink>
        <NavLink activeClassName="--active" to="/about">
          <span>About us</span>
        </NavLink>
      </>
    );
  };

  return (
    <header
      open={open}
      className={classNames("header", {
        "-sticky": isSticky,
        "-teachers": page === "teachers",
      })}
      ref={headerRef}
      style={{
        top: `${storeGlobal.topHeader}px`,
      }}
    >
      <div className="header__inner">
        <NavLink to="/" className="header__inner__logo">
          <img src={logo} alt="Logo" style={{ height: "80px" }} />
        </NavLink>
        <nav className="header__inner__links">
          <div
            className={classNames("nav__links nav__links--middle", {
              "-open": open,
            })}
          >
            <div className="menu">
              <div className="menu__logo">
                <NavLink to="/">
                  <img src={logo} alt="Logo" />
                </NavLink>
                <div className="menu__button">
                  {!auth.user_login && (
                    <NavLink to="/login" className="button button--secondary">
                      <span>Login</span>
                    </NavLink>
                  )}
                  <button
                    open={open}
                    onClick={handleClick}
                    className="header__inner__button-toggle toggle-open icon-x"
                  ></button>
                </div>
              </div>

              {renderNavLinks()}
              {auth.user_login && (
                <DropdownUserMenu
                  isHasDashboardTeacherLink={!isDashboard && isTeacher}
                  isHasDashboardParentLink={!isDashboard && isParent}
                  isParentAndTeacher={isParent && isTeacher}
                />
              )}
            </div>
            <ul>
              <li onClick={() => handleGaTracking("Twitter")}>
                <a href="https://twitter.com/homemuse1">
                  <span className="icon-twitter"></span>
                </a>
              </li>
              <li onClick={() => handleGaTracking("FaceBook")}>
                <a href="https://www.facebook.com/Homemuse-1026442390874079">
                  <span className="icon-facebook"></span>
                </a>
              </li>
              <li onClick={() => handleGaTracking("Instagram")}>
                <a href="https://www.instagram.com/homemuse_musiclessons">
                  <span className="icon-instagram"></span>
                </a>
              </li>
            </ul>
          </div>
          <div className="nav__links nav__links--right">
            {!auth.user_login && (
              <NavLink to="/login" className="button button--secondary">
                <span>Login</span>
              </NavLink>
            )}
          </div>
          <button
            open={open}
            onClick={handleClick}
            className={classNames("header__inner__button-toggle", {
              "toggle-open icon-x": open,
            })}
          >
            <span />
            <span />
            <span />
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;
