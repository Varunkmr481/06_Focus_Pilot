const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
    verified: { type: Boolean, default: false },
    xp: { type: Number, default: 0 },
    streak: { type: Number, default: 0 },
    totalHours: {
      type: Number,
      default: 0, // Total hours accumulated from sessions
    },
    currentLevel: {
      type: Number,
      default: 0, // Start at Level 1
    },
    currentBadge: {
      type: String,
    },
    currentTrophy: {
      type: String,
    },
    totalTimeTracked: { type: Number, default: 0 }, // in seconds
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
