// src/components/Chat/MessageList.js
import React from 'react';

const MessageList = ({ messages, currentUser }) => {
  return (
    <div
      className="message_list"
    >
      {messages.map((msg) => {
        // Handle messages from DB (msg.sender) or socket (msg.from)
        const from = msg.sender || msg.from;
        const isMine = from === currentUser.id;
        return (
          <div
            key={msg._id || msg.createdAt}
            style={{ textAlign: isMine ? 'right' : 'left', margin: '5px 0' }}
          >
            <span
              style={{
                backgroundColor: isMine ? '#dcf8c6' : '#fff',
                padding: '8px',
                borderRadius: '10px',
                display: 'inline-block'
              }}
            >
              {msg.content}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default MessageList;
