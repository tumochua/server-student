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
    }
  }
  User.init(
    {
      fullName: DataTypes.STRING,
      email: DataTypes.STRING,
      passwordHash: DataTypes.STRING,
      mobile: DataTypes.STRING,
      roleId: DataTypes.STRING,
      genderId: DataTypes.STRING,
      address: DataTypes.STRING,
      positionId: DataTypes.STRING,
      profile: DataTypes.TEXT,
      dateOfBirth: DataTypes.DATE,
      parentID: DataTypes.STRING,
      isLogin: DataTypes.BOOLEAN,
      status: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
