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
} = require("../db/adapters/routines");
const { authRequired } = require("./ultis");

routinesRouter.get("/", async (req, res, next) => {
  try {
    const allRoutines = await getAllPublicRoutines();
    res.send({
      allRoutines,
    });
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
module.exports = routinesRouter;
