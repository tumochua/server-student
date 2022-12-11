"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("parents", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      parentId: {
        type: Sequelize.INTEGER,
      },
      fullNameFather: {
        type: Sequelize.STRING,
      },
      fullNameMommy: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
      },
      addressFather: {
        type: Sequelize.STRING,
      },
      addressMommy: {
        type: Sequelize.STRING,
      },
      dobFather: {
        type: Sequelize.STRING,
      },
      dobMommy: {
        type: Sequelize.STRING,
      },
      mobile: {
        type: Sequelize.STRING,
      },
      genderFatherId: {
        type: Sequelize.STRING,
        defaultValue: "M",
      },
      genderMommyId: {
        type: Sequelize.STRING,
        defaultValue: "F",
      },
      image: {
        type: Sequelize.BLOB,
      },
      profile: {
        type: Sequelize.STRING,
      },
      date_of_join: {
        type: Sequelize.TEXT,
      },
      status: {
        type: Sequelize.BOOLEAN,
      },
      last_login: {
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("parents");
  },
};
