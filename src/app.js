'use strict'

const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const app = express()
const router = express.Router();

//Conecta bando dados
mongoose.connect('mongodb+srv://wtnbrouli:wq6meIYCO1B6uNGM@cluster0.57xwpba.mongodb.net/')

//Carregar os models
const Product = require('./models/produt');


//Carrega rotas
const index = require('./routes/indexRoutes');
const product = require('./routes/productsRoutes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', index);
app.use('/products', product);

module.exports = app;