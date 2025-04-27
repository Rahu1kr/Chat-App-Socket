import { io } from "socket.io-client";

const socket = io("http://3.108.51.8:8000", {
  auth: { token: localStorage.getItem("token") },
});

export default socket;
