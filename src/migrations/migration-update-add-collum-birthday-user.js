module.exports = {
  up: function (queryInterface, Sequelize) {
    // logic for transforming into the new state
    return queryInterface.addColumn("users", "birthday", Sequelize.STRING);
  },
};
