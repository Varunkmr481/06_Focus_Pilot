const { signup, verifyEmail, login } = require("../controllers/AuthController");
const {
  signupValidation,
  PasswordMatchValidation,
  loginValidation,
  EmailNotVerifiedValidation,
} = require("../middlewares/AuthValidation");

const Authrouter = require("express").Router();

// route for sigining up new users
Authrouter.post("/register", signupValidation, PasswordMatchValidation, signup);

// route for verifying email
Authrouter.get("/verify-email/:token", verifyEmail);

// route for login
Authrouter.post("/login", loginValidation, login);

module.exports = Authrouter;
