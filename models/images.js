const Sequelize = require("sequelize");
module.exports = class Images extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        image: { type: Sequelize.STRING(200), allowNull: false },
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
        modelName: "Image",
        tableName: "images",
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    db.Image.belongsTo(db.Item);
  }
};
