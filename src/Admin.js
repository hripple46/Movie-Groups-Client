/* eslint-disable react/prop-types */
import React, { useEffect, useState, useRef } from "react";
import { ReactComponent as ApproveIcon } from "./img/approve.svg";
import { ReactComponent as DenyIcon } from "./img/deny.svg";

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
    setIsListVisible(true);
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
        <h1
          className="hover:cursor-pointer hover:bg-slate-600/25 p-2"
          onClick={getAllPendingUserDetails}
        >
          {pendingUsers} Requests{" "}
        </h1>
      )}
      {isListVisible && pendingUsersDetails.length > 0 && (
        <div
          ref={listRef}
          className="absolute flex p-2 h-[250px] w-[250px] top-2 right-0 bg-slate-600/50 backdrop-blur-md"
        >
          <ul className="w-full">
            {pendingUsersDetails.map((item, index) =>
              item.Users.length === 0 ? null : (
                <li className="w-full" key={index}>
                  <h1 className="w-full border-b-2 border-slate-300">
                    {item.Group} - {item.Users.length}
                  </h1>
                  {item.Users.map((user, userIndex) => (
                    <div className="flex items-center" key={userIndex}>
                      <h2 className="mr-2">{user}</h2>

                      <ApproveIcon className="hover:fill-green-300" />
                      <DenyIcon className="hover:fill-red-300" />
                    </div>
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
