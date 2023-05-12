const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { User } = require("../models");
const bcrypt = require("bcrypt");
module.exports = () => {
  passport.use(
    new LocalStrategy(
      { usernameField: "email", passwordField: "password" },
      async (email, password, done) => {
        try {
          const exUser = await User.findOne({ where: { email } });
          if (exUser) {
            const result = await bcrypt.compare(password, exUser.password);
            if (result) {
              const status = exUser.status;
              if (status) {
                done(null, false, {
                  message: "이미 다른 PC에서 로그인 중 입니다.",
                });
              } else {
                done(null, exUser);
              }
            } else {
              done(null, false, { message: "비밀번호 오류 입니다." });
            }
          } else {
            done(null, false, { message: "가입되지 않은 이메일 입니다." });
          }
        } catch (e) {
          console.log(e);
          done(e);
        }
      }
    )
  );
};
