import React from "react";
import styled from "styled-components";

function Loading() {
  return (
    <LoadingContainer>
      <h1>I'm loading!! </h1>
    </LoadingContainer>
  );
}

export default Loading;

const LoadingContainer = styled.div`
  margin-top: 100px;
  h1 {
    font-size: 100px;
  }
`;
