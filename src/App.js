import logo from "./logo.svg";
import React, { useState, useEffect } from "react";
import "./App.css";
import Message from "./Message.js";

function App() {
  const [data, setData] = useState({});
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      fetch("http://localhost:3000/api/test")
        .then((response) => response.json())
        .then((data) => setData(data))
        .then((data) => console.log(data));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="App">
      <Message />
    </div>
  );
}

export default App;
