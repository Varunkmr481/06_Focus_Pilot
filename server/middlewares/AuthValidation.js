const joi = require("joi");
const User = require("../model/User");

const signupValidation = (req, res, next) => {
  console.log("**RUNNING SIGNUP VALIDATION**");

  const userSchema = joi.object({
    name: joi.string().min(3).max(100).required(),
    surname: joi.string().max(100),
    email: joi.string().email().required(),
    password: joi.string().min(4).max(100).required(),
    confirmPassword: joi.string().min(4).max(100).required(),
  });

  const { error } = userSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      message: "Bad request",
      location: "AuthValidation/signunValidation",
      error: error.details[0].message,
    });
  }

  next();
};

const loginValidation = (req, res, next) => {
  console.log("**RUNNING LOGIN VALIDATION**");

  const userSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(4).max(100).required(),
  });

  const { error } = userSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      message: "Bad request",
      error: error.details[0].message,
    });
  }

  next();
};

const resetPasswordValidation = (req, res, next) => {
  console.log("**RUNNING RESETPASS VALIDATION**");

  const userSchema = joi.object({
    currentPassword: joi.string().min(4).max(100).required(),
    newPassword: joi.string().min(4).max(100).required(),
  });

  const { error } = userSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      message: "Bad request",
      error: error.details[0].message,
    });
  }

  next();
};

const PasswordMatchValidation = (req, res, next) => {
  console.log("**RUNNING PASSWORDCHECK VALIDATION**");

  const { password, confirmPassword } = req.body;

  // 1. Checking if password matches
  if (password !== confirmPassword) {
    return res.status(400).json({
      message: "Passwords do not match!",
      location: "AuthValidation/PasswordMatchValidation",
    });
  }

  next();
};

const EmailNotVerifiedValidation = async (req, res, next) => {
  try {
    // 1. Extract email from body req
    const { email } = req.body;

    // 2. Now get the user
    const user = await User.find({ email });

    // 3. check if user is verified or not
    const isVerified = user.verified;

    if (!isVerified) {
      return res.status(400).json({
        message: "can't login! Email not verified",
      });

      next();
    }
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }
};

module.exports = {
  signupValidation,
  loginValidation,
  resetPasswordValidation,
  PasswordMatchValidation,
  EmailNotVerifiedValidation,
};
