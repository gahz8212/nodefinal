const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const passport = require("passport");
const { User } = require("../models");
router.post("/join", async (req, res, next) => {
  const email = req.body.email;

  const password = req.body.password;
  const name = req.body.name;
  const title = req.body.title;
  try {
    const exUser = await User.findOne({ where: { email } });
    if (exUser) {
      return res.redirect("/join/?joinError=conflict");
    } else {
      const hash = await bcrypt.hash(password, 12);
      await User.create({ email, name, title, password: hash });
      return res.redirect("/");
    }
  } catch (e) {
    console.error(e);
    return next(e);
  }
});
router.post("/login", async (req, res, next) => {
  passport.authenticate("local", (authError, user, info) => {
    if (authError) {
      console.log(authError);
      return next(authError);
    }
    if (!user) {
      return res.redirect(`/?loginError=${info.message}`);
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      return res.redirect("/");
    });
  })(req, res, next);
});
router.get("/logout", async (req, res, next) => {
  return req.logout((e) => {
    if (e) {
      return res.redirect("/");
    } else {
      req.session.destroy();
      return res.redirect("/");
    }
  });
});
module.exports = router;
