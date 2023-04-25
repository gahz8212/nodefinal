const express = require("express");
const router = express.Router();
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
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
  // return res.render("main", { title: "ITEMs" });
});
router.get("/join", (req, res) => {
  return res.render("join");
});

router.get("/departs", async (req, res, next) => {
  if (!Array.isArray(req.query.departs)) {
    req.query.departs = [req.query.departs];
  }
  console.log("value:", req.query.departs);
  // // const departs = req.query.depart.split(",");
  try {
    const contents = await Item.findAll({
      where: { depart: { [Op.in]: req.query.departs } },
      include: [{ model: Image }],
      order: [["id", "desc"]],
    });
    // console.log(contents);
    return res.render("main", { title: "difficult", contents });
  } catch (e) {
    console.error(e);
    next(e);
  }
});
router.get("/search", async (req, res) => {
  try {
    const search = req.query.item;
    if (search) {
      const contents = await Item.findAll({
        where: { itemname: { [Op.like]: `%${search}%` } },
        include: [{ model: Image }],
        order: [["id", "desc"]],
      });
      return res.render("main", { title: "ITEMs", contents });
    } else {
      const contents = await Item.findAll({
        include: [{ model: Image }],
        order: [["id", "desc"]],
      });
      return res.render("main", { title: "ALL", contents });
    }
  } catch (e) {
    console.error(e);
  }
});
module.exports = router;
