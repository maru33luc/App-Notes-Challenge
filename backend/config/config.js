const fs = require('fs');
require ('dotenv').config();

module.exports = {
    "development": {
        "username": process.env.DB_USER,
        "password": process.env.DB_PASSWORD,
        "database": process.env.DB_NAME,
        "host": process.env.DB_HOST,
        // "dialect": "postgres",
        "dialect": "mysql",
        "port": process.env.DB_PORT,
        // "schema": "public",
        // "dialectOptions": {
        //     "ssl": {
        //         "require": true,
        //         "rejectUnauthorized": false
        //     }
        // }
    },
    "test": {
        "username": process.env.DB_USER,
        "password": process.env.DB_PASSWORD,
        "database": process.env.DB_NAME,
        "host": process.env.DB_HOST,
        "dialect": "postgres",
        "port": process.env.DB_PORT
    },
    "production": {
        "username": process.env.DB_USER,
        "password": process.env.DB_PASSWORD,
        "database": process.env.DB_NAME,
        "host": process.env.DB_HOST,
        "dialect": "postgres",
        "port": process.env.DB_PORT,
        "dialectOptions": {
            "ssl": {
                "require": true,
                "rejectUnauthorized": false
            }
        }
    }
    }