import React from "react";
import classNames from "classnames";
import { NavLink } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { getAuth } from "../../utils/helpers";
import {
  setHeightHeader,
  setOpenModalJoinHomemuse,
} from "../../redux/actions/global";
import { useSelector } from "react-redux";

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

  const handleClickButton = () => {
    setOpenModalJoinHomemuse(!storeOpenModal);
  };

  return (
    <header
      open={open}
      className={classNames("header__teach-with-us", {
        "--sticky": isSticky,
      })}
      ref={headerRef}
    >
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
                <span>Join platform as teacher</span>
              </button>
              {!auth.user_login && (
                <NavLink to="/login" className="button button--secondary">
                  <span>Login</span>
                </NavLink>
              )}
            </div>
          </div>
          <ul>
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
