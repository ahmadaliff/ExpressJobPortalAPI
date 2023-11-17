"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../utils/bcryptUtil");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Application, {
        as: "UserApplicant",
        foreignKey: "applicantId",
      });
      User.hasMany(models.Application, {
        as: "Userhr",
        foreignKey: "hrId",
      });
      User.hasMany(models.Advertisement, {
        foreignKey: "hrId",
      });
    }
  }
  User.init(
    {
      fullName: DataTypes.STRING,
      email: DataTypes.STRING,
      role: DataTypes.STRING,
      password: DataTypes.STRING,
      isEmailAuth: DataTypes.BOOLEAN,
    },
    {
      hooks: {
        beforeCreate: (user) => {
          user.password = hashPassword(user.password);
          if (!user.isEmailAuth) {
            user.isEmailAuth = false;
          }
          if (!user.role) {
            user.role = "applicant";
          }
        },
        afterValidate: (user, options) => {
          user.username = "Toni";
        },
      },
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
