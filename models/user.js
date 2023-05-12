const Sequelize = require("sequelize");
module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        email: { type: Sequelize.STRING(50), unique: true, allowNull: false },
        name: { type: Sequelize.STRING(10), allowNull: false },
        title: {
          type: Sequelize.ENUM(
            "대표",
            "부장",
            "차장",
            "팀장",
            "과장",
            "대리",
            "사원"
          ),
          allowNull: false,
        },
        password: { type: Sequelize.STRING(200), allowNull: false },
        status: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        createdAt: {
          type: "TIMESTAMP",
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
        updatedAt: {
          type: "TIMESTAMP",
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        paranoid: false,
        modelName: "User",
        tableName: "users",
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    db.User.hasMany(db.Item);
  }
};
