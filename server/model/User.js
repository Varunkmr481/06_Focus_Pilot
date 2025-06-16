const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
    verified: { type: Boolean, default: false },
    xp: { type: Number, default: 0 },
    streak: { type: Number, default: 0 },
    totalTimeTracked: { type: Number, default: 0 }, // in seconds
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
