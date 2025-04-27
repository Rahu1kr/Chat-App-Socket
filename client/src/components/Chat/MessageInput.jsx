// src/components/Chat/MessageInput.js
import React, { useState } from "react";
import { IoSend } from "react-icons/io5";

const MessageInput = ({ socket, to }) => {
  const [text, setText] = useState("");

  const sendMessage = (e) => {
    e.preventDefault();
    if (text.trim() && socket) {
      socket.emit("private message", { content: text, to });
      setText("");
    }
  };

  return (
    <form onSubmit={sendMessage} style={{ marginTop: "10px" }}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
        className="msg_input"
      />
      <button
        type="submit"
        // style={{ width: "12%", padding: "8px", marginLeft: "2%" }}
        className="msg_send_btn"
      >
        <IoSend />
      </button>
    </form>
  );
};

export default MessageInput;
