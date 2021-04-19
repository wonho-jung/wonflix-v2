import React from "react";
import styled from "styled-components";

function Message() {
  return (
    <MessageContainer>
      <Text>Nothing found</Text>
    </MessageContainer>
  );
}

export default Message;

const MessageContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
const Text = styled.span`
  color: #95a5a6;
`;
