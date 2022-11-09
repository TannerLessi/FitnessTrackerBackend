const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { getRoutineById } = require("../db/adapters/routines");
const routineActivitiesRouter = require("express").Router();
const {
  addActivityToRoutine,
  updateRoutineActivity,
  getRoutineActivityById,
  destroyRoutineActivity,
} = require("../db/adapters/routine_activities");
const { JWT_SECRET } = process.env;
const { authRequired } = require("./ultis");

routineActivitiesRouter.post("/", async (req, res, next) => {
  try {
    const routineActivities = await addActivityToRoutine(req.body);
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

routineActivitiesRouter.patch(
  "/:routineActivityId",
  authRequired,
  async (req, res, next) => {
    const { routineActivityId } = req.params;
    const { count, duration } = req.body;
    const updateFields = {};

    if (count) {
      updateFields.count = count;
    }
    if (duration) {
      updateFields.duration = duration;
    }

    try {
      const originalRoutine = await getRoutineById(routineActivityId);
      if (originalRoutine.creator_id === req.user.id) {
        const updatedRoutineActivity = await updateRoutineActivity(
          routineActivityId,
          updateFields
        );
        res.send({ routine: updatedRoutineActivity });
      } else {
        next({
          name: "UnauthorizedUserError",
          message: "You cannot update a routine_activity that is not yours",
        });
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  }
);

routineActivitiesRouter.delete(
  "/:routineActivityId",
  authRequired,
  async (req, res, next) => {
    try {
      console.log(req.user.id, "USER");
      const { routineActivityId } = req.params;
      const routineActivity = await getRoutineActivityById(routineActivityId);
      console.log(routineActivity, "RA");

      const routine = await getRoutineById(routineActivity.routine_id);
      console.log(routine, "routine");
      if (routine.creator_id === req.user.id) {
        const deletedRoutine = await destroyRoutineActivity(
          routineActivity.routine_id
        );
        res.send({ Deleted: deletedRoutine });
      } else {
        next(
          routineActivity
            ? {
                name: "Unauthorized User Error",
                message:
                  "You cannot delete a routine_activity which is not yours",
              }
            : {
                name: "Routine_activity Not Found Error",
                message: "That routine_activity does not exist",
              }
        );
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  }
);

module.exports = routineActivitiesRouter;
