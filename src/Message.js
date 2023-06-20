import React, { useState, useEffect } from "react";

export default function Message() {
  const [text, setText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentText = text;
    setText("");
    const response = await fetch("http://localhost:3000/api/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: currentText }),
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label for="text">Message:</label>
        <input
          type="text"
          id="text"
          name="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
