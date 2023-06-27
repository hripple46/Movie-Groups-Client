/* eslint-disable react/prop-types */
import React, { useState } from "react";

export default function Login({ loggedIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [form, setForm] = useState(null);
  const [message, setMessage] = useState(null);
  const [adminGroup, setAdminGroup] = useState([]);

  const handleSubmit = async (e) => {
    console.log(form);
    e.preventDefault();
    if (form === "login") {
      const user = {
        username: username,
        password: password,
      };
      const response = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseJson = await response.json();
      console.log(responseJson);
      document.cookie = "token=" + responseJson.token;
      setMessage("Logged In!");
      setAdminGroup(responseJson.user.admin);
      console.log(adminGroup);
      location.reload();
    } else {
      setMessage("Signed up!");
    }
  };

  const handleLoginClick = async () => {
    setMessage(null);
    setForm("login");
  };

  const handleSignupClick = () => {
    setMessage(null);
    setForm("signup");
  };

  const showMessage = () => {
    if (message) {
      return <p>{message}</p>;
    }
  };
  const userSignout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    location.reload();
  };

  return (
    <div className={`w-full ${!loggedIn ? "h-full" : ""}`}>
      {!loggedIn ? (
        <div className="w-full h-full flex items-center justify-center">
          {!form && (
            <>
              <button
                className="m-2 h-8 w-24 bg-green-300"
                onClick={handleLoginClick}
              >
                Login
              </button>
              <button
                className="m-2 h-8 w-24 bg-green-300"
                onClick={handleSignupClick}
              >
                Signup
              </button>
            </>
          )}
          {form === "login" && (
            <>
              <button
                className="h-8 w-24 bg-red-200 absolute left-2 top-2"
                onClick={() => setForm(null)}
              >
                Back
              </button>
              <form
                className="border-black border-2 flex flex-col p-2"
                onSubmit={handleSubmit}
              >
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Your Username Here"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <label htmlFor="password">Password:</label>
                <input
                  type="text"
                  id="password"
                  name="password"
                  placeholder="Your Password Here"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  className="m-2 h-8 w-24 bg-green-300 self-center"
                  type="submit"
                >
                  Login
                </button>
              </form>
            </>
          )}
          {form === "signup" && (
            <>
              <button
                className="h-8 w-24 bg-red-200 absolute left-2 top-2"
                onClick={() => setForm(null)}
              >
                Back
              </button>
              <form
                className="border-black border-2 flex flex-col p-2"
                onSubmit={handleSubmit}
              >
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Your Username Here"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <label htmlFor="password">Password:</label>
                <input
                  type="text"
                  id="password"
                  name="password"
                  placeholder="Your Password Here"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  className="h-8 w-24 bg-green-300 self-center"
                  type="submit"
                >
                  Signup
                </button>
              </form>
            </>
          )}
        </div>
      ) : (
        <div>
          {showMessage()}
          <button onClick={userSignout}>Signout</button>
        </div>
      )}
    </div>
  );
}
