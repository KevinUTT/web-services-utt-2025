const { DataTypes, Model } = require('sequelize');
const MySQL = require('../utils/database');

class User extends Model {}

User.init(
  {
    username: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    lastName: {
        type: DataTypes.TEXT
    },
    secondLastName: {
        type: DataTypes.TEXT
    },
    email: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    enabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
  },
  {
    sequelize: MySQL.getSequelize,
    timestamps: false,
    modelName: "User"
  }
);

User.tableName = "User";

module.exports = User;