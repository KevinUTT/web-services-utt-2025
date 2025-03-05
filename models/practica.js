const { DataTypes, Model } = require('sequelize');
const MySQL = require('../utils/database');

class Practica extends Model {}

Practica.init(
  {
    x: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    y: {
        type: DataTypes.INTEGER
    },
    z: {
        type: DataTypes.TEXT
    }
  },
  {
    sequelize: MySQL.getSequelize,
    timestamps: false,
    modelName: "Practica"
  }
);

Practica.tableName = "Practica";

module.exports = Practica;