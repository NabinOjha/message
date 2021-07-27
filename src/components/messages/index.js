import React from "react";

import styled from "styled-components";

import Message from "./message";

const Messages = ({ data, count, handleAppendList }) => {
  return (
    <MessagesBox>
      {data.map((d, idx) => {
        return (
          <Message
            item={d}
            key={idx}
            index={idx}
            count={count}
            handleAppendList={handleAppendList}
          />
        );
      })}
    </MessagesBox>
  );
};

const MessagesBox = styled.div`
  padding: 30px;
  margin-top: 20px;
  border-radius: 5px;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
`;

export default Messages;
