import React, { useEffect, useState } from "react";

export default function DashBoard() {
  const [user, setUser] = useState("Not Signed In");
  const [group, setGroup] = useState({});
  const [joinGroupName, setJoinGroupName] = useState();

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

  const submitNewGroup = (e) => {
    e.preventDefault();
    let checkForCookie = getCookie("token");
    if (!checkForCookie) {
      alert("You are not signed in.");
      return;
    }
    let cookieValue = JSON.parse(getCookie("token"));
    let token = cookieValue.token;

    console.log("Token:  " + token);
    fetch("http://localhost:3000/api/groups", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "bearer " + token,
      },
      body: JSON.stringify(group),
    }).then((response) => {
      console.log(response.json());
      setGroup({});
    });
  };

  const joinGroup = async (e) => {
    e.preventDefault();
    let checkForCookie = getCookie("token");
    if (!checkForCookie) {
      alert("You are not signed in.");
      return;
    }
    let cookieValue = JSON.parse(getCookie("token"));
    let token = cookieValue.token;
    fetch("http://localhost:3000/api/groups/join", {
      method: "POST",
      body: JSON.stringify(joinGroupName),
      headers: {
        "Content-type": "application/json",
        authorization: "bearer " + token,
      },
    }).then((response) => {
      console.log(response.json());
    });
  };

  return (
    <div>
      Hello, {user}
      <form>
        <label htmlFor="groupName">Group Name: </label>
        <input
          type="text"
          name="groupName"
          onChange={(e) => setGroup({ groupName: e.target.value })}
        ></input>
        <button type="submit" onClick={submitNewGroup}></button>
      </form>
      <form>
        <label htmlFor="joinGroup">Group Name: </label>
        <input
          type="text"
          name="joinGroup"
          onChange={(e) => setJoinGroupName({ joinGroupName: e.target.value })}
        ></input>
        <button type="submit" onClick={joinGroup}></button>
      </form>
    </div>
  );
}