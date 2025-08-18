const { ensureAuthenticated } = require("../middlewares/Auth");
const { default: Task } = require("../model/Task");
// const cors = require("cors");

const taskRouter = require("express").Router();

taskRouter.get("/tasks", ensureAuthenticated, async (req, res) => {
  try {
    // 1. Get the current user
    const user = req.user.id;

    // 2. get start, end from req query
    const { start, end } = req.query;
    console.log("QUERY : ", req.query);

    // 3. check for start, end
    if (!start || !end || isNaN(new Date(start)) || isNaN(new Date(end))) {
      return res.status(400).json({
        success: false,
        message: "Invalid start or end date",
      });
    }

    // 4. filter tasks on based on range
    const tasks = await Task.find({
      user,
      start: { $lt: new Date(end) },
      end: { $gt: new Date(start) },
    });

    // 5. send response
    res.status(200).json({ success: true, tasks });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

taskRouter.get("/tasks/all", ensureAuthenticated, async (req, res) => {
  // 1. Get the current user
  const user = req.user.id;

  // 2. extract all the task of the current user
  const tasks = await Task.find({ user });

  // 3. Send the response
  res.status(200).json({
    success: true,
    totalTasks: tasks.length,
    tasks,
  });
});

taskRouter.post("/tasks", ensureAuthenticated, async (req, res) => {
  try {
    // 1. Get the current user
    const user = req.user.id;
    const taskBody = { ...req.body };

    if (!user || !req.body) {
      return res.status(400).json({
        success: false,
        message: "Error! Login & Try again",
        error: "Error! Login & Try again",
        location: "sessionRouter/session/create/try",
      });
    }

    // 2. create new task
    const task = await Task.create({ ...taskBody, user });

    // 3. Send response
    res.status(201).json({
      success: true,
      task,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

taskRouter.put("/tasks/:id", ensureAuthenticated, async (req, res) => {
  try {
    // 1. Get the user id, body, selected slot's id
    const user = req.user.id;
    const body = {
      ...req.body,
    };
    const selectedSlotId = req.params.id;

    // 2. Update task
    const updatedTask = await Task.findOneAndUpdate(
      { _id: selectedSlotId, user },
      {
        $set: body,
      },
      //  return updated document
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found or not authorized to update",
      });
    }

    res.status(200).json({
      success: true,
      task: updatedTask,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

taskRouter.delete("/tasks/:id", ensureAuthenticated, async (req, res) => {
  try {
    // 1. Get the current user
    const user = req.user.id;
    const id = req.params.id;

    // 2. Find selected task and delete it
    const deletedTask = await Task.findOneAndDelete({
      _id: id,
      user,
    });

    if (!deletedTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found or not authorized to delete",
      });
    }

    // 3. send response
    res.status(200).json({
      success: true,
      deletedTask,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = taskRouter;
