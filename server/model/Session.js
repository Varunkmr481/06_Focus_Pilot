const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    taskTitle: {
      type: String,
    },
    status: {
      type: String,
    },
    sessionGoal: {
      type: String,
    },
    startTime: {
      type: Number,
      required: true,
    },
    endTime: {
      type: Number,
      required: true,
    },
    summary: {
      type: String,
    },
    earlyEndReason: {
      type: String,
    },
    distractions: [
      {
        time: Date,
        reason: "String",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Session = mongoose.model("Session", sessionSchema);

module.exports = Session;
