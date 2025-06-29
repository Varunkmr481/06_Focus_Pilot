const { default: mongoose } = require("mongoose");
const { ensureAuthenticated } = require("../middlewares/Auth");
const Session = require("../model/Session");
const User = require("../model/User");
const getLevelFromHours = require("../utils/getLevelFromHours");
const getDateRange = require("../utils/getDateRange");
const sessionRouter = require("express").Router();

sessionRouter.patch(
  `/session/manageinvalid/:id`,
  ensureAuthenticated,
  async (req, res) => {
    try {
      // 1. Get the user, duration, sessionId
      const userId = req.user.id;
      const { id: sessionId } = req.params;
      const { durationMs } = req.body;
      const sessionDurationHours = durationMs / (60 * 60 * 1000);

      // 2. update the User total hrs
      const currentUser = await User.findById(userId);

      if (!currentUser) {
        return res.status(404).json({
          message: "User not found",
          error: "User not found",
          location: "SessionRouter/session/manageinvalid/try",
        });
      }

      currentUser.totalHours = currentUser.totalHours + sessionDurationHours;
      await currentUser.save();

      // 3. update the session
      const currentSession = await Session.findById(sessionId);

      if (!currentSession) {
        return res.status(404).json({
          message: "Session not found",
          error: "Session not found",
          location: "SessionRouter/session/manageinvalid/try",
        });
      }

      currentSession.endTime = currentSession.startTime + durationMs;
      currentSession.status = "completed";
      await currentSession.save();

      // 4. Send success response
      return res.json({
        success: true,
        message: "Session updated successfully",
        updatedSession: currentSession,
      });
    } catch (err) {
      console.error(err);

      res.status(500).json({
        success: false,
        message: err.message,
        error: err.message,
      });
    }
  }
);

sessionRouter.delete(
  `/session/delete/:id`,
  ensureAuthenticated,
  async (req, res) => {
    try {
      // 1. extract session id
      const { id } = req.params;

      // 2. check is id given
      if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          error: "Invalid Session ID",
          message: "Invalid Session ID",
        });
      }

      // 3. Delete the session
      const deletedSession = await Session.deleteOne({
        _id: id,
        user: req.user.id,
      });

      if (deletedSession.deletedCount === 0) {
        return res.status(404).json({
          error: "Session not found",
          message: "No session deleted",
        });
      }

      res.status(200).json({
        message: "Session deleted",
        deletedSession,
      });
    } catch (err) {
      res.status(500).json({
        error: err.message,
        message: err.message,
        location: "SessionRouter/session/delete/catch",
      });
    }
  }
);

sessionRouter.get("/session/filter", ensureAuthenticated, async (req, res) => {
  try {
    // 1. extract userid and range
    const userId = req.user.id;
    const { range } = req.query;
    const { start, end } = getDateRange(range);

    // 2. Creating the query for Session model
    const query = { user: userId };
    if (start && end) {
      query.createdAt = { $gte: start, $lte: end };
    }

    // 3. find session with spc. start and end
    const sessions = await Session.find(query).sort({ createdAt: -1 });

    // 4. Send response
    res.status(200).json({
      success: true,
      message: `Sessions filtered!`,
      sessions,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
      error: err.message,
      location: "sessionRouter/session/filter/catch",
    });
  }
});

sessionRouter.get("/session/currAll", ensureAuthenticated, async (req, res) => {
  try {
    // 1. extract current user
    const currUser = req.user;

    if (!currUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        error: "User not found",
        location: "SessionRouter/session/currAll/try",
      });
    }

    // 2. get the id of the current user
    const currUserId = currUser.id;

    // 3. Get all sessions of the current user
    const sessions = await Session.find({ user: currUserId }).sort({
      startTime: -1,
    });

    // 4. send response
    res.status(200).json({
      success: true,
      total: sessions.length,
      sessions,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong while fetching sessions.",
      error: err.message,
    });
  }
});

