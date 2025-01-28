const { DataTypes, Model } = require('sequelize');
const MySQL = require('../utils/database');

class Autor extends Model {}

Autor.init(
  {
    license: {
        type: DataTypes.STRING,
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
    year: {
        type: DataTypes.SMALLINT
    }
  },
  {
    sequelize: MySQL.getSequelize,
    timestamps: false,
    modelName: "Autor"
  }
);

Autor.tableName = "Autor";

module.exports = Autor;