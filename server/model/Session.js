const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
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

const sessionModel = mongoose.model("Session", sessionSchema);

module.exports = sessionModel;
