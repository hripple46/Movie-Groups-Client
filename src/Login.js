import React, { useState, useEffect } from "react";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: username, password: password }),
    });
    if (response.ok) {
      onLogin();
      setUsername("");
      setPassword("");
    } else {
      alert("Login failed.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label for="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label for="password">Password:</label>
        <input
          type="text"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
