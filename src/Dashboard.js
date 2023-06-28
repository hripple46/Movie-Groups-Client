/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import Admin from "./Admin";

export default function DashBoard({ loggedIn }) {
  const [user, setUser] = useState("Not Signed In");
  const [group, setGroup] = useState({});
  const [joinGroupName, setJoinGroupName] = useState();
  const [adminGroups, setAdminGroups] = useState([]);

  //const [userId, setUserId] = useState(null);

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
        return response.json();
      })
      .then((res) => {
        setAdminGroups(res.user.admin);
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
    let cookieValue = getCookie("token");
    let token = cookieValue;

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
    let cookieValue = getCookie("token");
    let token = cookieValue;
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
      {loggedIn && (
        <>
          {user !== "Not Signed In" && <div>Hello, {user}</div>}
          <Admin adminGroups={adminGroups} />

          <form>
            <label htmlFor="groupName">Group Name: </label>
            <input
              type="text"
              name="groupName"
              onChange={(e) => setGroup({ groupName: e.target.value })}
            ></input>
            <button
              className="w-24 h-8 bg-green-300"
              type="submit"
              onClick={submitNewGroup}
            >
              Create
            </button>
          </form>
          <form>
            <label htmlFor="joinGroup">Group Name: </label>
            <input
              type="text"
              name="joinGroup"
              onChange={(e) =>
                setJoinGroupName({ joinGroupName: e.target.value })
              }
            ></input>
            <button
              className="w-24 h-8 bg-green-300"
              type="submit"
              onClick={joinGroup}
            >
              Join
            </button>
          </form>
        </>
      )}
    </div>
  );
}
