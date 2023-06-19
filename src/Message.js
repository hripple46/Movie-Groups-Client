import React, { useState, useEffect } from "react";

export default function Message() {
  return (
    <div>
      <form>
        <label for="text">Message:</label>
        <input type="text" id="text" name="text" />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
