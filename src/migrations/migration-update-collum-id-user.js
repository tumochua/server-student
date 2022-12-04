// module.exports = {
//   up: (queryInterface, Sequelize) => {
//     return Promise.all([
//       queryInterface.changeColumn("users", "id", {
//         type: Sequelize.UUID,
//         defaultValue: Sequelize.UUIDV4,
//         allowNull: false,
//         primaryKey: true,
//         unique: true,
//         //   allowNull: true,
//       }),
//     ]);
//   },

//   down: (queryInterface, Sequelize) => {
//     return Promise.all([
//       queryInterface.changeColumn("users", "id", {
//         allowNull: false,
//         autoIncrement: true,
//         primaryKey: true,
//         type: Sequelize.INTEGER,
//         //   allowNull: true,
//       }),
//     ]);
//   },
// };
