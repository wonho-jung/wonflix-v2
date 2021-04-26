import React from "react";
import styled from "styled-components";

function Loading() {
  return <LoadingContainer>⏰</LoadingContainer>;
}

export default Loading;

const LoadingContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  font-size: 28px;
  margin-top: 100px;
  h1 {
    font-size: 100px;
  }
`;
