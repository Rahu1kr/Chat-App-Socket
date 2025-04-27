// src/components/Chat/ChatList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useChat } from "../../contexts/ChatContext.jsx";
import { TiGroup } from "react-icons/ti";
import { FaUserAlt } from "react-icons/fa";

const ChatList = ({ handleClose }) => {
  const [users, setUsers] = useState([]);
  const { selectedUser, setSelectedUser } = useChat();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://3.108.51.8:8000/api/chat/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data);
      } catch (err) {
        console.error("Failed to fetch users", err);
      }
    };
    fetchUsers();
  }, []);

  const handleOnClick = (u) => {
    setSelectedUser(u);
  };

  const { logout } = useChat();

  return (
    <div className="chat_sidebar">
      <h3 className="chat_heading">Chats</h3>
      <input type="text" className="search_box" placeholder="Search" />

      <div className="chat_list_heading">
        <TiGroup color="#00000099" />
        <p className="active_users"> Active Users</p>
      </div>

      <ul className="chat_list_section">
        {users.map((u) => (
          <li
            key={u._id}
            onClick={() => {
              handleOnClick(u);
              handleClose();
            }}
            className={`chat_list_item ${
              selectedUser?._id === u._id ? "selected_user" : ""
            }`}
          >
            <FaUserAlt
              color={selectedUser?._id === u._id ? "white" : "#12192c"}
            />
            <div className="user_name_section">
              <span className="user_name">{u.name}</span>
            </div>
          </li>
        ))}
      </ul>
      <div className="logout_section">
        <button className="logout_btn" onClick={logout}>
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default ChatList;
