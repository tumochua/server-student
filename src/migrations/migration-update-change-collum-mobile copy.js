module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn("users", "mobile", {
        type: Sequelize.STRING,
        allowNull: true,
      }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn("users", "mobile", {
        type: Sequelize.INTEGER,
        allowNull: true,
      }),
    ]);
  },
};
