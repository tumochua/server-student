module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn("comments", "comment_likes", {
        type: Sequelize.JSON,
      }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn("comments", "comment_likes", {
        type: Sequelize.INTEGER,
      }),
    ]);
  },
};
