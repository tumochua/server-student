"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Notification.belongsTo(models.AllCode, {
        foreignKey: "statusId",
        targetKey: "KeyMap",
        as: "statusNotification",
      });
      Notification.belongsTo(models.AllCode, {
        foreignKey: "readId",
        targetKey: "KeyMap",
        as: "readData",
      });
    }
  }
  Notification.init(
    {
      userId: DataTypes.INTEGER,
      userName: DataTypes.STRING,
      statusId: DataTypes.STRING,
      postsId: DataTypes.INTEGER,
      roleId: DataTypes.STRING,
      readId: DataTypes.STRING,
      reason: DataTypes.STRING,
      type: DataTypes.STRING,
      content: DataTypes.STRING,
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Notification",
    }
  );
  return Notification;
};
