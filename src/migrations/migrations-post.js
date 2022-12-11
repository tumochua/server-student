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
        type: Sequelize.STRING,
      },
      commentsId: {
        type: Sequelize.STRING,
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
      },
      type: {
        type: Sequelize.STRING,
      },
      like: {
        type: Sequelize.STRING,
      },
      image: {
        type: Sequelize.BLOB("long"),
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
