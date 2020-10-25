import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { UncontrolledTooltip } from "reactstrap";
import Card from "../common/Card";
import { UserEdit, Key, Info, HandHolding } from "../common/icons";
import user from "../../assets/images/avatar-picture.svg";
import { getInstruments } from "../../redux/actions/instruments";

const StyledDashboardProfileLayout = styled.section`
  margin-bottom: auto;
  .teachers__card__footer {
    display: none;
  }
  .DashboardProfileLayout__inner {
    display: flex;
    justify-content: space-between;
    & > div:first-child {
      height: 100%;
      width: 30%;
      float: none;
      .teachers__card__inner {
        cursor: auto;
        &:hover {
          background: #ffffff;
          .teachers__card__text h1,
          .teachers__card__text p,
          .teachers__card__text-description {
            color: #08135a;
          }
        }
        @media only screen and (max-width: 480px) {
          margin: 0;
        }
      }
    }
    .profile-userInfo {
      width: 68%;
      height: 100%;
      background: #ffffff;
      overflow: hidden;
      margin: 16px 10px;
      padding: 40px 0px 20px;
      box-shadow: 0px 5px 25px rgba(98, 84, 232, 0.203944);
      border-radius: 4px;
      font-size: 14px;
      @media only screen and (max-width: 1020px) {
        width: calc(100% - 32px);
        max-width: 900px;
        margin: 30px auto;
      }
      @media only screen and (max-width: 480px) {
        width: 100%;
      }
    }

    @media only screen and (max-width: 1020px) {
      display: block;
      & > div:first-child {
        height: 100%;
        width: 100%;
        max-width: 450px;
        margin: 20px auto;
      }
    }
    .menu {
      color: #b5beec;
      border-bottom: 2px solid #dce0f6;
      &__inner {
        display: flex;
        padding: 0 30px;
        justify-content: space-around;
      }
      &__userInfo {
        transition: 0.3s ease;
        cursor: pointer;
        color: #b5beec;
        &:hover,
        &.--active {
          color: #6254e8;
          p {
            border-bottom: 2px solid #6254e8;
          }
        }
        p {
          border-bottom: 2px solid transparent;
          margin: 0;
          padding-bottom: 13px;
          transform: translateY(2px);
        }

        svg {
          font-size: 22px;
          margin-bottom: 10px;
          display: none;
        }
        @media only screen and (max-width: 745px) {
          svg {
            display: initial;
          }
          .menu__icon {
            padding: 6px 15px 0px;
          }
          p {
            display: none;
          }
        }
      }
    }
  }
`;

function DashboardProfileTeacherLayout({ userInfo, children }) {

  const storeInstruments = useSelector(
    (store) => store.instruments.data.instruments
  );

  React.useEffect(() => {
    if (!storeInstruments) {
      getInstruments();
    }
  }, [storeInstruments]);

  return (
    <StyledDashboardProfileLayout>
      <div className="container">
        <div className="DashboardProfileLayout__inner">
          <Card
            className="card-info"
            id={userInfo.id}
            key={`teacher-${userInfo.id}`}
            image={userInfo.avatar || user}
            name={`${userInfo.first_name} ${userInfo.last_name}`}
            position={
              userInfo.address &&
              userInfo.address.length > 3 &&
              userInfo.address[2]
            }
            description={userInfo.pickup_line}
            skills={userInfo.skills}
            pricings={userInfo.pricings}
            teachingDistance={userInfo.teaching_distance}
            // For Rating && Lesson Types
            // rating={item.rating}
            teachingType={userInfo.teaching_type || {}}
          />
          <div className="profile-userInfo">
            <div className="menu">
              <div className="menu__inner">
                <NavLink
                  className="menu__userInfo"
                  activeClassName="--active"
                  to="/dashboard/teacher/profile"
                  exact
                >
                  <p>General information</p>

                  <div className="menu__icon" id="UncontrolledTooltip1">
                    <UserEdit />
                  </div>
                  <UncontrolledTooltip
                    placement="top"
                    target="UncontrolledTooltip1"
                  >
                    General information
                  </UncontrolledTooltip>
                </NavLink>
                <NavLink
                  className="menu__userInfo"
                  activeClassName="--active"
                  to="/dashboard/teacher/profile/password"
                  exact
                >
                  <p>Password</p>
                  <div className="menu__icon" id="UncontrolledTooltip2">
                    <Key />
                  </div>
                  <UncontrolledTooltip
                    placement="top"
                    target="UncontrolledTooltip2"
                  >
                    Password
                  </UncontrolledTooltip>
                </NavLink>
                <NavLink
                  className="menu__userInfo"
                  activeClassName="--active"
                  to="/dashboard/teacher/profile/homemuse-profile"
                  exact
                >
                  <p>Homemuse profile</p>
                  <div className="menu__icon" id="UncontrolledTooltip3">
                    <Info />
                  </div>
                  <UncontrolledTooltip
                    placement="top"
                    target="UncontrolledTooltip3"
                  >
                    Homemuse profile
                  </UncontrolledTooltip>
                </NavLink>
                <NavLink
                  className="menu__userInfo"
                  activeClassName="--active"
                  to="/dashboard/teacher/profile/payment-methods"
                  exact
                >
                  <p>Payment methods</p>
                  <div className="menu__icon" id="UncontrolledTooltip4">
                    <HandHolding />
                  </div>
                  <UncontrolledTooltip
                    placement="top"
                    target="UncontrolledTooltip4"
                  >
                    Payment methods
                  </UncontrolledTooltip>
                </NavLink>
              </div>
            </div>
            {children}
          </div>
        </div>
      </div>
    </StyledDashboardProfileLayout>
  );
}

export default DashboardProfileTeacherLayout;
