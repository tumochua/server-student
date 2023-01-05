module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("posts", "likeSize", Sequelize.INTEGER);
  },
  down: function (queryInterface, Sequelize) {
    // logic for reverting the changes
    return queryInterface.removeColumn("Users", "likeSize");
  },
};
