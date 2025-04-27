// src/components/Chat/ChatPage.jsx
import React, { useState } from "react";
import ChatList from "./ChatList";
import ChatRoom from "./ChatRoom";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useSelector } from "react-redux";

const ChatPage = () => {
  const [show, setShow] = useState(true);
  const [dropBack, setDropBack] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const onBackdrop = () => setDropBack(true);
  const offBackdrop = () => setDropBack(false);

  const theme = useSelector(state => state.theme);
  return (
    <>
      <div className="chat_page_section">
        <Offcanvas show={show} responsive="md" onHide={handleClose} backdrop={dropBack} className={`offCanvas_section ${theme ? "lightTheme" : "darkTheme"}`}>
          <aside className="chat_sidebar_section">
            <ChatList handleClose={handleClose} />
          </aside>
        </Offcanvas>

        <section className="chat_room_section">
          <ChatRoom
            handleShow={handleShow}
            onBackdrop={onBackdrop}
            offBackdrop={offBackdrop}
          />
        </section>
      </div>
    </>
  );
};

export default ChatPage;
