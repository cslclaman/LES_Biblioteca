var express = require('express');
var bodyParser = require('body-parser');
var dateFormat = require('dateformat');

var livros = require('./controller/livro.controller');
var autores = require('./controller/autor.controller');
var pessoas = require('./controller/pessoa.controller');
var emprestimos = require('./controller/emprestimo.controller');
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
app.use('/api', autores);
app.use('/api', pessoas);
app.use('/api', emprestimos);
//Outros controllers aqui

app.listen(3000, function(){
    console.log(dateFormat(new Date(), 'dd/mm/yyyy HH:MM:ss') + " - Server running at http://localhost:" + this.address().port);
});
