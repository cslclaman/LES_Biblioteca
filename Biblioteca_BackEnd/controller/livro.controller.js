
var Livro=require('../model/livro.model');
var express=require('express');

var router=express.Router();

router.route('/livros')
    .get(function(req,res){
        Livro.find(function(err,livros){
            if(err)
                res.send(err);
            res.json(livros);
       });
    })

    .post(function(req,res){
        var livro=new Livro(req.body);
        livro.save(function(err){
            if(err)
                res.send(err);
            res.send({message:'Livro '+ livro.titulo +' Cadastrado'});
        });
    });

module.exports=router;

/*
 exports.IndexServerRoute = function(req, res) {
   res.render('index-server-view');
 };

exports.partials = function (req, res) {
  var name = req.params.name;
  res.render('partials/' + name);
};
*/
