const { default: mongoose, get } = require("mongoose");
const { ensureAuthenticated } = require("../middlewares/Auth");
const Session = require("../model/Session");
const User = require("../model/User");
const getDateRange = require("../utils/getDateRange");
const getLevelFromHours = require("../utils/getLevelFromHours");
const updateAllUserRank = require("../utils/updateAllUserRank");
const getHourAndDay = require("../utils/getHourAndDay");
const getDayName = require("../utils/getDayName");
const classifyDistractionWithAI = require("../utils/aiService");
const {
  getGeminiChatModel,
  retrieveRelevantDocs,
} = require("../utils/chatbotUtils");
const sessionRouter = require("express").Router();

// sessionRouter.patch(
//   "/session/manageinvalid/:id",
//   ensureAuthenticated,
//   async (req, res) => {
//     try {
//       const userId = req.user.id;
//       const { id: sessionId } = req.params;
//       const { durationMs } = req.body;

//       if (!durationMs || durationMs < 0) {
//         return res.status(400).json({
//           success: false,
//           message: "Invalid session duration.",
//           error: "Duration is required and must be a positive number.",
//         });
//       }

//       // 1. Get the current session details first
//       const currentSession = await Session.findById(sessionId);

//       if (!currentSession) {
//         return res.status(404).json({
//           success: false,
//           message: "Session not found",
//           error: "Session not found",
//         });
//       }

//       // 2. Check user authorization
//       if (currentSession.user.toString() !== userId) {
//         return res.status(403).json({
//           success: false,
//           message: "Unauthorized to update this session",
//           error: "Unauthorized",
//         });
//       }

//       // 3. Update the session in one go
//       const updatedSession = await Session.findByIdAndUpdate(
//         sessionId,
//         {
//           $set: {
//             endTime: currentSession.startTime + durationMs,
//             status: "completed",
//           },
//         },
//         { new: true }
//       );

//       // 4. Update user details based on the new session duration
//       const sessionDurationHours = durationMs / (60 * 60 * 1000);
//       const currentUser = await User.findById(userId);

//       if (!currentUser) {
//         return res.status(404).json({
//           success: false,
//           message: "User not found",
//           error: "User not found",
//         });
//       }

//       const newTotalHours = currentUser.totalHours + sessionDurationHours;
//       const { level, badge, emoji } = getLevelFromHours(newTotalHours);

//       const updatedUser = await User.findByIdAndUpdate(
//         userId,
//         {
//           $set: {
//             totalHours: newTotalHours,
//             currentLevel: level,
//             currentBadge: badge,
//             currentTrophy: emoji,
//           },
//         },
//         { new: true }
//       );

//       return res.json({
//         success: true,
//         message: "Session and user updated successfully",
//         updatedSession,
//         currentUser: updatedUser,
//       });
//     } catch (err) {
//       console.error(err);
//       return res.status(500).json({
//         success: false,
//         message: err.message,
//         error: err.message,
//       });
//     }
//   }
// );

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
      const { level, badge, emoji } = getLevelFromHours(currentUser.totalHours);
      currentUser.currentLevel = level;
      currentUser.currentBadge = badge;
      currentUser.currentTrophy = emoji;
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

      updateAllUserRank();

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

    // 4. Update all users rank
    updateAllUserRank();

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

// sessionRouter.patch(
//   "/session/update/:id",
//   ensureAuthenticated,
//   async (req, res) => {
//     try {
//       // 1. Extract sessionId from url
//       const sessionId = req.params.id;

//       if (!mongoose.Types.ObjectId.isValid(sessionId)) {
//         return res.status(400).json({
//           success: false,
//           message: "Invalid session",
//           error: "Invalid session",
//         });
//       }

//       // summary, earlyEndReason, actualEndtime
//       const body = req.body;

//       console.log("incoming body : ", body);

//       // 2. update the database with specific id
//       const updatedSession = await Session.findByIdAndUpdate(sessionId, body, {
//         new: true,
//       });

//       // 3. Check if session exists or not
//       if (!updatedSession) {
//         return res.status(404).json({
//           error: "Session not found",
//           message: "Session not found",
//           location: "Sessionrouter/update/session",
//         });
//       }

