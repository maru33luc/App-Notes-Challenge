@echo off

REM Set MYSQL_PWD environment variable
set MYSQL_PWD=Maru29luc

REM Script to set up and run the application

REM Database configuration
mysql -u root -e "CREATE DATABASE IF NOT EXISTS notas_challenge;"

REM Create SQL file
echo CREATE TABLE IF NOT EXISTS usuarios ( > create_tables.sql
echo    id INT AUTO_INCREMENT PRIMARY KEY, >> create_tables.sql
echo    nombre VARCHAR(255) NOT NULL, >> create_tables.sql
echo    correo VARCHAR(255) NOT NULL UNIQUE, >> create_tables.sql
echo    contrasenaHash VARCHAR(255) NOT NULL, >> create_tables.sql
echo    createdAt DATETIME NOT NULL, >> create_tables.sql
echo    updatedAt DATETIME NOT NULL >> create_tables.sql
echo ); >> create_tables.sql

echo CREATE TABLE IF NOT EXISTS categorias ( >> create_tables.sql
echo    id INT AUTO_INCREMENT PRIMARY KEY, >> create_tables.sql
echo    nombre VARCHAR(255) NOT NULL, >> create_tables.sql
echo    descripcion VARCHAR(255), >> create_tables.sql
echo    createdAt DATETIME NOT NULL, >> create_tables.sql
echo    updatedAt DATETIME NOT NULL >> create_tables.sql
echo ); >> create_tables.sql

echo CREATE TABLE IF NOT EXISTS notas ( >> create_tables.sql
echo    id INT AUTO_INCREMENT PRIMARY KEY, >> create_tables.sql
echo    title VARCHAR(255) NOT NULL, >> create_tables.sql
echo    content TEXT NOT NULL, >> create_tables.sql
echo    usuarioId INT NOT NULL, >> create_tables.sql
echo    createdAt DATETIME NOT NULL, >> create_tables.sql
echo    updatedAt DATETIME NOT NULL, >> create_tables.sql
echo    categoriaId INT, >> create_tables.sql
echo    activa BOOLEAN NOT NULL DEFAULT TRUE, >> create_tables.sql
echo    FOREIGN KEY (usuarioId) REFERENCES usuarios(id), >> create_tables.sql
echo    FOREIGN KEY (categoriaId) REFERENCES categorias(id) >> create_tables.sql
echo ); >> create_tables.sql

REM Execute SQL file
mysql -u root notas_challenge < create_tables.sql

REM Backend configuration
echo Installing backend dependencies...
cd backend
npm install

REM Start the backend
echo Starting the backend server...
start /B npm start

REM Wait for a few seconds to ensure the backend is up and running
timeout /t 5

REM Frontend configuration
echo Installing frontend dependencies...
cd ../frontend
npm install

REM Start the frontend
echo Starting the frontend application...
npm start