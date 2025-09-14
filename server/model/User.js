const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
    verified: { type: Boolean, default: false },
    totalHours: {
      type: Number,
      default: 0, // Total hours accumulated from sessions
    },
    totalTimePlanned: {
      type: Number,
      default: 0,
    },
    currentLevel: {
      type: Number,
      default: 0, // Start at Level 1
    },
    currentBadge: {
      type: String,
      default: "Beginner",
    },
    currentTrophy: {
      type: String,
      default: "🎖️",
    },
    categories: {
      type: [{ name: String, color: String }],
      default: [],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
