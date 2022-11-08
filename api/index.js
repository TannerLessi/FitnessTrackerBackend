const router = require("express").Router();
const { authRequired } = require("./ultis");
router.get("/health", authRequired, (req, res, next) => {
  res.send("All healthy and ready to go!");
});
router.use("/users", require("./users"));
router.use("/routines", require("./routines"));
router.use("/activities", require("./activities"));
router.use("/routine_activities", require("./routine_activities"));
module.exports = router;
