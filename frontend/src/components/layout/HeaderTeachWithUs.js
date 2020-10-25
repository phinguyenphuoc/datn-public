import React from "react";
import classNames from "classnames";
import { NavLink } from "react-router-dom";
import logo from "../../assets/images/logo-teach-with-us.svg";
import { getAuth } from "../../utils/helpers";
import {
  setHeightHeader,
  setOpenModalJoinHomemuse,
} from "../../redux/actions/global";
import { useSelector } from "react-redux";
import ReactGA from "react-ga";

function HeaderTeachWithUs({ isDashboard }) {
  const [open, setOpen] = React.useState(false);
  const [isSticky, setIsSticky] = React.useState(false);
  const auth = getAuth();
  // const storeGlobal = useSelector((store) => store.global);
  const headerRef = React.useRef(null);
  // const headerNotiRef = React.useRef(null);

  const storeOpenModal = useSelector(
    (store) => store.global.openModalJoinHomemuse
  );
  // const storageNoti = localStorage.getItem("notification");

  React.useEffect(() => {
    window.onbeforeunload = function (e) {
      localStorage.setItem("notification", "show");
    };
  });

  React.useLayoutEffect(() => {
    function stickyHeader() {
      if (window.pageYOffset > 10) {
        setIsSticky(true);
      } else setIsSticky(false);
    }
    window.addEventListener("scroll", stickyHeader);
    stickyHeader();
    return () => window.removeEventListener("scroll", stickyHeader);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // React.useEffect(() => {
  //   setTimeout(() => {
  //     checkHeightHeader();
  //   }, 250);
  // }, [isSticky]);

  function checkHeightHeader() {
    if (headerRef.current)
      setHeightHeader(headerRef.current.offsetHeight);
    // to make sure it work on mobile
    setTimeout(() => {
      if (headerRef.current)
        setHeightHeader(headerRef.current.offsetHeight);
    }, 100);
  }

  React.useEffect(() => {
    window.addEventListener("resize", checkHeightHeader);
    checkHeightHeader();
    return () => window.removeEventListener("resize", checkHeightHeader);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = () => setOpen(!open);

  // const handleCloseNotification = () => {
  //   setHeightHeader(
  //     storeGlobal.heightHeader - headerNotiRef.current.offsetHeight
  //   );
  //   const notification = document.querySelector(".header__notification");
  //   notification.style.height = "0px";
  //   notification.style.minHeight = "0px";
  //   notification.style.opacity = "0";
  //   setTimeout(() => {
  //     localStorage.setItem("notification", "close");
  //   }, 100); // 100 is time transition
  // };

  const handleClickButton = () => {
    ReactGA.event({
      category: "Navigation",
      action: "Navigation to Join Homemuse Modal at Teach with us Page Header",
      label: "Click 'Join homemuse as teacher Button'",
    });
    setOpenModalJoinHomemuse(!storeOpenModal);
  };

  const handleGaTracking = (link) => {
    ReactGA.event({
      category: "Navigation",
      action: `Navigation to ${link} Page at Footer`,
      label: `Click '${link} Link'`,
    });
  };
  return (
    <header
      open={open}
      className={classNames("header__teach-with-us", {
        "--sticky": isSticky,
      })}
      ref={headerRef}
    >
      {/* {storageNoti !== "close" && (
        <div ref={headerNotiRef} className="header__notification">
          <p>
            Due to COVID-19, at-home music lessons are not available at the
            moment. Go for{" "}
            <b>
              <NavLink to="/teachers"> online lessons</NavLink>
            </b>
            !
          </p>
          <span onClick={handleCloseNotification}>&#x2716;</span>
        </div>
      )} */}
      <div className="header__teach-with-us__inner">
        <NavLink to="/" className="header__teach-with-us__inner__logo">
          <img src={logo} alt="Logo" />
        </NavLink>
        <nav
          className={classNames("header__teach-with-us__inner__links", {
            "-open": open,
          })}
        >
          <div>
            <div className="header-logo">
              <NavLink to="/" className="--logo">
                <img src={logo} alt="Logo" />
              </NavLink>
              <button
                open={open}
                onClick={handleClick}
                className="header__teach-with-us__inner__button-toggle toggle-open icon-x"
              ></button>
            </div>
            <div className="nav__links nav__links--right">
              <button
                to="/login"
                className="button button--primary"
                onClick={handleClickButton}
              >
                <span>Join homemuse as teacher</span>
              </button>
              {!auth.user_login && (
                <NavLink to="/login" className="button button--secondary">
                  <span>Login</span>
                </NavLink>
              )}
            </div>
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
        </nav>
        <button
          open={open}
          onClick={handleClick}
          className={classNames("header__teach-with-us__inner__button-toggle", {
            "toggle-open icon-x": open,
          })}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}

export default HeaderTeachWithUs;
