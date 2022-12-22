"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("likes", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
      },
      postId: {
        type: Sequelize.INTEGER,
      },
      status: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      size: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      commentId: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      time: {
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
    await queryInterface.dropTable("likes");
  },
};
