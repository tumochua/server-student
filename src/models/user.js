"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // console.log("models", models);
      User.belongsTo(models.AllCode, {
        foreignKey: "genderId",
        targetKey: "KeyMap",
        as: "genderData",
      });
      User.belongsTo(models.AllCode, {
        foreignKey: "roleId",
        targetKey: "KeyMap",
        as: "roleData",
      });
      User.hasOne(models.Parents, {
        foreignKey: "userId",
        as: "parentData",
      });

      ///student
      User.belongsTo(models.Class_Students, {
        foreignKey: "classId",
        targetKey: "keyMap",
        as: "classData",
      });
      User.hasMany(models.Post, {
        foreignKey: "userId",
        targetKey: "userId",
        as: "userData",
      });
      // User.belongsTo(models.Notification, {
      //   foreignKey: "notificationId",
      //   targetKey: "userId",
      //   as: "notificationData",
      // });
      // User.hasMany(models.Notification, {
      //   foreignKey: "userId",
      //   // targetKey: "id",
      //   targetKey: "notificationId",
      //   as: "notificationData",
      // });

      /// comment
      User.hasOne(models.Comments, {
        foreignKey: "authorId",
        // targetKey: "userId",
        as: "authorData",
      });
    }
  }
  User.init(
    {
      fullName: DataTypes.STRING,
      email: DataTypes.STRING,
      address: DataTypes.STRING,
      passwordHash: DataTypes.STRING,
      dob: DataTypes.STRING,
      roleId: DataTypes.STRING,
      mobile: DataTypes.STRING,
      genderId: DataTypes.STRING,
      classId: DataTypes.STRING,
      userIdNotification: DataTypes.INTEGER,
      sizeNotification: DataTypes.INTEGER,
      profile: DataTypes.TEXT,
      date_of_join: DataTypes.DATE,
      status: DataTypes.BOOLEAN,
      last_login: DataTypes.DATE,
      image: DataTypes.BLOB,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
