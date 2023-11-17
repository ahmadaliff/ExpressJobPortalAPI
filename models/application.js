"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Application extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Application.belongsTo(models.User, {
        as: "UserApplicant",
        foreignKey: "applicantId",
      });
      Application.belongsTo(models.User, {
        as: "Userhr",
        foreignKey: "hrId",
      });
    }
  }
  Application.init(
    {
      status: DataTypes.STRING,
      applicantId: DataTypes.INTEGER,
      advertisementId: DataTypes.INTEGER,
      hrId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Application",
    }
  );
  return Application;
};
