module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("users", "parentId");
  },
};
