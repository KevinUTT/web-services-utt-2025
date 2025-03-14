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
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    autor_license: {
      type: DataTypes.STRING,
      allowNull: false
    },
    editorial: {
        type: DataTypes.TEXT
    },
    pages: {
        type: DataTypes.SMALLINT
    },
    year: {
        type: DataTypes.SMALLINT,
        allowNull: false
    },
    genre: {
        type: DataTypes.TEXT
    },
    language: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    format: {
      type: DataTypes.TEXT
    },
    sinopsis: {
      type: DataTypes.TEXT
    },
    content: {
      type: DataTypes.TEXT
    }
  },
  {
    sequelize: MySQL.getSequelize,
    timestamps: false,
    modelName: "Libro"
  }
);

Libro.tableName = "Libro";

module.exports = Libro;