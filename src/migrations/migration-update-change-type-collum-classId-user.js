module.exports = {
  up: function (queryInterface, Sequelize) {
    // logic for transforming into the new state
    return queryInterface.changeColumn("users", "classId", Sequelize.STRING);
  },
  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn("users", "classId", {
        type: Sequelize.INTEGER,
      }),
    ]);
  },
};
