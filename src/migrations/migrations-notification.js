"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("notifications", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
      },
      userIdApprove: {
        type: Sequelize.INTEGER,
      },
      userIdLikePost: {
        type: Sequelize.INTEGER,
      },
      commentsId: {
        type: Sequelize.INTEGER,
      },
      socketId: {
        type: Sequelize.STRING,
      },
      userName: {
        type: Sequelize.STRING,
      },
      statusId: {
        type: Sequelize.STRING,
        defaultValue: "T0",
      },
      postsId: {
        type: Sequelize.INTEGER,
      },
      roleId: {
        type: Sequelize.STRING,
      },
      readId: {
        type: Sequelize.STRING,
      },
      reason: {
        type: Sequelize.STRING,
      },
      typeId: {
        type: Sequelize.STRING,
      },
      content: {
        type: Sequelize.STRING,
      },
      title: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("notifications");
  },
};
