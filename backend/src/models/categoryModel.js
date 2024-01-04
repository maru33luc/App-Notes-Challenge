const { DataTypes } = require('sequelize');
const db = require('../../data/db');

const Category = db.define('categorias', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
    }
    }, { timestamps: true });

module.exports = Category;