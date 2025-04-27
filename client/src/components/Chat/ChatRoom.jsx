// src/components/Chat/ChatRoom.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useChat } from "../../contexts/ChatContext";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { FaBars } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { themeChange } from "../../redux/slice/ThemeSlice/ThemeSLice";

const ChatRoom = ({ handleShow, onBackdrop, offBackdrop }) => {
  const { socket, user, selectedUser } = useChat();
  const [messages, setMessages] = useState([]);
  // console.log(selectedUser);
  selectedUser ? onBackdrop() : offBackdrop();

  // Theme
  const dispatch = useDispatch();

  // Load old messages when a user is selected
  useEffect(() => {
    if (!selectedUser) return;
    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `http://3.108.51.8:8000/api/chat/messages/${selectedUser._id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setMessages(res.data);
      } catch (err) {
        console.error("Failed to load messages", err);
      }
    };
    fetchMessages();
  }, [selectedUser]);

  // Listen for incoming private messages via Socket.IO
  useEffect(() => {
    if (!socket || !selectedUser) return;
    const handler = (message) => {
      // Only add if message is between current user and selectedUser
      const from = message.from;
      const to = message.to;
      if (
        (from === user.id && to === selectedUser._id) ||
        (from === selectedUser._id && to === user.id)
      ) {
        setMessages((msgs) => [...msgs, message]);
      }
    };
    socket.on("private message", handler);
    return () => socket.off("private message", handler);
  }, [socket, selectedUser]);

  if (!selectedUser) {
    return <div className="chat-room">Select a user to chat</div>;
  }

  return (
    <div className="chat_room_box">
      <div className="chat_navbar">
        <h3 className="chat_user_name">{selectedUser.name}</h3>
        <div className="chat_navbar_left">
          <input
            type="checkbox"
            className="theme-checkbox"
            onClick={() => dispatch(themeChange())}
          />
          <button onClick={handleShow} className="bar_btn d-md-none">
            <span>
              <FaBars />
            </span>
          </button>
        </div>
      </div>
      <MessageList messages={messages} currentUser={user} />
      <MessageInput socket={socket} to={selectedUser._id} />
    </div>
  );
};

export default ChatRoom;
