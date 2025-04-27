const { signup, signin } = require("../Controllers/AuthController.js");
const {
  signupValidation,
  loginValidation,
} = require("../Middlewares/AuthValidation.js");

const router = require("express").Router();

router.post("/signin", loginValidation, signin);
router.post("/signup", signupValidation, signup);

module.exports = router;
