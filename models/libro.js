const { DataTypes, Model } = require('sequelize');
const MySQL = require('../utils/database');

class Libro extends Model {}

//CREATE TABLE Libro(id INT, ISBN VARCHAR(16), nombre TEXT, autor TINYTEXT, año SMALLINT, num_paginas SMALLINT, editorial TEXT);
Libro.init(
  {
    ISBN: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nombre: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    autor: {
        type: DataTypes.STRING,
        allowNull: false
    },
    año: {
        type: DataTypes.SMALLINT,
        allowNull: false
    },
    num_paginas: {
        type: DataTypes.SMALLINT,
        allowNull: false
    },
    editorial: {
        type: DataTypes.TEXT,
        allowNull: false
    },
  },
  {
    sequelize: MySQL.getSequelize,
    timestamps: false,
    modelName: "Libro"
  }
);

Libro.tableName = "Libro";

module.exports = Libro;