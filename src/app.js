import express  from "express";
import dotenv from 'dotenv';
import errorHandler from "./middleware/errorHandler.js";
import routerStudios from "./routes/studios.js";
import routerAnime from "./routes/animes.js";
import cors from 'cors';

//const express = require('express')

const app = express();//Instancio

dotenv.config();

const PORT = process.env.PORT || 3000;  //lA CONSTANTE POR VA A A BUSCAR EN PROCCESS .ENV UN PUERTO SINO LO VA A ASIGNAR AL PUERTO 3000

app.use(express.json());
app.use('/animes',routerAnime);
app.use('/studios', routerStudios);
app.use(errorHandler);
app.use(cors());

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
})