"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Parents extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Parents.belongsTo(models.AllCode, {
        foreignKey: "genderFatherId",
        targetKey: "KeyMap",
        as: "genderFatherData",
      });
      Parents.belongsTo(models.AllCode, {
        foreignKey: "genderMommyId",
        targetKey: "KeyMap",
        as: "genderMommyData",
      });
      Parents.belongsTo(models.User, {
        foreignKey: "userId",
        as: "parentData",
      });
    }
  }
  Parents.init(
    {
      userId: DataTypes.INTEGER,
      fullNameFather: DataTypes.STRING,
      fullNameMommy: DataTypes.STRING,
      email: DataTypes.STRING,
      addressFather: DataTypes.STRING,
      addressMommy: DataTypes.STRING,
      dobFather: DataTypes.STRING,
      dobMommy: DataTypes.STRING,
      mobile: DataTypes.STRING,
      genderFatherId: DataTypes.STRING,
      genderMommyId: DataTypes.STRING,
      image: DataTypes.BLOB,
      profile: DataTypes.TEXT,
      date_of_join: DataTypes.DATE,
      status: DataTypes.BOOLEAN,
      last_login: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Parents",
    }
  );
  return Parents;
};
