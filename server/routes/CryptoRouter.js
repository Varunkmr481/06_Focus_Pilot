const jwt = require("jsonwebtoken");
const { ensureAuthenticated, isVerified } = require("../middlewares/Auth");
const bcrypt = require("bcrypt");
const User = require("../model/User");
const sendEmail = require("../sendEmail");
const { resetPasswordValidation } = require("../middlewares/AuthValidation");
const cryptoRouter = require("express").Router();

cryptoRouter.get("/getUser", ensureAuthenticated, async (req, res) => {
  // 1. Extract user if from req.user
  const userId = req.user.id;

  // 2. now extract all the info of the user
  const user = await User.findById(userId);

  if (!user) {
    return res.status(204).json({
      success: false,
      error: "No user found",
      message: "No user found",
      location: "cryptoRouter/getUser/try",
    });
  }

  // 3. Now send response
  return res.status(200).json({
    success: true,
    user,
  });
});

cryptoRouter.get("/home", ensureAuthenticated, async (req, res) => {
  const user = await User.find({ email: req.user.email });
  console.log(user[0]);

  return res.status(200).json({
    message: `${user[0].name} is authenticated user`,
    name: user[0].name,
    email: user[0].email,
    success: true,
  });
});

cryptoRouter.post("/profile", ensureAuthenticated, isVerified, (req, res) => {
  if (!req.isVerified) {
    return res.status(200).json({
      message: "User is not verified",
      isVerified: req.isVerified,
      location: "CryptoRouter/profile",
    });
  }

  return res.status(200).json({
    message: "User is verified",
    isVerified: req.isVerified,
    location: "CryptoRouter/profile",
  });
});

cryptoRouter.post(
  "/resend-verification",
  ensureAuthenticated,
  async (req, res) => {
    try {
      // 1. Check for user
      const user = req.user;

      if (!user) {
        return res.status(400).json({
          message: "User not found",
          error: "User not found or expired jwt",
          success: false,
          location: "CryptoRouter/resend-verification/try",
        });
      }

      // 2. check if user is already verified
      if (user.verified) {
        return res.status(400).json({
          message: "User is already verified",
          error: "User is already verified",
          success: false,
          location: "CryptoRouter/resend-verification/try",
        });
      }

      // 3. create new token for verification link
      console.log(user);
      const newToken = await jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );

      // 4. create a verification link
      const verificationLink = `http://localhost:8000/verify-email/${newToken}`;

      // 5. Send email with this new verification link
      await sendEmail(
        user.email,
        "Verify your email",
        `<div style="font-family: Arial, sans-serif; color: #333; display:flex; flex-direction:column; gap:30px">
          <div style="display : flex; flex-direction:column; justify-content : center;align-items : center; gap: 5px">
            <h3>Welcome to Crypto App 👋</h3>
            <p>Please click the button below to verify your email address:</p>
            <a href=${verificationLink} style="display: inline-block;padding: 10px 20px;background-color: #5f00d9;color: white;text-decoration: none;border-radius: 5px;font-weight: bold;">Verify Email</a>
            <p>If you didn&apos;t request this, you can ignore this email.</p>
          </div>
  
          <div style="color: grey; display : flex; flex-direction : column; gap: 5px;">
          <div>Warm regards,</div>
          <div>-Varun kumar</div>
        </div>
      </div>`
      );

      // X. Redirect to the homepage
      // fetch() does not allow redirects across origins unless explicitly allowed (and CORS doesn’t like it).
      // res.redirect("http://localhost:5173");

      // ✅ 5. Send success response
      return res.status(200).json({
        success: true,
        message: "Verification email sent 🎉",
      });
    } catch (err) {
      console.error("Error in resend-verification:", err);

      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: err.message,
        location: "CryptoRouter/resend-verification/catch",
      });
    }
  }
);

cryptoRouter.post(
  "/reset-password",
  resetPasswordValidation,
  ensureAuthenticated,
  async (req, res) => {
    console.log("/reset-password : ", req.user);

    try {
      // 1. extract currentPassword, newPassword from body
      const { currentPassword, newPassword } = req.body;
      const decodedUser = req.user;

      // 2. Look for complete user
      const user = await User.findOne({ email: decodedUser.email });

      if (!user) {
        return res.status(404).json({
          message: "User not found",
          success: false,
        });
      }

      // 3. Compare current password
      const isPassSame = await bcrypt.compare(currentPassword, user.password);
      console.log(isPassSame);

      // 4. if userTyped currentPassword matches real pass then proceed
      if (isPassSame) {
        const encryptedUserTypedCurrentPass = await bcrypt.hash(
          newPassword,
          10
        );
        user.password = encryptedUserTypedCurrentPass;
        await user.save();
        return res.status(200).json({
          message: "New password successfully set",
          success: true,
        });
      } else {
        return res.status(400).json({
          message: "Please enter correct password",
          error: "Please enter correct password",
          success: false,
        });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        message: "Something went wrong",
        error: err.message,
        success: false,
      });
    }
  }
);

module.exports = cryptoRouter;
