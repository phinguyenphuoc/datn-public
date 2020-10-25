import React from "react";
import styled from "styled-components";

const StyledNoData = styled.div`
  h1 {
    font-size: 21px;
    color: rgba(255, 255, 255, 0.5);
  }
  @media only screen and (max-width: 380px) {
    h1 {
      font-size: 20px;
    }
  }
`;

function NoData({ noDataImage, noDataText }) {
  return (
    <StyledNoData className="NoData">
      <div>
        <h1>{noDataText}</h1>
        <img src={noDataImage} alt="img" />
      </div>
    </StyledNoData>
  );
}

export default NoData;
