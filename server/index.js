require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const cors = require("cors");
const User = require("./model/User");
const connectDB = require("./db");
const sendEmail = require("./sendEmail");
const jwt = require("jsonwebtoken");
const router = require("./routes/AuthRouter");
const Authrouter = require("./routes/AuthRouter");
const cryptoRouter = require("./routes/CryptoRouter");
const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());
connectDB();

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Server is up & running ",
  });
});

app.get("/all", async (req, res) => {
  const users = await User.find();

  res.status(200).json({
    message: "List of all users",
    length: users.length,
    users,
  });
});

app.delete("/all", async (req, res) => {
  try {
    const count = await User.deleteMany({});

    if (count.deletedCount > 0) {
      res
        .status(200)
        .json({ message: `All ${count.deletedCount} users deleted` });
    } else {
      res.status(200).json({
        message: "No users found",
      });
    }
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

app.use("/", Authrouter);
app.use("/home", cryptoRouter);

// app.post("/register", async (req, res) => {
//   const { name, surname, email, password, confirmPassword } = req.body;
//   console.log("data", req.body);

//   // 1. Validate inputs
//   if (!name || !surname || !email || !password || !confirmPassword) {
//     return res.status(400).json({
//       message: "All fields are required!",
//     });
//   }

//   // 2. Validate password matches
//   if (password !== confirmPassword) {
//     return res.status(400).json({
//       message: "Passwords do not match!",
//     });
//   }

//   // 3. Check if user already exists
//   const userExists = await User.findOne({ email });

//   if (userExists) {
//     // returns null if no user found
//     console.log("Finding user : ", userExists);

//     return res.status(400).json({
//       message: `User already exists`,
//     });
//   }

//   // 4. Hash password with bcrypt
//   const hashedPassword = await bcrypt.hash(password, saltRounds);
//   console.log(hashedPassword);

//   // 5. Create new user
//   const newUser = await User.create({
//     name,
//     email,
//     password: hashedPassword,
//     verified: false,
//   });

//   // 6. Create a Verification Token
//   const token = jwt.sign(
//     { id: newUser._id, email: newUser.email },
//     process.env.JWT_SECRET,
//     {
//       expiresIn: "15m",
//     }
//   );

//   // 7. Send verification email
//   const verificationUrl = `http://localhost:8000/verify-email/${token}`;

//   await sendEmail(
//     email,
//     "Verify your email",
//     `<div style="font-family: Arial, sans-serif; color: #333; display:flex; flex-direction:column; gap:30px">
//       <div style="display : flex; flex-direction:column; justify-content : center;align-items : center; gap: 5px">
//         <h3>Welcome to Crypto App 👋</h3>
//         <p>Please click the button below to verify your email address:</p>
//         <a
//         href=${verificationUrl}
//         style="display: inline-block;padding: 10px 20px;background-color: #5f00d9;color: white;text-decoration: none;border-radius: 5px;font-weight: bold;
//         ">Verify Email</a>
//         <p>If you didn&apos;t request this, you can ignore this email.</p>
//       </div>

//       <div style="color: grey; display : flex; flex-direction : column; gap: 5px;">
//         <div>Warm regards,</div>
//         <div>-Varun kumar</div>
//       </div>
//     </div>`
//   );

//   res
//     .status(200)
//     .json({ message: "Registration successful. Please verify your email." });
// });

// app.get("/verify-email/:token", async (req, res) => {
//   try {
//     const { token } = req.params;
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     // console.log(decoded);
//     const user = await User.findById({ _id: decoded.id });
//     console.log("user", user);

//     if (!user) {
//       return res.status(400).json({
//         message: "Invalid or expired token",
//       });
//     }

//     if (user.verified) {
//       return res.redirect("http://localhost:5173/email-already-verified");
//     }

//     user.verified = true;
//     await user.save();

//     return res.redirect("http://localhost:5173/home");
//   } catch (err) {
//     return res.status(400).json({
//       message: err.message,
//     });
//   }
// });

// app.post("/signin", (req, res) => {});

app.listen(process.env.PORT, () => {
  console.log("Server running on port ", port);
});
