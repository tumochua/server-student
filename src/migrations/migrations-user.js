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
      address: {
        type: Sequelize.STRING,
      },
      passwordHash: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      dob: {
        type: Sequelize.DATE,
        unique: true,
      },
      roleId: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      mobile: {
        type: Sequelize.INTEGER,
        unique: true,
      },
      parentID: {
        type: Sequelize.STRING,
      },
      genderId: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      profile: {
        type: Sequelize.TEXT,
      },
      date_of_join: {
        type: Sequelize.DATE,
      },
      status: {
        type: Sequelize.BOOLEAN,
      },
      last_login: {
        type: Sequelize.DATE,
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
