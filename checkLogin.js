const { User } = require("./models");
module.exports = async () => {
  await User.update({ status: false }, { where: {} });
};