//       // 4. Check user authorization
//       if (updatedSession.user.toString() !== req.user.id) {
//         return res.status(403).json({
//           success: false,
//           message: "Unauthorized to update this session",
//           error: "Unauthorized",
//         });
//       }

//       // 5. Update user level and total time tracked and update the user attached to the session
//       // To remove delay fixing it to Number(durationInHours.toFixed(4))
//       let durationMs = updatedSession.endTime - updatedSession.startTime;
//       const sessionDurationHours = durationMs / (60 * 60 * 1000);
//       const currentUser = await User.findById(req.user.id);

//       if (!currentUser) {
//         return res.status(404).json({
//           error: "user not found",
//           message: "user not found",
//           location: "Sessionrouter/update/session",
//         });
//       }

//       currentUser.totalHours = currentUser.totalHours + sessionDurationHours;
//       const { level, badge, emoji } = getLevelFromHours(currentUser.totalHours);

//       // console.log({ level, badge, emoji });
//       currentUser.currentLevel = level;
//       currentUser.currentBadge = badge;
//       currentUser.currentTrophy = emoji;
//       await currentUser.save();

//       updateAllUserRank();
//       // console.log("mmmmmmmmmm : ", updatedSession);
//       // console.log("mmmmmmmmmm : ", currentUser);
//       console.log("mmmmmmmmmm : ", emoji, level, badge);

//       return res.json({
//         success: true,
//         message: "Session updated successfully!",
//         updatedSession,
//         currentUser,
//       });
//     } catch (err) {
//       return res.status(400).json({
//         success: false,
//         message: err.message,
//         error: err.message,
//       });
//     }
//   }
// );

// ----------current ------

// sessionRouter.patch(
//   "/session/update/:id",
//   ensureAuthenticated,
//   async (req, res) => {
//     try {
//       // 1. Extract sessionId from url
//       const sessionId = req.params.id;

//       if (!mongoose.Types.ObjectId.isValid(sessionId)) {
//         return res.status(400).json({
//           success: false,
//           message: "Invalid session",
//           error: "Invalid session",
//         });
//       }

//       // summary, earlyEndReason, actualEndtime
//       const { summary, earlyEndReason, distractions, endTime, status } =
//         req.body;

//       // console.log("incoming body : ", body);

//       // 2. update the database with specific id
//       const session = await Session.findById(sessionId);

//       // 3. Check if session exists or not
//       if (!session) {
//         return res.status(404).json({
//           error: "Session not found",
//           message: "Session not found",
//           location: "Sessionrouter/update/session",
//         });
//       }

//       // 4. Check user authorization
//       if (session.user.toString() !== req.user.id) {
//         return res.status(403).json({
//           success: false,
//           message: "Unauthorized to update this session",
//           error: "Unauthorized",
//         });
//       }

//       // 4.1 Updating session fields
//       session.summary = summary !== undefined ? summary : session.summary;
//       session.earlyEndReason =
//         earlyEndReason !== undefined ? earlyEndReason : session.earlyEndReason;
//       session.endTime = endTime !== undefined ? endTime : session.endTime;
//       session.status = status !== undefined ? status : "completed";

//       // 4.2 Create ai logic for distraction
//       let classifiedDistractions = [];
//       if (distractions && distractions.length > 0) {
//         const classificationPromises = distractions.map(
//           async (distractionItem) => {
//             const category = await classifyDistractionWithAI(
//               distractionItem.reason
//             );

//             return { ...distractionItem, category: category };
//           }
//         );

//         classifiedDistractions = await Promise.all(classificationPromises);
//       }

//       // 4.3 save distraction
//       session.distractions = classifiedDistractions;

//       // 4.4 save session (session.save())
//       await session.save();

//       // 5. Update user level and total time tracked and update the user attached to the session
//       // To remove delay fixing it to Number(durationInHours.toFixed(4))
//       let durationMs = session.endTime - session.startTime;
//       const sessionDurationHours = durationMs / (60 * 60 * 1000);
//       const currentUser = await User.findById(req.user.id);

//       if (!currentUser) {
//         return res.status(404).json({
//           error: "user not found",
//           message: "user not found",
//           location: "Sessionrouter/update/session",
//         });
//       }

