// routes/chat.js
const express = require("express");
const router = express.Router();
const Message = require("../Models/Message");
const User = require("../Models/User.js"); // existing User model
const auth = require("../Middlewares/Auth.js"); // your JWT-auth middleware

// GET /api/chat/users – list all users except current
router.get("/users", auth, async (req, res) => {
  try {
    const currentUserId = req.user.id; // obtain from auth middleware
    const users = await User.find({ _id: { $ne: currentUserId } }).select(
      "_id name"
    );
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// GET /api/chat/messages/:userId – get chat history with userId
router.get("/messages/:userId", auth, async (req, res) => {
  try {
    const currentUserId = req.user.id;
    const otherUserId = req.params.userId;
    const messages = await Message.find({
      $or: [
        { sender: currentUserId, receiver: otherUserId },
        { sender: otherUserId, receiver: currentUserId },
      ],
    }).sort({ createdAt: 1 });
    res.json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

module.exports = router;
