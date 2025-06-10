const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendEmail = require("../sendEmail");

const signup = async (req, res) => {
  try {
    const { name, surname, email, password } = req.body;
    console.log("data", req.body);

    // 1. Check if user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      // returns null if no user found
      console.log("Finding user : ", userExists);

      return res.status(409).json({
        message: `User already exists`,
        success: false,
        location: "AuthController/signup/try",
      });
    }

    // 2. Hash password with bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);
    // console.log(hashedPassword);

    // 3. Create new user
    const newUser = await User.create({
      name,
      surname,
      email,
      password: hashedPassword,
      verified: false,
    });

    // 4. Create a Verification Token
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );

    // 5. Send verification email
    const verificationUrl = `http://localhost:8000/verify-email/${token}`;

    await sendEmail(
      email,
      "Verify your email",
      `<div style="font-family: Arial, sans-serif; color: #333; display:flex; flex-direction:column; gap:30px">
      <div style="display : flex; flex-direction:column; justify-content : center;align-items : center; gap: 5px">
        <h3>Welcome to Crypto App 👋</h3>
        <p>Please click the button below to verify your email address:</p>
        <a 
        href=${verificationUrl}
        style="display: inline-block;padding: 10px 20px;background-color: #5f00d9;color: white;text-decoration: none;border-radius: 5px;font-weight: bold;
        ">Verify Email</a>
        <p>If you didn&apos;t request this, you can ignore this email.</p>
      </div>
  
      <div style="color: grey; display : flex; flex-direction : column; gap: 5px;">
        <div>Warm regards,</div>
        <div>-Varun kumar</div>
      </div>
    </div>`
    );

    return res
      .status(200)
      .json({ message: "Registration successful. Please verify your email." });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({
        message: "User already exists (duplicate email)",
        location: "AuthController/signup/catch",
        error: err.message,
      });
    }

    return res.status(500).json({
      message: "Internal server error",
      location: "AuthController/signup/catch",
      error: err.message,
    });
  }
};

const verifyEmail = async (req, res) => {
  try {
    // 1. get token from url
    const { token } = req.params;

    // 2. verify token exists or not
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decoded);

    // 3. Extract user info from token
    const user = await User.findById({ _id: decoded.id });
    console.log("user", user);

    // 4. check if user extracted from token or not
    if (!user) {
      return res.status(400).json({
        message: "Invalid or expired token",
        location: "AuthController/verifyEmail",
      });
    }

    // 5. If user is already verified redirect
    if (user.verified) {
      return res.redirect("http://localhost:5173/email-already-verified");
    }

    // 6. verify user and save to db
    user.verified = true;
    await user.save();

    // 7. redirect to homepage
    return res.redirect("http://localhost:5173/login");
  } catch (err) {
    return res.status(400).json({
      message: err.message,
      location: "AuthController/verifyEmail/catch",
    });
  }
};

const login = async (req, res) => {
  try {
    // 1. extract name & password from incoming req body
    const { email, password } = req.body;

    // 2. check if user exists
    const user = await User.findOne({ email });

    // 3. error if user does not exists
    if (!user) {
      return res.status(403).json({
        message: "Authentication failed! Email or password is incorrect",
        location: "AuthController/login/try",
        success: false,
      });
    }

    // 4. Check if passwords matches
    const isPassCorrect = await bcrypt.compare(password, user.password);

    // 5. error if wrong password
    if (!isPassCorrect) {
      return res.status(403).json({
        message: "Authentication failed! Incorrect password",
        location: "AuthController/login/try",
      });
    }

    // 5. Create token
    const token = await jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    // 6. Send response
    return res.status(200).json({
      message: "User successfully logged in",
      success: true,
      token,
      email,
      name: user.name,
      surname: user.surname,
    });
  } catch (err) {
    console.log("Server error : ", err);

    return res.status(500).json({
      message: "Internal server error",
      error: err.message,
      location: "AuthController/login/catch",
      success: false,
    });
  }
};

module.exports = { signup, verifyEmail, login };
