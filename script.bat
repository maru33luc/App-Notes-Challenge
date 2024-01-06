@echo off

REM Script to set up and run the application

REM Database configuration
# Create the database 
mysql -u your_mysql_user -p your_mysql_password -e "CREATE DATABASE IF NOT EXISTS notes_challenge;"

# Create users table
mysql -u your_mysql_user -p your_mysql_password notes_challenge -e "CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    correo VARCHAR(255) NOT NULL UNIQUE,
    contraseñaHash VARCHAR(255) NOT NULL,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL
);"

# Create categorias table
mysql -u your_mysql_user -p your_mysql_password notes_challenge -e "CREATE TABLE IF NOT EXISTS categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion VARCHAR(255),
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL
);"

# Create notas table
mysql -u your_mysql_user -p your_mysql_password notes_challenge -e "CREATE TABLE IF NOT EXISTS notas (
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
);"
 
REM Backend configuration
echo Installing backend dependencies...
cd backend
npm install

REM Frontend configuration
echo Installing frontend dependencies...
cd ../frontend
npm install

REM Start the backend
echo Starting the backend server...
cd ../backend
start npm start

REM Wait for a few seconds to ensure the backend is up and running
timeout /t 5

REM Start the frontend
echo Starting the frontend application...
cd ../frontend
start npm start
