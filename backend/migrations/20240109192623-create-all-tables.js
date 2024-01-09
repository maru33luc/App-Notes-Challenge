'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Crea la tabla 'categorias'
    await queryInterface.createTable('categorias', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      nombre: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      descripcion: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });

    // Crea la tabla 'usuarios'
    await queryInterface.createTable('usuarios', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      nombre: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      correo: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true
      },
      contraseñaHash: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });

    // Crea la tabla 'notas'
    await queryInterface.createTable('notas', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      title: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      usuarioId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'usuarios',
          key: 'id'
        }
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      categoriaId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'categorias',
          key: 'id'
        }
      },
      activa: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      }
    });

    // Agrega una restricción de clave foránea entre 'notas' y 'usuarios'
    await queryInterface.addConstraint('notas', {
      fields: ['usuarioId'],
      type: 'foreign key',
      name: 'fk_notas_usuarioId',
      references: {
        table: 'usuarios',
        field: 'id'
      },
      onDelete: 'cascade'
    });

    // Agrega una restricción de clave foránea entre 'notas' y 'categorias'
    await queryInterface.addConstraint('notas', {
      fields: ['categoriaId'],
      type: 'foreign key',
      name: 'fk_notas_categoriaId',
      references: {
        table: 'categorias',
        field: 'id'
      },
      onDelete: 'cascade'
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Revierte la creación de las tablas en orden inverso
    await queryInterface.dropTable('notas');
    await queryInterface.dropTable('usuarios');
    await queryInterface.dropTable('categorias');
  }
};
