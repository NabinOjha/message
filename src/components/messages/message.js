import React, { useEffect, useRef } from "react";

import styled from "styled-components";

import useOnScreen from "../../hooks/useOnScreen";

const Message = ({ item, index, count, handleAppendList }) => {
  console.log(item);
  const ref = useRef();
  const isVisible = useOnScreen(ref);

  console.log(item.senderAccountObj.profilePic);

  useEffect(() => {
    if (index + 1 >= count && ref && isVisible) {
      handleAppendList();
    }
  }, [ref, index, count, isVisible]);

  useEffect(() => {
    if (item.text) {
      ref.current.innerHTML = `<div class=${
        index % 2 === 0 ? "incomming" : "outgoing"
      }>
                                   <img class="userImg" src=${
                                     item.senderAccountObj.profilePic
                                   } alt='user' />
                                   ${item.text.message}
                                </div>`;
    }
  }, []);

  if (item.text) {
    return <MessageBox ref={ref} />;
  } else {
    return null;
  }
};

const MessageBox = styled.div`
  padding: 10px;

  & > div {
    display: flex;
    align-items: center;
    width: 40%;
    padding: 10px;
    border-radius: 10px;
    &.incomming {
      background-color: #ddd;
    }
    &.outgoing {
      background-color: blue;
      color: #fff;
      margin-left: auto;
    }

    & > div {
      font-size: 18px;
      font-weight: 500;
      word-break: break-word;
      margin-left: 30px;
    }
  }

  .userImg {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
  }
`;

export default Message;
