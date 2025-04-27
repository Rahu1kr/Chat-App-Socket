require("dotenv").config();
const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const AuthRouter = require("./Routes/AuthRouter");
// const ChatRouter = require("./Routes/Chat");
const jwt = require("jsonwebtoken");
const Message = require("./Models/Message.js");
const chatRoutes = require("./Routes/ChatRoutes.js");
const mongoose = require("mongoose");

const bodyParser = require("body-parser");

const db = require("./Database/db.js");

db();

const app = express();
const PORT = process.env.PORT || 8000;

// CORS to Express endpoints
app.use(cors());
app.use(bodyParser.json());

// Mount your routers
app.use("/api/auth", AuthRouter);
app.use("/api/chat", chatRoutes);
app.get("/ab", (req, res) => {
  res.send("Rahul");
});
// app.use("/chat", ChatRouter);

// Create HTTP server and attach Socket.IO
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Authorization"],
    credentials: true,
  },
});

const userSockets = {}; //userId - socket.id

// Authenticate Socket.IO connections using JWT from the handshake auth
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) {
    return next(new Error("Authentication error"));
  }
  try {
    // Verify token (remove any "Bearer " prefix if present)
    const payload = jwt.verify(
      token.replace("Bearer ", ""),
      process.env.JWT_SECRET
    );
    socket.userId = payload.id; // assume your JWT payload stores user ID as `id`
    return next();
  } catch (err) {
    console.error("Socket auth error:", err);
    return next(new Error("Authentication error"));
  }
});

// Handle socket connection and events
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.userId}`);
  // Join a room named by this user’s ID for private messaging
  socket.join(socket.userId);

  // Listen for outgoing private messages from this client
  socket.on("private message", async ({ content, to }) => {
    // Save message in MongoDB
    const message = new Message({
      sender: socket.userId,
      receiver: to,
      content,
    });
    await message.save();
    // Emit the message to both sender and receiver (rooms named by ID)
    io.to(to).to(socket.userId).emit("private message", {
      content,
      from: socket.userId,
      to,
      createdAt: message.createdAt,
    });
  });
});

// Listen on the server
server.listen(PORT, () => console.log(`Server is running on Port: ${PORT}`));
