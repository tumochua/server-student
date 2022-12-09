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
        foreignKey: "parentId",
        as: "parentData",
      });
      User.belongsTo(models.Class_Students, {
        foreignKey: "classId",
        targetKey: "keyMap",
        as: "classData",
      });
      // User.hasMany(models.Class_Students, {
      //   foreignKey: "keyMap",
      //   as: "keyMapData",
      // });
    }
  }
  User.init(
    {
      fullName: DataTypes.STRING,
      email: DataTypes.STRING,
      address: DataTypes.STRING,
      passwordHash: DataTypes.STRING,
      dob: DataTypes.DATE,
      roleId: DataTypes.STRING,
      mobile: DataTypes.INTEGER,
      genderId: DataTypes.STRING,
      classId: DataTypes.INTEGER,
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
