const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const routineActivitiesRouter = require("express").Router();
const { addActivityToRoutine } = require("../db/adapters/routine_activities");
const { JWT_SECRET, COOKIE_SECRET } = process.env;
const { authRequired } = require("./ultis");

routineActivitiesRouter.post("/routine_activities", async (req, res, next) => {
  const { routine_id, activity_id, count, duration } = req.body;
  const routineActivitiesData = {
    routine_id,
    activity_id,
    count,
    duration,
  };

  try {
    const routineActivities = await addActivityToRoutine(routineActivitiesData);
    console.log(routineActivities);
    if (routineActivities) {
      res.send({
        routineActivities,
      });
    } else {
      res.status(400);
      next({ message: "error creating activity" });
    }
  } catch ({ message }) {
    next({ message });
  }
});