sessionRouter.get("/session/count", ensureAuthenticated, async (req, res) => {
  try {
    // 1. Extract user detail
    const currentUser = req.user;

    if (!currentUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        error: "User not found",
        location: "SessionRouter/session/count/try",
      });
    }

    // 2. get the id of the current user
    const currUserId = currentUser.id;
    console.log("count", currUserId);

    // 3. Now search for all the sessions with that id
    const totalSessions = await Session.countDocuments({ user: currUserId });

    // 4. Send the response
    res.status(200).json({
      success: true,
      totalSessions,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
      error: err.message,
      location: "SessionRouter/session/count/catch",
    });
  }
});

sessionRouter.post("/session/create", ensureAuthenticated, async (req, res) => {
  try {
    // 1. Extracting user id, and body
    const userId = req.user.id;
    const body = req.body;

    if (!userId || !body) {
      return res.status(400).json({
        success: false,
        message: "Error! Login & Try again",
        error: "Error! Login & Try again",
        location: "sessionRouter/session/create/try",
      });
    }

    // 2. Create session obj according to schema
    const sessionObj = {
      user: userId,
      status: body.status,
      taskTitle: body.taskTitle,
      startTime: body.startTime,
      endTime: body.endTime,
      summary: body.summary,
      distractions: body.distractions,
      sessionGoal: body.sessionGoal,
    };

    // 3. Create session
    const session = await Session.create({
      ...sessionObj,
    });

    return res.status(201).json({
      success: true,
      message: "Session created successfully",
      data: sessionObj,
      sessionId: session._id,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
      error: err.message,
      location: "SessionRouter/session/create/catch",
    });
  }
});

sessionRouter.patch(
  "/session/update/:id",
  ensureAuthenticated,
  async (req, res) => {
    try {
      // 1. Extract sessionId from url
      const sessionId = req.params.id;

      if (!mongoose.Types.ObjectId.isValid(sessionId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid session",
          error: "Invalid session",
        });
      }

      // summary, earlyEndReason, actualEndtime
      const body = req.body;

      console.log("incoming bosy", body);

      // 2. update the database with specific id
      const updatedSession = await Session.findByIdAndUpdate(sessionId, body, {
        new: true,
      });

      // 3. Check if session exists or not
      if (!updatedSession) {
        return res.status(404).json({
          error: "Session not found",
          message: "Session not found",
          location: "Sessionrouter/update/session",
        });
      }

      // 4. Check user authorization
      if (updatedSession.user.toString() !== req.user.id) {
        return res.status(403).json({
          success: false,
          message: "Unauthorized to update this session",
          error: "Unauthorized",
        });
      }

      // 5. Update user level and total time tracked and update the user attached to the session
      const durationMs = updatedSession.endTime - updatedSession.startTime;
      const sessionDurationHours = durationMs / (60 * 60 * 1000);
      const currentUser = await User.findById(req.user.id);

      if (!currentUser) {
        return res.status(404).json({
          error: "user not found",
          message: "user not found",
          location: "Sessionrouter/update/session",
        });
      }

      currentUser.totalHours = currentUser.totalHours + sessionDurationHours;
      const { level, badge, emoji } = getLevelFromHours(currentUser.totalHours);
      // console.log({ level, badge, emoji });
      currentUser.currentLevel = level;
      currentUser.currentBadge = badge;
      currentUser.currentTrophy = emoji;
      await currentUser.save();
      console.log(updatedSession);
      console.log(currentUser);
      console.log(level, badge);

      return res.json({
        success: true,
        message: "Session updated successfully!",
        updatedSession,
        currentUser,
      });
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: err.message,
        error: err.message,
      });
    }
  }
);

// DELETE broken sessions of current user
sessionRouter.delete(
  "/session/delete-broken",
  ensureAuthenticated,
  async (req, res) => {
    try {
      const result = await Session.deleteMany({
        user: req.user.id,
        endTime: 0,
        startTime: { $lt: Date.now() - 2 * 60 * 1000 }, // older than 2 min
      });

      return res.json({
        success: true,
        deleted: result.deletedCount,
        message: `${result.deletedCount} broken sessions deleted.`,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }
);

module.exports = sessionRouter;
