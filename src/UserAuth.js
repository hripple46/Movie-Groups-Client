import React, { useState } from "react";

export default function Login() {
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
    <div>
      <button onClick={handleLoginClick}>Login</button>
      <button onClick={handleSignupClick}>Signup</button>
      {form === "login" && (
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="password">Password:</label>
          <input
            type="text"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
      )}
      {form === "signup" && (
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="password">Password:</label>
          <input
            type="text"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Signup</button>
        </form>
      )}
      {showMessage()}
      <button onClick={userSignout}>Signout</button>
    </div>
  );
}
