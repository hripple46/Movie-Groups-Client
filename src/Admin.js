/* eslint-disable react/prop-types */
import React, { useEffect, useState, useRef } from "react";

export default function Admin({ adminGroups }) {
  const [pendingUsers, setPendingUsers] = useState(0);
  const [pendingUsersDetails, setPendingUsersDetails] = useState([]); //this is an array of objects, each with a pendingusers array and the group id
  const listRef = useRef(null);
  const [isListVisible, setIsListVisible] = useState(true);

  const pendingUsersArray = []; //this is an array of objects, each with a pendingusers array and the group id
  useEffect(() => {
    fetchPendingUsers();
    const handleClickOutside = (event) => {
      if (listRef.current && !listRef.current.contains(event.target)) {
        setIsListVisible(false);
      }
    };

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
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
        getNumberOfPendingUsers();
      });
  };
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }
  const getNumberOfPendingUsers = () => {
    let pendingUsersCount = 0;
    pendingUsersArray.forEach((item) => {
      pendingUsersCount += item.users.length;
    });
    setPendingUsers(pendingUsersCount);
  };

  const getAllPendingUserDetails = async () => {
    let cookieValue = getCookie("token");
    let token = cookieValue;
    fetch("http://localhost:3000/api/groups/pendingusers/details", {
      method: "POST",
      body: JSON.stringify(pendingUsersArray),
      headers: {
        "Content-Type": "application/json",
        authorization: "bearer " + token,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        setPendingUsersDetails(response);
      });
  };

  //const groupsList = adminGroups.map((group) => <li key={group}>{group}</li>);

  return (
    <div className="right-2 top-2 absolute">
      {adminGroups.length > 0 && (
        <h1 onClick={getAllPendingUserDetails}>{pendingUsers} Requests </h1>
      )}
      {isListVisible && pendingUsersDetails.length > 0 && (
        <div
          ref={listRef}
          className="absolute flex items-center justify-center h-[250px] w-[250px] top-2 right-0 bg-indigo-300/50 backdrop-blur-md"
        >
          <ul>
            {pendingUsersDetails.map((item, index) =>
              item.Users.length === 0 ? null : (
                <li key={index}>
                  <h1>{item.Group}</h1>
                  {item.Users.map((user, userIndex) => (
                    <h2 key={userIndex}>{user}</h2>
                  ))}
                </li>
              )
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
