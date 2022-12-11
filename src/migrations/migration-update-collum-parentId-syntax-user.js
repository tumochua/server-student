module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.renameColumn("users", "parentID", "parentId");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn("users", "parentId", "parentID");
  },
};
