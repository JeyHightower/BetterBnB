'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    static associate() {
      // define association here
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [4, 30],
          isNotEmail(value) {
            if (ValidatorsImpl.isEmail(value)) {
              throw new Error('Cannot be an email.');
            }
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        Validate: {
          len: [3, 256],
          isEmail: true,
        },
      },
      hashedPassword: {

        type: DataTypes.STRING.BINARY,
        allowNull: false,
        Validate: {
          len: [60, 60],
        },
      },
    },
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING,
        allowNUll: false
      }
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
