"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Comments.belongsTo(models.User, {
        foreignKey: "authorId",
        // targetKey: "userId",
        as: "authorData",
      });
    }
  }
  Comments.init(
    {
      authorId: DataTypes.INTEGER,
      postId: DataTypes.INTEGER,
      time: DataTypes.STRING,
      text: DataTypes.TEXT,
      parent_slug: DataTypes.STRING,
      score: DataTypes.INTEGER,
      slug: DataTypes.STRING,
      comment_likes: DataTypes.JSON,
      comment_like_num: DataTypes.INTEGER,
      full_slug: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Comments",
    }
  );
  return Comments;
};
