import logo from "./logo.svg";
import React, { useState, useEffect } from "react";
import "./App.css";
import Message from "./Message.js";
import Signup from "./Signup.js";

function App() {
  const [data, setData] = useState({});
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      fetch("http://localhost:3000/api/message", { type: "GET" })
        .then((res) => res.json())
        .then((data) => {
          setMessages(data);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const renderMessages = () => {
    console.log(messages);
    if (!messages) {
      return <p>No messages found</p>;
    } else {
      return (
        <ul>
          {messages.map((message) => (
            <li key={message._id}>{message.text}</li>
          ))}
        </ul>
      );
    }
  };

  return (
    <div className="App">
      <h1>Messages</h1>
      {renderMessages()}
      <Message />
      <Signup />
    </div>
  );
}

export default App;
