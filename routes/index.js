const express = require("express");
const router = express.Router();
router.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});
router.get("/", (req, res) => {
  return res.render("main");
});
router.get("/join", (req, res) => {
  return res.render("join");
});
module.exports = router;
