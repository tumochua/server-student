"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Like.belongsTo(models.Post, {
        foreignKey: "postId",
        as: "postsData",
      });
    }
  }
  Like.init(
    {
      userId: DataTypes.INTEGER,
      postId: DataTypes.INTEGER,
      status: DataTypes.BOOLEAN,
      size: DataTypes.INTEGER,
      commentId: DataTypes.INTEGER,
      time: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Like",
    }
  );
  return Like;
};
