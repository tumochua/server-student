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
      // Notification.belongsTo(models.Notification_Read, {
      //   foreignKey: "readId",
      //   targetKey: "notificationId",
      //   as: "notificationRead",
      // });
      Notification.belongsTo(models.AllCode, {
        foreignKey: "typeId",
        targetKey: "KeyMap",
        as: "typeNotification",
      });

      Notification.belongsTo(models.User, {
        foreignKey: "userId",
        // targetKey: "userId",
        as: "userNotificationSize",
      });
      // Notification.belongsTo(models.User, {
      //   foreignKey: "userId",
      //   targetKey: "notificationId",
      //   as: "notificationData",
      // });
    }
  }
  Notification.init(
    {
      userId: DataTypes.INTEGER,
      userIdApprove: DataTypes.INTEGER,
      socketId: DataTypes.STRING,
      userName: DataTypes.STRING,
      statusId: DataTypes.STRING,
      postsId: DataTypes.INTEGER,
      roleId: DataTypes.STRING,
      readId: DataTypes.STRING,
      reason: DataTypes.STRING,
      typeId: DataTypes.STRING,
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
