"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Class_Students extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Class_Students.hasMany(models.User, {
        foreignKey: "classId",
        as: "classData",
      });
    }
  }
  Class_Students.init(
    {
      studentId: DataTypes.INTEGER,
      keyMap: DataTypes.STRING,
      className: DataTypes.STRING,
      courseId: DataTypes.INTEGER,
      teacherId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Class_Students",
    }
  );
  return Class_Students;
};
