// db.js
const mongoose = require("mongoose");
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}`);
    console.log("Database connected successfully");
  } catch (err) {
    console.error("Database connection error:", err);
    process.exit(1);
  }
};

module.exports = connectDB;
