const router = require("express").Router();
const { authRequired } = require("./ultis");
router.get("/health", authRequired, (req, res, next) => {
  res.send("All healthy and ready to go!");
});
router.use("/auth", require("./auth"));

module.exports = router;
