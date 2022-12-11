"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("class_students", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      studentId: {
        type: Sequelize.INTEGER,
      },
      keyMap: {
        type: Sequelize.STRING,
      },
      className: {
        type: Sequelize.STRING,
      },
      courseId: {
        type: Sequelize.INTEGER,
      },
      teacherId: {
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
    await queryInterface.dropTable("class_students");
  },
};
