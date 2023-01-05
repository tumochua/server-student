"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("posts", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
      },
      commentsId: {
        type: Sequelize.INTEGER,
      },
      date: {
        type: Sequelize.STRING,
      },
      title: {
        type: Sequelize.STRING,
      },
      contentHTML: {
        type: Sequelize.TEXT("long"),
      },
      contentMarkdown: {
        type: Sequelize.TEXT("long"),
      },
      description: {
        type: Sequelize.TEXT("long"),
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: "S0",
      },
      type: {
        type: Sequelize.STRING,
      },
      likeId: {
        type: Sequelize.INTEGER,
      },
      likeSize: {
        type: Sequelize.INTEGER,
      },
      image: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("posts");
  },
};
