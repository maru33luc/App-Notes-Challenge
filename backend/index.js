const express = require('express');
require('dotenv').config();
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

const cors = require('cors');

const session = require('express-session');
const cookieParser = require('cookie-parser');

const db = require('./data/db');
const noteRoutes = require('./src/routes/notesRoutes');
const categoryRoutes = require('./src/routes/categoryRoutes');
const userRoutes = require('./src/routes/userRoutes');

app.use (express.json());   
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Servir archivos estáticos desde la carpeta 'dist', en la raíz del sitio
app.use(express.static(path.join(__dirname, '../frontend/dist/frontend/browser')));

app.use(cors({
  origin: 'http://localhost:4000', //production
  credentials: true
}));

app.use ('/notes', noteRoutes)
app.use ('/categories', categoryRoutes)
app.use ('/users', userRoutes)

// Ruta de fallback para manejar rutas Angular (evitar errores 404 al recargar la página)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/frontend/browser/index.html'));
})

  const secretKey = 'secretKey';

app.use(session({
    secret : secretKey,
    resave : false,
    saveUninitialized : false,
}));

  const conexionDB = async ()=> {
    try{
        await db.authenticate();
        console.log("conexion exitosa");
    }catch(error){
        console.log(error);
    }
}



app.listen(port, () => {
    conexionDB();
    console.log(`API_BACK listening at http://localhost:${port}`);
    
});