//       currentUser.totalHours = currentUser.totalHours + sessionDurationHours;
//       const { level, badge, emoji } = getLevelFromHours(currentUser.totalHours);

//       // console.log({ level, badge, emoji });
//       currentUser.currentLevel = level;
//       currentUser.currentBadge = badge;
//       currentUser.currentTrophy = emoji;
//       await currentUser.save();

//       updateAllUserRank();
//       // console.log("mmmmmmmmmm : ", updatedSession);
//       // console.log("mmmmmmmmmm : ", currentUser);
//       console.log("mmmmmmmmmm : ", emoji, level, badge);

//       return res.json({
//         success: true,
//         message: "Session updated successfully!",
//         updatedSession: session,
//         currentUser,
//       });
//     } catch (err) {
//       return res.status(400).json({
//         success: false,
//         message: err.message,
//         error: err.message,
//       });
//     }
//   }
// );

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

      const { summary, earlyEndReason, distractions, endTime, status } =
        req.body;

      // 2. Find and check if session exists
      const session = await Session.findById(sessionId);
      if (!session) {
        return res.status(404).json({
          error: "Session not found",
          message: "Session not found",
          location: "Sessionrouter/update/session",
        });
      }

      // 3. Check user authorization
      if (session.user.toString() !== req.user.id) {
        return res.status(403).json({
          success: false,
          message: "Unauthorized to update this session",
          error: "Unauthorized",
        });
      }

      // 4. Update session fields and save it immediately to send a fast response.
      session.summary = summary !== undefined ? summary : session.summary;
      session.earlyEndReason =
        earlyEndReason !== undefined ? earlyEndReason : session.earlyEndReason;
      session.endTime = endTime !== undefined ? endTime : session.endTime;
      session.status = status !== undefined ? status : "completed";

      // Save distractions directly from the request before AI classification.
      // This ensures the session is updated quickly.
      if (distractions) {
        session.distractions = distractions;
      }

      await session.save();

      // 5. Update user level and total time tracked
      let durationMs = session.endTime - session.startTime;
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

      currentUser.currentLevel = level;
      currentUser.currentBadge = badge;
      currentUser.currentTrophy = emoji;
      await currentUser.save();

      updateAllUserRank();
      console.log("mmmmmmmmmm : ", emoji, level, badge);

      // 6. Send response immediately to the client.
      res.json({
        success: true,
        message:
          "Session updated successfully! Distractions will be classified shortly.",
        updatedSession: session,
        currentUser,
      });

      // 7. Start AI classification in the background. Do not await this.
      if (distractions && distractions.length > 0) {
        (async () => {
          try {
            const classificationPromises = distractions.map(
              async (distractionItem) => {
                const category = await classifyDistractionWithAI(
                  distractionItem.reason
                );
                return { ...distractionItem, category: category };
              }
            );
            const classifiedDistractions = await Promise.all(
              classificationPromises
            );

            // Re-fetch the session to avoid any conflicts and update the distractions field.
            const sessionToUpdate = await Session.findById(sessionId);
            if (sessionToUpdate) {
              sessionToUpdate.distractions = classifiedDistractions;
              await sessionToUpdate.save();
              console.log(
                `Session ${sessionId} distractions classified and updated in the background.`
              );
            }
          } catch (err) {
            console.error(
              `Error classifying distractions for session ${sessionId}:`,
              err.message
            );
          }
        })();
      }
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

