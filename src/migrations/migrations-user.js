"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      fullName: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        isEmail: true,
      },
      passwordHash: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      mobile: {
        type: Sequelize.STRING,
        unique: true,
      },
      roleId: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: "0",
      },
      genderId: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: "0",
      },
      address: {
        type: Sequelize.STRING,
      },
      positionId: {
        type: Sequelize.STRING,
      },
      profile: {
        type: Sequelize.TEXT,
      },
      dateOfBirth: {
        type: Sequelize.DATE,
      },
      parentID: {
        type: Sequelize.STRING,
      },
      isLogin: {
        type: Sequelize.BOOLEAN,
      },
      status: {
        type: Sequelize.BOOLEAN,
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
    await queryInterface.dropTable("Users");
  },
};
