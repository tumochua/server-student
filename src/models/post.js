"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.User, {
        foreignKey: "userId",
        // targetKey: "userId",
        as: "userData",
      });
      Post.hasMany(models.Like, {
        foreignKey: "postId",
        targetKey: "postId",
        as: "postsData",
      });
    }
  }
  Post.init(
    {
      userId: DataTypes.INTEGER,
      commentsId: DataTypes.INTEGER,
      date: DataTypes.STRING,
      title: DataTypes.STRING,
      contentHTML: DataTypes.TEXT("long"),
      contentMarkdown: DataTypes.TEXT("long"),
      description: DataTypes.TEXT("long"),
      status: DataTypes.STRING,
      type: DataTypes.STRING,
      likeId: DataTypes.INTEGER,
      image: DataTypes.BLOB("long"),
    },
    {
      sequelize,
      modelName: "Post",
    }
  );
  return Post;
};
