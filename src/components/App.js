import React, { useState, useEffect } from "react";

import axios from "axios";
import styled from "styled-components";

import Messages from "./messages";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  const [count, setCount] = useState(0);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(
        "https://mocki.io/v1/265e74e9-5d64-49c6-b277-b200b38acc14"
      );
      setMessages((prevMessages) => [
        ...prevMessages,
        ...response.data.rtcMessages,
      ]);
      // total messages sent on each request
      setCount((count) => count + parseInt(response.data.rtcMessages.length));
    } catch (err) {
      setError(err?.data?.response?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  if (error) {
    return <div>Error while loading messages</div>;
  } else if (loading) {
    return <div>Loading messages.Please wait!!!</div>;
  } else {
    return (
      <MessageContainer>
        <Title>Messaging App</Title>
        <Messages
          data={messages}
          count={count}
          handleAppendList={() => {
            fetchMessages();
          }}
        />
      </MessageContainer>
    );
  }
};

const MessageContainer = styled.div`
    max-width: 1240px;
    padding: 30px;
    margin: 0 auto;
    position: relative;
  `,
  Title = styled.h2`
    width: 100%;
    text-align: center;
    font-size: 24px;
    color: blue;
    font-weight: 500;
  `;

export default App;
