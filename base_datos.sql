CREATE TABLE User (id INT, username VARCHAR(24) PRIMARY KEY NOT NULL, password VARCHAR(16) NOT NULL, name TINYTEXT NOT NULL, lastName TINYTEXT, secondLastName TINYTEXT, email varchar(128) NOT NULL, enabled BOOLEAN, token VARCHAR(512), FOREIGN KEY(token) REFERENCES Token(token));

CREATE TABLE Autor (id INT, license VARCHAR(12) PRIMARY KEY NOT NULL, name TINYTEXT NOT NULL, lastName TINYTEXT, secondLastName TINYTEXT, year SMALLINT);

CREATE TABLE Libro (id INT, ISBN VARCHAR(16) PRIMARY KEY NOT NULL, title VARCHAR(512) NOT NULL, autor_license VARCHAR(12), FOREIGN KEY (autor_license) REFERENCES Autor(license), editorial TINYTEXT, pages SMALLINT, year SMALLINT NOT NULL, genre TINYTEXT, language TINYTEXT NOT NULL, format TINYTEXT, sinopsis TEXT, content TEXT);

CREATE TABLE Token (id INT, token VARCHAR(512) PRIMARY KEY NOT NULL, used BOOLEAN, expiration DATE);