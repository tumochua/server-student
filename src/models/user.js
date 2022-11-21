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
      address: DataTypes.STRING,
      passwordHash: DataTypes.STRING,
      dob: DataTypes.DATE,
      roleId: DataTypes.STRING,
      mobile: DataTypes.INTEGER,
      parentID: DataTypes.STRING,
      genderId: DataTypes.STRING,
      profile: DataTypes.TEXT,
      date_of_join: DataTypes.DATE,
      status: DataTypes.BOOLEAN,
      last_login: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
