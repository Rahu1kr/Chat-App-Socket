const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../Models/User.js");

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(409).json({
        message: "User is already exist, you can login",
        success: false,
      });
    }
    const userModel = new UserModel({ name, email, password });
    userModel.password = await bcrypt.hash(password, 10);
    await userModel.save();
    res.status(201).json({
      message: "Signup successfully",
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server errror",
      success: false,
    });
  }
};

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    // 1. Validate inputs
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required", success: false });
    }

    // 2. Lookup user
    const user = await UserModel.findOne({ email });
    const errorMsg = "Authentication failed: invalid email or password";

    // 3. Check credentials
    const isMatch = user && (await bcrypt.compare(password, user.password));
    if (!isMatch) {
      return res.status(401).json({ message: errorMsg, success: false });
    }

    // 4. Sign JWT
    const payload = { id: user._id, email: user.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    // 5. Respond
    return res.status(200).json({
      message: "Login successful",
      success: true,
      jwtToken: token,
      email: user.email,
      name: user.name,
    });
  } catch (err) {
    console.error(`Login Error:`, err);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

module.exports = {
  signup,
  signin,
};
