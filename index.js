const express = require('express');
const { appPort } = require('./config/env');
const { dbConnection } = require('./db/config');
const cors = require('cors');

//* Crear el servidor de express
const app = express();

//* Base de datos
dbConnection();

//* CORS
app.use(cors());

//* Directorio público
app.use(express.static('public'));

//* Lectura y parseo del body
app.use(express.json());

//* Rutas
// auth - crear, login, renew
app.use('/api/auth', require('./routes/auth'));

//* CRUD: Eventos
app.use('/api/events', require('./routes/events')); 

//* Escuchar peticiones
app.listen(appPort, () => {
    console.log(`Servidor corriendo en puerto ${appPort}`);
});  