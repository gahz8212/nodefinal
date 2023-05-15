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
    const users = await User.findAll({ where: { status: true } });
    // console.log(users);
    return res.render("main", { title: "ITEMs", contents, users });
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
  if (!Array.isArray(req.query.depart)) {
    req.query.departs = [req.query.depart];
  }
  console.log("value:", req.query.departs);
  const departs = req.query.depart.split(",");
  try {
    const contents = await Item.findAll({
      where: { depart: { [Op.in]: departs } },
      include: [{ model: Image }],
      order: [["id", "desc"]],
    });

    return res.json({ contents });
  } catch (e) {
    console.error(e);
    next(e);
  }
});
router.get("/search/:item", async (req, res) => {
  try {
    const search = req.params.item;
    console.log(decodeURIComponent(search));
    if (search) {
      const searchSplit = search.split("&");
      console.log(searchSplit[0]);
      const category = searchSplit[1].split(",");
      console.log(category);
      const contents = await Item.findAll({
        where: {
          itemname: { [Op.like]: `%${searchSplit[0]}%` },
          depart: { [Op.in]: category },
        },
        include: [{ model: Image }],
        order: [["id", "desc"]],
      });
      return res.json(contents);
    } else {
      const contents = await Item.findAll({
        include: [{ model: Image }],
        order: [["id", "desc"]],
      });
      return res.json(contents);
    }
  } catch (e) {
    console.error(e);
  }
});
module.exports = router;
