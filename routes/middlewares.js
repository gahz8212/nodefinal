exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    const message = encodeURIComponent("로그인이 필요 합니다.");
    return res.redirect(`/?loginError=${message}`);
  }
};
exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next();
  } else {
    const message = encodeURIComponent("이미 로그인이 되어 있습니다.");
    return res.redirect(`/?loginError=${message}`);
  }
};
