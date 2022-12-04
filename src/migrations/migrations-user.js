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
      },
      roleId: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: "R0",
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
        defaultValue: "M",
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
    await queryInterface.dropTable("Users");
  },
};
