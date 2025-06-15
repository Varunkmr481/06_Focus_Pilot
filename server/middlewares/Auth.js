const jwt = require("jsonwebtoken");
const User = require("../model/User");

const ensureAuthenticated = async (req, res, next) => {
  // 1. Get token from header
  const token = req.headers["authorization"];
  // console.log("token", token);
  // console.log("pass", process.env.JWT_SECRET);

  // 2. unauthorised if no token is coming
  if (!token) {
    return res.status(401).json({
      message: "Unauthorised, JWT token is required",
    });
  }

  try {
    // 3. decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decoded", decoded);

    // 4. attach the decoded user with the req body
    req.user = decoded;

    next();
  } catch (err) {
    return res.status(401).json({
      message: "Unauthorised, JWT token is required",
      error: err.message,
    });
  }
};

const isVerified = async (req, res, next) => {
  try {
    // 1. Extract email from incoming request
    const { email } = req.body;

    // 2. Check if email arrived or not
    if (!email) {
      return res.status(400).json({
        message: "No email provided",
        location: "Auth/isVerified",
      });
    }

    // 3. Extract all the details of the user with the email
    const user = await User.findOne({ email });

    // 4. If user not found error
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        location: "Auth/isVerified",
      });
    }

    // 5. attach verified property with the outgoing req
    req.isVerified = user.verified;

    next();
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      error: err.message,
      location: "Auth/isVerified/catch",
    });
  }
};

module.exports = { ensureAuthenticated, isVerified };
