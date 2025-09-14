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
const sessionRouter = require("./routes/SessionRouter");
const taskRouter = require("./routes/TaskRouter");
const userRouter = require("./routes/UserRouter");
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
app.use("/", cryptoRouter);
app.use("/", userRouter);
app.use("/", sessionRouter);
app.use("/", taskRouter);

app.listen(process.env.PORT, () => {
  console.log("Server running on port ", port);
});
