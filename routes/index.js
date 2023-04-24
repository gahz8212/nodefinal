const express = require("express");
const router = express.Router();
const { User, Item, Image } = require("../models");
router.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});
router.get("/", async (req, res, next) => {
  try {
    const contents = await Item.findAll({
      include: [{ model: Image }],
      order: [["id", "desc"]],
    });

    return res.render("main", { title: "ITEMs", contents });
  } catch (e) {
    console.error(e);
    return next(e);
  }
});
router.get("/join", (req, res) => {
  return res.render("join");
});
router.get("/search", async (req, res) => {
  try {
    const search = req.query.search;
    if (search) {
      const contents = await Item.findAll({
        where: { itemname: search },
        include: [{ model: Image }],
        order: [["id", "desc"]],
      });

      return res.render("main", { title: "ITEMs", contents });
    } else {
      const contents = await Item.findAll({
        include: [{ model: Image }],
        order: [["id", "desc"]],
      });

      return res.render("main", { title: "ITEMs", contents });
    }
  } catch (e) {
    console.error(e);
  }
});
module.exports = router;
