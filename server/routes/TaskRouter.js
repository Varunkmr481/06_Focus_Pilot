const { ensureAuthenticated } = require("../middlewares/Auth");
const { default: Task } = require("../model/Task");
const User = require("../model/User");
const { default: findTopCategory } = require("../utils/findTopCategory");
const {
  getDateRangeInLocalTime,
  dayKeyLocal,
  monthKeyLocal,
  normalizeFilter,
} = require("../utils/taskStats");
// const cors = require("cors");

const taskRouter = require("express").Router();

// fetch all tasks
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

// get tasks in a range (with active filter)
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

// create new task
taskRouter.post("/tasks", ensureAuthenticated, async (req, res) => {
  try {
    // 1. Get the current user
    const user = req.user.id;
    const taskBody = { ...req.body };

    if (!user || !taskBody.start || !taskBody.end) {
      return res.status(400).json({
        success: false,
        message: "Error! Missing user or task data. Please try again.",
      });
    }

    // 2. Calculate totalTimePlanned
    const { start, end } = taskBody;
    const startMs = new Date(start).getTime();
    const endMs = new Date(end).getTime();
    const eventDurationInMs = endMs - startMs;
    const eventDurationInHrs = eventDurationInMs / (1000 * 60 * 60);

    // 3. create new task
    const task = await Task.create({ ...taskBody, user });

    // 4. Update the user's totalTimePlanned field
    // $inc operator ka use karo duration add karne ke liye
    // Isse ek single, atomic operation mein update ho jaata hai
    const updatedUser = await User.findOneAndUpdate(
      { _id: user },
      {
        $inc: { totalTimePlanned: eventDurationInHrs },
      },
      { new: true }
    );

    // 3. Send response
    res.status(201).json({
      success: true,
      task,
      updatedUser,
      message: "Task created and total time updated successfully!",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// update existing task
taskRouter.put("/tasks/:id", ensureAuthenticated, async (req, res) => {
  try {
    // 1. Get the user id and task id from request
    const user = req.user.id;
    const selectedSlotId = req.params.id;
    const body = req.body;

    // 3. Extract old duration before updating task
    const existingTask = await Task.findOne({ _id: selectedSlotId, user });

    // 4. Agar task nahi mila ya user authorized nahi hai, to error do
    if (!existingTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found or not authorized to update.",
      });
    }

    // 5. Calculate old duration
    const oldStartInMs = existingTask.start.getTime();
    const oldEndInMs = existingTask.end.getTime();
    const oldDurationInHrs = (oldEndInMs - oldStartInMs) / (1000 * 60 * 60);

    // 4. Calculate new duration
    const newStartInMs = new Date(body.start).getTime();
    const newEndInMs = new Date(body.end).getTime();
    const newDurationInHrs = (newEndInMs - newStartInMs) / (1000 * 60 * 60);

    // 5. Agar new duration negative hai, to error do
    if (newDurationInHrs < 0) {
      return res.status(400).json({
        success: false,
        message: "End time cannot be before the start time.",
      });
    }

    // 5. Calculate the difference in hours
    const durationDifference = newDurationInHrs - oldDurationInHrs;

    // 6. Update task
    const updatedTask = await Task.findOneAndUpdate(
      { _id: selectedSlotId, user },
      {
        $set: body,
      },
      //  return updated document
      { new: true }
    );

    // 7. error
    if (!updatedTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found or not authorized to update",
      });
    }

    // 8. Update the user's totalTimePlanned field
    const updatedUser = await User.findOneAndUpdate(
      {
        _id: user,
      },
      { $inc: { totalTimePlanned: durationDifference } }
    );

    res.status(200).json({
      success: true,
      task: updatedTask,
      user: updatedUser,
      message: "Task updated successfully!",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// delete existing task
taskRouter.delete("/tasks/:id", ensureAuthenticated, async (req, res) => {
  try {
    // 1. Get the current user
    const user = req.user.id;
    const id = req.params.id;

    // 2. Extract the existing task
    const deletedTask = await Task.findOneAndDelete({
      _id: id,
      user, // Authorization ke liye
    });

    // 3. err: Task not found
    if (!deletedTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found or not authorized to delete",
      });
    }

    // 4. Calculate the duration of the existing task
    const start = new Date(deletedTask.start).getTime();
    const end = new Date(deletedTask.end).getTime();
    const durationInMs = end - start;
    const durationInHrs = durationInMs / (1000 * 60 * 60);

    // 5. update user's totalTimePlanned
    const updatedUser = await User.findOneAndUpdate(
      { _id: user },
      {
        $inc: { totalTimePlanned: -durationInHrs },
      },
      {
        new: true,
      }
    );

    // 6. send response
    res.status(200).json({
      success: true,
      message: "Task deleted successfully, and total time updated.",
      deletedTask,
      updatedUser,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// fetch data for charts, top category, max hrs, collective chart data
taskRouter.get("/tasks/stats", ensureAuthenticated, async (req, res) => {
  try {
    const userId = req.user.id;
    const filter = normalizeFilter(req.query.filter);

    const { start, end } = getDateRangeInLocalTime(filter);

    // Only the needed tasks in the window
    const tasks = await Task.find({
      user: userId,
      start: { $gte: start, $lte: end },
    });

    // category -> color map from user profile
    const user = await User.findById(userId).lean();
    const categoryColorMap = {};
    (user?.categories || []).forEach((c) => {
      categoryColorMap[c.name] = c.color;
    });

    // ----- Calculating avergae time taken by tasks
    const totalTasksCount = tasks.length;

    let totalTimePlannedForPeriod = 0;

    tasks.forEach((task) => {
      const durationInMs = task.end.getTime() - task.start.getTime();
      const durationInHrs = durationInMs / (1000 * 60 * 60);
      totalTimePlannedForPeriod += durationInHrs;
    });

    const averageTimePlanned =
      totalTasksCount > 0 ? totalTimePlannedForPeriod / totalTasksCount : 0;

    // ---- PIE (unchanged if you're still using it) ----
    const goalData = {};

    tasks.forEach((t) => {
      const g = t.category || "Uncategorised";
      const durationInMs =
        new Date(t.end).getTime() - new Date(t.start).getTime();
      const durationInHr = durationInMs / (1000 * 60 * 60);

      if (!goalData[g]) {
        goalData[g] = {
          count: 0,
          hours: 0,
        };
      }

      goalData[g].count = goalData[g].count + 1;
      goalData[g].hours = goalData[g].hours + durationInHr;
    });

    const pieChartData = Object.keys(goalData).map((g) => ({
      category: g,
      count: goalData[g].count,
      hours: goalData[g].hours,
    }));

    // ---- BAR (stacked) ----
    let barChartData = [];

    // Build a map keyed by day or month
    if (
      filter === "today" ||
      filter === "yesterday" ||
      filter === "thisweek" ||
      filter === "thismonth" ||
      filter === "lastmonth"
    ) {
      // day-based
      const dayMap = {}; // { 'YYYY-MM-DD': { Code: 3.5, Read: 1, ... } }

      tasks.forEach((t) => {
        const key = dayKeyLocal(t.start);
        const hours = (new Date(t.end) - new Date(t.start)) / (1000 * 60 * 60);
        if (!dayMap[key]) dayMap[key] = {};
        dayMap[key][t.category] = (dayMap[key][t.category] || 0) + hours;
      });

      // fill all days from start -> end (even if 0)
      const cursor = new Date(start);
      cursor.setHours(0, 0, 0, 0);
      const endDay = new Date(end);
      endDay.setHours(0, 0, 0, 0);

      while (cursor <= endDay) {
        const key = dayKeyLocal(cursor);
        const catMap = dayMap[key] || {};
        const categories = Object.keys(catMap).map((cat) => ({
          category: cat,
          hours: catMap[cat],
          color: categoryColorMap[cat] || "#999999",
        }));
        barChartData.push({ date: key, categories });
        cursor.setDate(cursor.getDate() + 1);
      }
    } else if (filter === "thisyear") {
      // month-based
      const monthMap = {}; // { 'YYYY-MM': { Code: 12, Read: 5, ... } }

      tasks.forEach((t) => {
        const key = monthKeyLocal(t.start); // "2025-01"
        const hours = (new Date(t.end) - new Date(t.start)) / (1000 * 60 * 60);
        if (!monthMap[key]) monthMap[key] = {};
        monthMap[key][t.category] = (monthMap[key][t.category] || 0) + hours;
      });

      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      // Fill Jan..Dec
      for (let m = 0; m < 12; m++) {
        const key = `${start.getFullYear()}-${String(m + 1).padStart(2, "0")}`; // for grouping
        const catMap = monthMap[key] || {};
        const categories = Object.keys(catMap).map((cat) => ({
          category: cat,
          hours: catMap[cat],
          color: categoryColorMap[cat] || "#999999",
        }));
        barChartData.push({
          date: monthNames[m], // 👈 this will show "Jan", "Feb" etc in the chart
          categories,
        });
      }
    }

    // Calculating top project using bar Chart data
    const { topCategory, maxHours } = findTopCategory(barChartData);

    res.status(200).json({
      success: true,
      length: tasks.length,
      barChartData,
      pieChartData,
      categoryColorMap,
      topProject: { topCategory, maxHours },
      averageTime: averageTimePlanned,
      totalTime: totalTimePlannedForPeriod,
      message: "Tasks fetched successfully!",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// fetch list of current user categories
taskRouter.get("/tasks/categories", ensureAuthenticated, async (req, res) => {
  try {
    // 1. Get the curr user
    const userId = req.user.id;

    // 2. get the user
    const user = await User.findOne({ _id: userId });

    res.json({
      success: true,
      categories: user.categories,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = taskRouter;

// /api/planner/stats?filter=thisMonth
// taskRouter.get("/tasks/stats", ensureAuthenticated, async (req, res) => {
//   try {
//     // 1. Get the current user, filter
//     const user = req.user.id;
//     const { filter } = req.query;

//     // 3. Get the tasks
//     const tasks = await Task.find({
//       user,
//       start: { $gte: start, $lte: end },
//     });

//     if (!tasks.length) {
//       return res.json({ pieChartData: [], barChartData: [] });
//     }

//     // 4. Get the user
//     const currentUser = await User.find({ _id: user });
//     console.log("ccccccccc", currentUser);

//     // category -> color mapping
//     const categoryColorMap = {};
//     currentUser[0].categories.forEach((cat) => {
//       categoryColorMap[cat.name] = cat.color;
//     });

//     const now = new Date();
//     let start, end;

//     // 🔹 filter ke hisaab se range decide
//     if (filter === "today") {
//       start = new Date(now.setHours(0, 0, 0, 0));
//       end = new Date(now.setHours(23, 59, 59, 999));
//     } else if (filter === "yesterday") {
//       start = new Date(now.setDate(now.getDate() - 1));
//       start.setHours(0, 0, 0, 0);
//       end = new Date(start);
//       end.setHours(23, 59, 59, 999);
//     } else if (filter === "thisweek") {
//       const day = now.getDay(); // 0 = Sunday
//       start = new Date(now);
//       start.setDate(now.getDate() - day + 1); // Monday se
//       start.setHours(0, 0, 0, 0);
//       end = new Date(start);
//       end.setDate(start.getDate() + 6); // Sunday tak
//       end.setHours(23, 59, 59, 999);
//     } else if (filter === "thisMonth") {
//       start = new Date(now.getFullYear(), now.getMonth(), 1);
//       end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
//     } else if (filter === "thisYear") {
//       start = new Date(now.getFullYear(), 0, 1);
//       end = new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999);
//     } else {
//       // default: all tasks
//       start = new Date(0);
//       end = new Date();
//     }

//     // Tasks ko filter karna
//     const filteredTasks = tasks.filter((task) => {
//       const taskDate = new Date(task.start);
//       return taskDate >= start && taskDate <= end;
//     });

//     // ****** 4. Prepare pie chart data *****
//     const pieDataMap = {};

//     filteredTasks.forEach((task) => {
//       const duration =
//         (new Date(task.end) - new Date(task.start)) / (1000 * 60 * 60); // hours
//       if (!pieDataMap[task.category]) {
//         pieDataMap[task.category] = 0;
//       }
//       pieDataMap[task.category] += duration;
//     });

//     const pieChartData = Object.keys(pieDataMap).map((cat) => ({
//       category: cat,
//       hours: pieDataMap[cat],
//       color: categoryColorMap[cat] || "#999999",
//     }));

//     // 5. ***** Prepare BAR CHART data ******
//     let barChartData = [];

//     if (filter === "thisYear") {
//       // month-wise
//       const months = [
//         "Jan",
//         "Feb",
//         "Mar",
//         "Apr",
//         "May",
//         "Jun",
//         "Jul",
//         "Aug",
//         "Sep",
//         "Oct",
//         "Nov",
//         "Dec",
//       ];
//       const monthlyMap = {};

//       filteredTasks.forEach((task) => {
//         const monthIdx = new Date(task.start).getMonth();
//         const duration =
//           (new Date(task.end) - new Date(task.start)) / (1000 * 60 * 60);

//         if (!monthlyMap[months[monthIdx]]) {
//           monthlyMap[months[monthIdx]] = {};
//         }
//         if (!monthlyMap[months[monthIdx]][task.category]) {
//           monthlyMap[months[monthIdx]][task.category] = 0;
//         }
//         monthlyMap[months[monthIdx]][task.category] += duration;
//       });

//       // 🔹 saare months add karo chahe empty ho
//       months.forEach((m) => {
//         if (!monthlyMap[m]) monthlyMap[m] = {};
//       });

//       barChartData = months.map((m) => ({
//         date: m,
//         categories: Object.keys(monthlyMap[m]).map((cat) => ({
//           category: cat,
//           hours: monthlyMap[m][cat],
//           color: categoryColorMap[cat] || "#999999",
//         })),
//       }));
//     } else {
//       // day-wise
//       const barDataMap = {};

//       filteredTasks.forEach((task) => {
//         const dateStr = formatDate(new Date(task.start));
//         const duration =
//           (new Date(task.end) - new Date(task.start)) / (1000 * 60 * 60);

//         if (!barDataMap[dateStr]) barDataMap[dateStr] = {};
//         if (!barDataMap[dateStr][task.category]) {
//           barDataMap[dateStr][task.category] = 0;
//         }
//         barDataMap[dateStr][task.category] += duration;
//       });

//       // 🔹 missing days fill karo
//       let current = new Date(start);
//       while (current <= end) {
//         const dateStr = formatDate(current);
//         if (!barDataMap[dateStr]) barDataMap[dateStr] = {};
//         current.setDate(current.getDate() + 1);
//       }

//       barChartData = Object.keys(barDataMap)
//         .sort()
//         .map((date) => ({
//           date,
//           categories: Object.keys(barDataMap[date]).map((cat) => ({
//             category: cat,
//             hours: barDataMap[date][cat],
//             color: categoryColorMap[cat] || "#999999",
//           })),
//         }));
//     }

//     // console.log(goalCounts);
//     // console.log(pieChartData);
//     // console.log("baaaaaaar : ", barChartData);

//     // 6. Send the res
//     res.status(200).json({
//       success: true,
//       length: tasks.length,
//       tasks,
//       // pieChartData,
//       barChartData,
//       message: "Tasks fetched successfully!",
//     });
//   } catch (err) {
//     res.status(500).json({
//       message: err.message,
//     });
//   }
// });
