import mongoose from "mongoose";

const taskSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    start: {
      type: Date,
      required: true,
    },
    end: {
      type: Date,
      required: true,
    },
    category: {
      type: String,
      default: "personal",
    },
    color: { type: String, default: "#5834db" },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;
