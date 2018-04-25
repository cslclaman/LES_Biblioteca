var express = require('express');
var bodyParser = require('body-parser');

var livros = require('./controller/livro.controller');
//outros controllers

var mongoose = require('mongoose');

require('node-offline-localhost').always();

var app = express();

var cors = require('cors');
app.use(cors());

var dbName='LES_Biblioteca';
var connectionString='mongodb://localhost:27017/'+ dbName;

mongoose.connect(connectionString);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', livros);
//Outros controllers aqui

app.listen(3000, function(){
    console.log("Server listening on port: ", this.address().port);
});
