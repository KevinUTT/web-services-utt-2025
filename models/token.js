const { DataTypes, Model } = require('sequelize');
const MySQL = require('../utils/database');

class Token extends Model {}

Token.init(
  {
    token: {
        type: DataTypes.STRING,
        allowNull: false
    },
    used: {
        type: DataTypes.BOOLEAN
    },
    expiration: {
        type: DataTypes.DATE
    }
  },
  {
    sequelize: MySQL.getSequelize,
    timestamps: false,
    modelName: "Token"
  }
);

Token.tableName = "Token";

module.exports = Token;