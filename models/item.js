const Sequelize = require("sequelize");
module.exports = class Item extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        itemcate: { type: Sequelize.STRING(30), allowNull: false },
        employee: { type: Sequelize.STRING(10), allowNull: false },
        itemname: { type: Sequelize.STRING(30), allowNull: false },
        itemdescription: { type: Sequelize.STRING(200), allowNull: false },
        use: { type: Sequelize.BOOLEAN, defaultValue: true },
        depart: {
          type: Sequelize.ENUM("office", "develop", "manufact", "package"),
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
        modelName: "Item",
        tableName: "items",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }
  static associate(db) {
    db.Item.hasMany(db.Image);
    db.Item.belongsTo(db.User);
  }
};
