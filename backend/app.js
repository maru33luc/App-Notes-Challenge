const express = require('express');
require('dotenv').config();

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

app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true
  }));

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

app.use ('/notes', noteRoutes)
app.use ('/categories', categoryRoutes)
app.use ('/users', userRoutes)

