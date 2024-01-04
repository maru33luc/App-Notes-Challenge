const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');

const db = require('./data/db');
const noteRoutes = require('./src/routes/notesRoutes');
const categoryRoutes = require('./src/routes/categoryRoutes');

app.use (express.json());   
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true
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

