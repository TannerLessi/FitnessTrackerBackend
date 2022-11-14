const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { getPublicRoutinesByUser } = require("../db/adapters/routines");
const authRouter = require("express").Router();
const {
  createUser,
  getUserByUsername,
  getUser,
} = require("../db/adapters/users");
const { JWT_SECRET, COOKIE_SECRET } = process.env;
const { authRequired } = require("./ultis");
const SALT_ROUNDS = 10;

authRouter.post("/register", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const userexists = await getUserByUsername(username);

    if (userexists) {
      next({
        name: "UserExisistsError",
        message: "user already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    console.log("Hello");
    const user = await createUser({ username, password: hashedPassword });

    delete user.password;

    const token = jwt.sign(user, JWT_SECRET);

    res.cookie("token", token, {
      sameSite: "strict",
      httpOnly: true,
      signed: true,
    });

    res.send({ user });
  } catch (error) {
    next(error);
  }
});
authRouter.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    console.log({ username, password });
    const user = await getUserByUsername(username);
    console.log(user);
    const validPassword = await bcrypt.compare(password, user.password);

    if (validPassword) {
      const token = jwt.sign(user, JWT_SECRET);

      res.cookie("token", token, {
        sameSite: "strict",
        httpOnly: true,
        signed: true,
      });

      delete user.password;

      res.send({ user, token });
    } else {
      next({
        name: "Error logging in",
        message: "Invalid login",
      });
    }
  } catch (error) {
    next(error);
  }
});
authRouter.post("/logout", async (req, res, next) => {
  try {
    res.clearCookie("token", {
      sameSite: "strict",
      httpOnly: true,
      signed: true,
    });
    res.send({
      loggedIn: false,
      message: "Logged Out",
    });
  } catch (error) {
    next(error);
  }
});

authRouter.get("/me", authRequired, async (req, res, next) => {
  try {
    res.send(req.user);
  } catch (error) {
    next(error);
  }
});

authRouter.get("/:username/routines", authRequired, async (req, res, next) => {
  const { is_public, name, goal } = req.body;
  const { username } = req.params;
  try {
    const routines = await getPublicRoutinesByUser(username);
    res.send({
      routines,
      is_public,
      name,
      goal,
    });
  } catch (error) {}
});

module.exports = authRouter;
