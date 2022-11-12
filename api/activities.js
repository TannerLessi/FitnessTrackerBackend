const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  getActivities,
  createActivities,
  updateActivity,
  getActivityById,
} = require("../db/adapters/activities");
const { getPublicRoutinesByActivity } = require("../db/adapters/routines");
const { activities } = require("../db/seedData");
const activitiesRouter = require("express").Router();
const { JWT_SECRET, COOKIE_SECRET } = process.env;
const { authRequired } = require("./ultis");

activitiesRouter.get("/", async (req, res, next) => {
  try {
    const allActivities = await getActivities();
    res.send(allActivities);
  } catch (error) {
    next(error);
  }
});

activitiesRouter.post("/", authRequired, async (req, res, next) => {
  const { name, description } = req.body;
  const activityData = {
    name,
    description,
  };

  try {
    const activity = await createActivities(activityData);
    console.log(activity);
    if (activity) {
      res.send({
        activity,
      });
    } else {
      res.status(400);
      next({ message: "error creating activity" });
    }
  } catch ({ message }) {
    next({ message });
  }
});

activitiesRouter.patch("/:activityId", async (req, res, next) => {
  const { activityId } = req.params;
  const { name, description } = req.body;
  const updateFields = {};
  if (name) {
    updateFields.name = name;
  }
  if (description) {
    updateFields.description = description;
  }
  try {
    const originalActivity = await getActivityById(activityId);
    console.log(originalActivity);
    const updatedActivity = await updateActivity(activityId, updateFields);
    res.send({ activity: updatedActivity });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

activitiesRouter.get("/:activityId/routines", async (req, res, next) => {
  const { is_public, name, goal } = req.body;
  const { activityId } = req.params;
  console.log(activityId);
  try {
    const routineActivities = await getPublicRoutinesByActivity(activityId);
    console.log(routineActivities);
    res.send({
      routineActivities,
      is_public,
      name,
      goal,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = activitiesRouter;
