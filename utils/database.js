const Sequelize = require('sequelize');
const config = require('../config.json');

class Database {
    constructor() {
        this.host = config.database.host;
        this.databaseType = config.database.type;
    }

    async connect(database, user, password) {
        this.database = database;
        this.user = user;
        this.password = password;
        this.sequelize = new Sequelize(config.database.db, config.database.user, config.database.password, {
            host: this.host,
            dialect: this.databaseType // one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle'
        });

        try {
            await this.sequelize.authenticate();
            console.log('Connection has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }

    get getSequelize() {
        return this.sequelize;
    }
}

if(!global.database_singletone) {
    //Crear la instancia
    global.database_singletone = new Database();
    global.database_singletone.connect();
}

module.exports = global.database_singletone;