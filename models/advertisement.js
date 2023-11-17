"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Advertisement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Advertisement.belongsTo(models.User, {
        foreignKey: "hrId",
      });
    }
  }
  Advertisement.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      hrId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Advertisement",
    }
  );
  return Advertisement;
};
