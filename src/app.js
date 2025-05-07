'use strict'

const express = require('express')
const bodyParser = require("body-parser");

const app = express()
const router = express.Router();

//Carrega rotas
const index = require('./routes/indexRoutes');
const product = require('./routes/productsRoutes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));



app.use('/', index);
app.use('/products', product);



module.exports = app