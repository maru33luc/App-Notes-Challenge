#!/bin/bash

# Set environment variables
export MYSQL_USER=root
export MYSQL_DATABASE=notas_challenge
export MYSQL_PASSWORD=your_password_here

# Database configuration
mysql -u $MYSQL_USER -p$MYSQL_PASSWORD -e "CREATE DATABASE IF NOT EXISTS $MYSQL_DATABASE;"

# Create SQL file
cat <<EOF > create_tables.sql
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    correo VARCHAR(255) NOT NULL UNIQUE,
    contrasenaHash VARCHAR(255) NOT NULL,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion VARCHAR(255),
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS notas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    usuarioId INT NOT NULL,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL,
    categoriaId INT,
    activa BOOLEAN NOT NULL DEFAULT TRUE,
    FOREIGN KEY (usuarioId) REFERENCES usuarios(id),
    FOREIGN KEY (categoriaId) REFERENCES categorias(id)
);
EOF

# Execute SQL file
mysql -u $MYSQL_USER -p$MYSQL_PASSWORD $MYSQL_DATABASE < create_tables.sql

# Backend configuration
echo "Installing backend dependencies..."
cd backend || exit
npm install

# Start the backend
echo "Starting the backend server..."
npm start &

# Wait for a few seconds to ensure the backend is up and running
sleep 5

# Frontend configuration
echo "Installing frontend dependencies..."
cd ../frontend || exit
npm install

# Start the frontend
echo "Starting the frontend application..."
npm start
