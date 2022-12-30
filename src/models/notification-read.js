"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Notification_Read extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // console.log(models);
      Notification_Read.belongsTo(models.AllCode, {
        foreignKey: "readId",
        targetKey: "KeyMap",
        as: "readData",
      });
      Notification_Read.hasMany(models.Notification, {
        foreignKey: "readId",
        as: "notificationRead",
      });
    }
  }
  Notification_Read.init(
    {
      notificationId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      postsId: DataTypes.INTEGER,
      commentsId: DataTypes.INTEGER,
      likeId: DataTypes.INTEGER,
      readId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Notification_Read",
    }
  );
  return Notification_Read;
};
