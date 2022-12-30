module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.renameColumn(
      "Users",
      "UserIdNotification",
      "userIdNotification"
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn(
      "Users",
      "UserIdNotification",
      "userIdNotification"
    );
  },
};
