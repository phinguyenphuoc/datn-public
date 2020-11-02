import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import user from "../../../../assets/images/avatar-picture.svg";

const StyledUsers = styled.section`
  .user-inner {
    padding: 30px 30px 0px;
    overflow: hidden;
    .user__item {
      margin: 0 50px 14px 0;
      float: left;
      img {
        border-radius: 100%;
        width: 82px;
        height: 82px;
        transition: 0.3s ease;
      }
      p {
        margin: 15px 0 0 0;
        color: #08135a;
        font-size: 12px;
        text-transform: capitalize;
      }
      &:hover img {
        transform: scale(1.2);
      }
    }
    @media only screen and (max-width: 540px) {
      .user__item {
        margin: 0 20px 14px 0;
      }
    }
  }
`;

function Users({ userInfo }) {
  return (
    <StyledUsers>
      <div className="user-inner">
        {userInfo &&
          userInfo.length &&
          userInfo.map((item) => (
            <Link
              key={`student-${item.id}`}
              to={`/dashboard/student/profile/users/${item.id}`}
              className="user__item"
            >
              <img src={item.avatar || user} alt="avatar" />
              <p className="text-color">{`${item.first_name} ${item.last_name}`}</p>
            </Link>
          ))}
      </div>
    </StyledUsers>
  );
}

export default Users;
