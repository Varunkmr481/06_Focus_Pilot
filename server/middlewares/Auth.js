const jwt = require("jsonwebtoken");

const ensureAuthenticated = async (req, res, next) => {
  // 1. Get token from header
  const token = req.headers["authorization"];
  console.log("token", token);
  console.log("pass", process.env.JWT_SECRET);

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

module.exports = { ensureAuthenticated };
