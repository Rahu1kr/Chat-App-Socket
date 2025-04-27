// src/contexts/ChatContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [user, setUser] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();

  const logout = () => {
    if (socket) {
      socket.emit("leave_chat", user.id);
      socket.disconnect();
    }
    setUser(null);
    setSelectedUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    navigate("/signin", { replace: true });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    // decode JWT to get user info (e.g. id, name)
    const decoded = jwtDecode(token.replace("Bearer ", ""));
    // console.log("Decoded JWT:", decoded)
    setUser({ id: decoded.id, name: decoded.name });

    // connect socket with token in handshake
    const s = io("http://3.108.51.8:8000", {
      auth: { token: `Bearer ${token}` },
    });
    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, []);

  return (
    <ChatContext.Provider
      value={{ socket, user, selectedUser, setSelectedUser, logout }}
    >
      {children}
    </ChatContext.Provider>
  );
};

// custom hook for easy consumption
export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) throw new Error("useChat must be inside ChatProvider");
  return context;
};
