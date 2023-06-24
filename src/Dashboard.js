import React, { useEffect, useState } from "react";

export default function DashBoard() {
  const [user, setUser] = useState("Not Signed In");

  useEffect(() => {
    console.log(document.cookie);
    getUserName();
  }, []);

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }

  const getUserName = async () => {
    let cookieValue = JSON.parse(getCookie("token"));
    let token = cookieValue.token;
    console.log("Token:  " + token);
    fetch("http://localhost:3000/api/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "bearer " + token,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        setUser(res.username);
      });
  };

  return <div>Hello, {user}</div>;
}
