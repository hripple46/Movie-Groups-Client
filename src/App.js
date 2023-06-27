import React, { useEffect, useState } from "react";
import "./App.css";
import UserAuth from "./UserAuth";
import DashBoard from "./Dashboard";

function App() {
  const [loggedIn, setLoggedIn] = useState(true);

  useEffect(() => {
    getUserName();
  });

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }

  const getUserName = async () => {
    let cookieValue = getCookie("token");
    let token = cookieValue;
    console.log("Token:  " + token);
    fetch("http://localhost:3000/api/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "bearer " + token,
      },
    })
      .then((response) => {
        if (response.status === 403) {
          setLoggedIn(false);
        }
        return response.json();
      })
      .then((res) => {
        console.log(res.user);
      });
  };
  return (
    <div>
      <UserAuth loggedIn={loggedIn} />
      <DashBoard />
    </div>
  );
}

export default App;
