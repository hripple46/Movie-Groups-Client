/* eslint-disable react/prop-types */
import React, { useEffect } from "react";

export default function Admin({ adminGroups }) {
  const pendingUsersArray = []; //this is an array of objects, each with a pendingusers array and the group id
  useEffect(() => {
    fetchPendingUsers();
  });

  const fetchPendingUsers = async () => {
    let cookieValue = getCookie("token");
    let token = cookieValue;
    fetch("http://localhost:3000/api/groups/pendingusers", {
      method: "POST",
      body: JSON.stringify(adminGroups),
      headers: {
        "Content-Type": "application/json",
        authorization: "bearer " + token,
      },
    })
      .then((response) => {
        return response.json();
      })

      .then((response) => {
        response.pendingUsers.forEach((item) => {
          pendingUsersArray.push({
            users: item.pendingUsers, // an array of user IDs
            group: item._id,
          });
        });
        console.log(
          "Pending Users and the groups they are requesting to join",
          pendingUsersArray
        );
      });
  };
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }

  const groupsList = adminGroups.map((group) => <li key={group}>{group}</li>);

  return (
    <div>
      <h1>Pending Requests: </h1>
      {adminGroups && <ul>{groupsList}</ul>}
    </div>
  );
}