// Pagination for sessions
// /sessions?page=1&limit=10
sessionRouter.get("/sessions", ensureAuthenticated, async (req, res) => {
  try {
    const userId = req.user.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;
    const search = req.query.search || "";
    const range = req.query.range || "all";

    // Build mongodb query & always filter by user
    let query = { user: userId };

    // Add search filter
    if (search) {
      query.$or = [
        { taskTitle: { $regex: search, $options: "i" } },
        { sessionGoal: { $regex: search, $options: "i" } },
        { status: { $regex: search, $options: "i" } },
      ];
    }

    // Add date range filter
    const dateRange = getDateRange(range);
    if (dateRange.start && dateRange.end) {
      query.createdAt = { $gte: dateRange.start, $lte: dateRange.end };
    }

    // Count total matching sessions
    const totalSessions = await Session.countDocuments(query);

    const sessions = await Session.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      total: totalSessions,
      page,
      totalPages: Math.ceil(totalSessions / limit),
      data: sessions,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Get day prediction to achieve the next milestone based on the last 30 days data
sessionRouter.get(
  "/getMilestonePrediction",
  ensureAuthenticated,
  async (req, res) => {
    try {
      const userId = req.user.id;
      const currentUser = await User.findById(userId);

      // --- Fix 1: Correctly check if user exists ---
      if (!currentUser) {
        return res
          .status(404)
          .json({ success: false, message: "User not found." });
      }

      const milestonesData = [
        { level: "0", name: "Beginner", emoji: "🌱", points: 0 },
        { level: "1", name: "Novice", emoji: "🎖️", points: 50 },
        { level: "2", name: "Apprentice", emoji: "💡", points: 250 },
        { level: "3", name: "Journeyman", emoji: "🏅", points: 500 },
        { level: "4", name: "Master", emoji: "👑", points: 700 },
        { level: "5", name: "Expert", emoji: "🔥", points: 900 },
        { level: "6", name: "Champion", emoji: "🏆", points: 1000 },
        { level: "7", name: "Hero", emoji: "⚔️", points: 1200 },
        { level: "8", name: "Legend", emoji: "🌌", points: 1700 },
        { level: "9", name: "Mythic", emoji: "✨", points: 2400 },
        { level: "10", name: "Guardian", emoji: "🛡️", points: 3200 },
        { level: "11", name: "Pioneer", emoji: "🚀", points: 3900 },
        { level: "12", name: "Vanguard", emoji: "⚡", points: 4500 },
        { level: "13", name: "Trailblazer", emoji: "🌍", points: 6000 },
        { level: "14", name: "Overlord", emoji: "💥", points: 7500 },
        { level: "15", name: "Immortal", emoji: "🌟", points: 9000 },
      ];

      const sortedMilestones = [...milestonesData].sort(
        (a, b) => a.points - b.points
      );

      let nextMilestone = null;
      for (const milestone of sortedMilestones) {
        if (currentUser.totalHours < milestone.points) {
          nextMilestone = milestone;
          break;
        }
      }

      if (!nextMilestone) {
        return res.status(200).json({
          success: true,
          message:
            "Phenomenal! You have conquered all milestones. What's next for your incredible focus?",
        });
      }

      const numberOfDaysForAverage = 60;
      const sixtyDaysAgo = new Date(
        Date.now() - numberOfDaysForAverage * 24 * 60 * 60 * 1000
      );
      const recentSessions = await Session.find({
        user: userId,
        startTime: { $gte: sixtyDaysAgo.getTime() },
      });

      const totalHoursInLast60Days = recentSessions.reduce((sum, session) => {
        // --- Fix 2: Correctly calculate time for timestamps ---
        if (
          session.status !== "invalid session" &&
          session.endTime &&
          session.startTime &&
          session.endTime > session.startTime
        ) {
          return sum + (session.endTime - session.startTime) / (1000 * 60 * 60);
        }
        return sum;
      }, 0);

      let averageDailyHours = totalHoursInLast60Days / numberOfDaysForAverage;

      if (totalHoursInLast60Days === 0) {
        return res.status(200).json({
          success: true,
          message: `Keep going! Log more focus sessions in the last ${numberOfDaysForAverage} days to get a precise prediction for your ${nextMilestone.name} milestone.`,
        });
      }

      const MIN_AVERAGE_DAILY_HOURS = 0.05;
      if (averageDailyHours < MIN_AVERAGE_DAILY_HOURS) {
        averageDailyHours = MIN_AVERAGE_DAILY_HOURS;
      }

      const hoursToNextMilestone =
        nextMilestone.points - currentUser.totalHours;
      let daysToNextMilestone = Math.round(
        hoursToNextMilestone / averageDailyHours
      );

      if (daysToNextMilestone === 0 && hoursToNextMilestone > 0) {
        daysToNextMilestone = 1;
      }

      const message = `Based on your recent progress, you're on track to hit the ${nextMilestone.name} milestone ${nextMilestone.emoji} in about ${daysToNextMilestone} days!`;

      // --- Naya logic yahan se shuru hota hai ---
      let suggestionMessage = null;
      const TARGET_DAILY_HOURS = 6;

      if (averageDailyHours < TARGET_DAILY_HOURS) {
        const fastTrackDays = Math.round(
          hoursToNextMilestone / TARGET_DAILY_HOURS
        );
        suggestionMessage = `Want to get there faster? If you focus for ${TARGET_DAILY_HOURS} hours a day, you could reach this milestone in just ${fastTrackDays} days!`;
      }

      res.status(200).json({
        success: true,
        message: message,
        days: daysToNextMilestone,
        hoursToNextMilestone,
        averageDailyHours,
        suggestionMessage: suggestionMessage,
      });
    } catch (err) {
      console.error("Error in getMilestonePrediction:", err);
      res.status(500).json({
        success: false,
        message: "An internal server error occurred.",
      });
    }
  }
);

// Get optimal focus hrs by reading prev 90 days data
sessionRouter.get(
  "/getOptimalFocusPeriod",
  ensureAuthenticated, // Assuming this middleware exists
  async (req, res) => {
    try {
      const userId = req.user.id; // User ID from authenticated request

      // Fetch sessions for the last 90 days (you can adjust this)
      const ninetyDaysAgo = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000);
      const recentSessions = await Session.find({
        user: userId,
        startTime: { $gte: ninetyDaysAgo.getTime() }, // Compare timestamps
        status: { $ne: "invalid session" }, // Exclude invalid sessions
        endTime: { $ne: 0 }, // Exclude sessions that haven't ended or are invalid
      });

      if (recentSessions.length < 10) {
        // Not enough data for a meaningful prediction
        return res.status(200).json({
          success: true,
          message:
            "Log more focus sessions to get personalized optimal focus period recommendations!",
          recommendation: null,
        });
      }

      // Aggregate focus hours by day of the week and hour of the day
      const dailyHourlyFocus = {}; // { dayOfWeek: { hourOfDay: totalFocusHours } }

      recentSessions.forEach((session) => {
        const sessionStartTime = new Date(session.startTime);
        const sessionEndTime = new Date(session.endTime);

        if (sessionEndTime.getTime() > sessionStartTime.getTime()) {
          const durationHours =
            (sessionEndTime.getTime() - sessionStartTime.getTime()) /
            (1000 * 60 * 60);

          const { day, hour } = getHourAndDay(session.startTime);

          if (!dailyHourlyFocus[day]) {
            dailyHourlyFocus[day] = {};
          }
          if (!dailyHourlyFocus[day][hour]) {
            dailyHourlyFocus[day][hour] = 0;
          }
          dailyHourlyFocus[day][hour] += durationHours;
        }
      });

      // Find the optimal period (highest focus hours)
      let bestDay = -1;
      let bestStartHour = -1;
      let bestEndHour = -1;
      let maxBlockLength = 0;

      for (const day in dailyHourlyFocus) {
        const hoursInDay = dailyHourlyFocus[day];
        const sortedHours = Object.keys(hoursInDay)
          .map(Number)
          .sort((a, b) => a - b);

        for (let i = 0; i < sortedHours.length; i++) {
          const currentHour = sortedHours[i];
          let currentBlockLength = 1;
          let currentBlockEndHour = currentHour;

          for (let j = i + 1; j < sortedHours.length; j++) {
            const nextHour = sortedHours[j];
            if (nextHour === currentBlockEndHour + 1) {
              currentBlockLength++;
              currentBlockEndHour = nextHour;
            } else {
              break; // Block broken
            }
          }

          if (currentBlockLength > maxBlockLength) {
            maxBlockLength = currentBlockLength;
            bestDay = parseInt(day);
            bestStartHour = currentHour;
            bestEndHour = currentBlockEndHour;
          }
        }
      }

      let recommendationMessage =
        "We're still learning your focus patterns. Keep tracking your sessions!";

      if (bestDay !== -1 && maxBlockLength > 1) {
        const dayName = getDayName(bestDay);
        const hourStart = bestStartHour;
        const hourEnd = bestEndHour + 1; // End hour is the next hour
        const formatHour = (h) => {
          const suffix = h >= 12 ? "PM" : "AM";
          const hour12 = h % 12 === 0 ? 12 : h % 12;
          return `${hour12} ${suffix}`;
        };

        const formattedHourStart = formatHour(hourStart);
        const formattedHourEnd = formatHour(hourEnd);

        recommendationMessage = `Based on your focus habits, your peak productivity window is typically on ${dayName}s between ${formattedHourStart} and ${formattedHourEnd}. Try scheduling your most important tasks during this time to maximize your focus!`;
      }

      return res
        .status(200)
        .json({ success: true, message: recommendationMessage });
    } catch (err) {
      console.error("Error in getOptimalFocusPeriod:", err);
      return res.status(500).json({
        success: false,
        message: "An internal server error occurred.",
      });
    }
  }
);

// Chatbot
sessionRouter.post("/chatbot", ensureAuthenticated, async (req, res) => {
  try {
    const { query, history } = req.body;

    if (!query) {
      return res.status(400).json({
        success: false,
        message: "Query is required.",
      });
    }

    const model = await getGeminiChatModel();

    if (!model) {
      return res.status(400).json({
        success: false,
        message: "Chatbot service is not ready yet.",
      });
    }

    const relevantDocs = await retrieveRelevantDocs(query);

    console.log("Relevant docs : ..........", relevantDocs);

    const contextForAI =
      relevantDocs.length > 0
        ? `Here is some relevant information from the Focuspilot knowledge base:\n${relevantDocs
            .map((doc, i) => `${i + 1}. ${doc}`)
            .join("\n")}\n\n`
        : "";

    let fullHistory = [...history];

    const systemInstruction = {
      role: "user", // System instructions are often best as the first 'user' turn to set the stage
      parts: [
        {
          text: `You are a friendly and helpful AI assistant for a focus and productivity website called "Focuspilot". DO NOT mention that you are using a knowledge base or external information. Whenever possible, format your answers using bullet points or numbered lists for better readability and presentation.`,
        },
      ],
    };

    if (
      fullHistory.length === 0 ||
      fullHistory[0].role !== "user" ||
      fullHistory[0].parts[0].text !==
        'You are a friendly and helpful AI assistant for a focus and productivity website called "Focuspilot". DO NOT mention that you are using a knowledge base or external information.  Whenever possible, format your answers using bullet points or numbered lists for better readability and presentation.'
    ) {
      fullHistory.unshift(systemInstruction);
    }

    const chatSession = model.startChat({
      history: fullHistory,
      generationConfig: {
        maxOutputTokens: 1000, // balanced length
        temperature: 0.7, // more natural replies
        topP: 0.9,
        topK: 40,
      },
    });

    const messageContent = `${contextForAI}${query}`; // Combine RAG context with the user's query for this turn

    console.log(contextForAI);
    // console.log(messageContent);

    const result = await chatSession.sendMessage(messageContent);
    const response = result.response;
    const text = response.text(); // ← Not a Promise

    res.status(200).json({ success: true, response: text });
  } catch (err) {
    console.error("Error in chatbot route:", err.message);

    res.status(500).json({
      success: false,
      message:
        "An error occurred while processing your request. Please try again.",
      error: err.message,
    });
  }
});

// sessionRouter.get(
//   "/getMilestonePrediction",
//   ensureAuthenticated,
//   async (req, res) => {
//     try {
//       // 1. Get the current user
//       const userId = req.user.id;
//       const currentUser = await User.findById(userId);

//       if (Object.keys(currentUser).length === 0) {
//         return { success: false, message: "User not found." };
//       }

//       // 2. Import milestone data
//       const milestonesData = [
//         { level: "0", name: "Beginner", emoji: "🌱", points: 0 },
//         { level: "1", name: "Novice", emoji: "🎖️", points: 50 },
//         { level: "2", name: "Apprentice", emoji: "💡", points: 250 },
//         { level: "3", name: "Journeyman", emoji: "🏅", points: 500 },
//         { level: "4", name: "Master", emoji: "👑", points: 700 }, // Corrected placement for clarity if not sorted initially
//         { level: "5", name: "Expert", emoji: "🔥", points: 900 },
//         { level: "6", name: "Champion", emoji: "🏆", points: 1000 },
//         { level: "7", name: "Hero", emoji: "⚔️", points: 1200 },
//         { level: "8", name: "Legend", emoji: "🌌", points: 1700 },
//         { level: "9", name: "Mythic", emoji: "✨", points: 2400 },
//         { level: "10", name: "Guardian", emoji: "🛡️", points: 3200 },
//         { level: "11", name: "Pioneer", emoji: "🚀", points: 3900 },
//         { level: "12", name: "Vanguard", emoji: "⚡", points: 4500 },
//         { level: "13", name: "Trailblazer", emoji: "🌍", points: 6000 },
//         { level: "14", name: "Overlord", emoji: "💥", points: 7500 },
//         { level: "15", name: "Immortal", emoji: "🌟", points: 9000 },
//       ];

//       // 3. find users current and next milestone
//       const sortedMilestones = [...milestonesData].sort(
//         (a, b) => a.points - b.points
//       );
//       let nextMilestone = null;
//       for (const milestone of sortedMilestones) {
//         if (currentUser.totalHours < milestone.points) {
//           nextMilestone = milestone;
//           break;
//         }
//       }

//       // 4. If all milestones completed
//       if (!nextMilestone) {
//         res.status(200).json({
//           success: true,
//           message: "You have conquered all milestones!",
//         });
//       }

//       // 5. Extract previous 30 days data
//       const numberOfDaysForAverage = 60; // Use a variable for clarity
//       const sixtyDaysAgo = new Date(
//         Date.now() - numberOfDaysForAverage * 24 * 60 * 60 * 1000
//       );
//       const recentSessions = await Session.find({
//         user: userId,
//         startTime: { $gte: sixtyDaysAgo.getTime() },
//       });

//       // 6. Calculate total hrs for previous 30 days
//       const totalHoursInLast60Days = recentSessions.reduce((sum, session) => {
//         // Convert timestamps to Date objects for calculation
//         const sessionStartTime = new Date(session.startTime);
//         const sessionEndTime = new Date(session.endTime);

//         // Also check for 'invalid session' or endTime=0
//         if (
//           session.status !== "invalid session" &&
//           sessionEndTime.getTime() > sessionStartTime.getTime() &&
//           session.endTime !== 0
//         ) {
//           return (
//             sum +
//             (sessionEndTime.getTime() - sessionStartTime.getTime()) /
//               (1000 * 60 * 60)
//           );
//         }
//         return sum;
//       }, 0);

//       // --- Important Fixes Here ---
//       let averageDailyHours = totalHoursInLast60Days / numberOfDaysForAverage;

//       // 7. Handle cases with very low or zero average activity
//       if (totalHoursInLast60Days === 0) {
//         return res.status(200).json({
//           success: true,
//           message: `Keep going! Log more focus sessions in the last ${numberOfDaysForAverage} days to get a precise prediction for your ${nextMilestone.name} milestone.`,
//         });
//       }

//       // Set a minimum average daily hours to prevent "0 days" prediction from minimal activity
//       const MIN_AVERAGE_DAILY_HOURS = 0.05; // e.g., 3 minutes of focus per day
//       if (averageDailyHours < MIN_AVERAGE_DAILY_HOURS) {
//         averageDailyHours = MIN_AVERAGE_DAILY_HOURS; // Cap at minimum average
//       }

//       // 8. Milestone prediction calculate karein
//       const hoursToNextMilestone =
//         nextMilestone.points - currentUser.totalHours;
//       let daysToNextMilestone = Math.round(
//         hoursToNextMilestone / averageDailyHours
//       );

//       // Prevent prediction from being 0 if hoursToNextMilestone is > 0
//       if (daysToNextMilestone === 0 && hoursToNextMilestone > 0) {
//         daysToNextMilestone = 1; // At least 1 day if there's progress to be made
//       }

//       const message = `Based on your recent progress, you're on track to hit the ${nextMilestone.name} milestone ${nextMilestone.emoji} in about ${daysToNextMilestone} days!`;

//       res
//         .status(200)
//         .json({ success: true, message: message, days: daysToNextMilestone });
//     } catch (err) {
//       res.status(500).json({ success: false, message: err.message });
//     }
//   }
// );

module.exports = sessionRouter;
