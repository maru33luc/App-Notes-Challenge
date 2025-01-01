const { DataTypes } = require('sequelize');
const db = require('../../data/db');
const User = require('./userModel');
const Category = require('../models/categoryModel');


const Note = db.define('notas', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    usuarioId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
    },
    categoriaId: {
        type: DataTypes.INTEGER, 
        allowNull: true 
    },
    activa: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
    
}, 
{ timestamps: true,
    // schema: 'public'

}
);

Note.belongsTo(User, { foreignKey: 'usuarioId' });
Note.belongsTo(Category, { foreignKey: 'categoriaId' });

module.exports = Note;
