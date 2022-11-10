const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { routines } = require("../db/seedData");
const routinesRouter = require("express").Router();
const { JWT_SECRET, COOKIE_SECRET } = process.env;
const {
  getAllRoutines,
  getAllPublicRoutines,
  createRoutines,
  getRoutineById,
  updateRoutine,
  destroyRoutine,
} = require("../db/adapters/routines");
const { authRequired } = require("./ultis");
const {
  getRoutineActivitiesByRoutine,
  destroyRoutineActivity,
} = require("../db/adapters/routine_activities");

routinesRouter.get("/", async (req, res, next) => {
  try {
    const allRoutines = await getAllPublicRoutines();
    res.send(allRoutines);
  } catch (error) {
    next(error);
  }
});

routinesRouter.post("/", authRequired, async (req, res, next) => {
  const { is_public, name, goal } = req.body;
  const { id } = req.user;
  const routineData = {
    creator_id: id,
    is_public,
    name,
    goal,
  };

  try {
    const routine = await createRoutines(routineData);
    console.log(routine);
    if (routine) {
      res.send({
        routine,
      });
    } else {
      res.status(400);
      next({ message: "error creating routine" });
    }
  } catch ({ message }) {
    next({ message });
  }
});

routinesRouter.patch("/:routineId", authRequired, async (req, res, next) => {
  const { routineId } = req.params;
  const { is_public, name, goal } = req.body;
  const updateFields = {};
  if (is_public) {
    updateFields.is_public = is_public;
  }
  if (name) {
    updateFields.name = name;
  }
  if (goal) {
    updateFields.goal = goal;
  }
  try {
    const originalRoutine = await getRoutineById(routineId);
    if (originalRoutine.creator_id === req.user.id) {
      const updatedRoutine = await updateRoutine(routineId, updateFields);
      res.send({ routine: updatedRoutine });
    } else {
      next({
        name: "UnauthorizedUserError",
        message: "You cannot update a routine that is not yours",
      });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

routinesRouter.delete("/:routineId", authRequired, async (req, res, next) => {
  try {
    const { routineId } = req.params;
    const routine = await getRoutineById(routineId);

    if (routine.creator_id === req.user.id) {
      console.log("before ra chjck");
      const ra = await getRoutineActivitiesByRoutine(routineId);
      if (ra) {
        const deletedRoutineActivity = await destroyRoutineActivity(routineId);
        console.log("deleted", deletedRoutineActivity);
        const deletedRoutine = await destroyRoutine(routineId);
        res.send({ Deleted: deletedRoutine });
      } else {
        const deletedRoutine = await destroyRoutine(routineId);
        res.send({ Deleted: deletedRoutine });
      }
    } else {
      next(
        routine
          ? {
              name: "Unauthorized User Error",
              message: "You cannot delete a routine which is not yours",
            }
          : {
              name: "Routine Not Found Error",
              message: "That routine does not exist",
            }
      );
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});
module.exports = routinesRouter;
