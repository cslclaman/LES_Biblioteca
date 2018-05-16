
var Livro=require('../model/livro.model');
var Autor=require('../model/autor.model');

var express=require('express');

var router=express.Router();

router.route('/autor')
    .post(function(req,res){
        var autor=new Autor(req.body);
        autor.save(function(err){
            if(err)
                res.send(err);
            res.send({message:'Autor \"'+ autor.titulo +'\" Cadastrado'});
        });
    })

    .delete(function(req,res){
        Autor.remove({
            _id: req.params.id
        }, function(err, texto) {
            if (err)
                res.send(err);
            res.json({ message: 'Deletado OK' });
        });
    });

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

router.route('/livro:id')
    .get(function(req,res){ 
        Livro.findOne({_id:req.params.id},function(err, livro) {
            if(err)
                res.send(err);
            res.json(livro);
        });
    })

    .put(function(req,res){
        Livro.findOne({_id:req.params.id},function(err,livro){
            if(err)
                res.send(err);

            for(prop in req.body){
                    livro[prop]=req.body[prop];
            }
            livro.save(function(err) {
                if (err)
                    res.send(err);
                res.json({ message: 'Livro atualizado!' });
            });

        });
    })

    .delete(function(req,res){
        Livro.findOne({_id:req.params.id},function(err,livro){
            if(err)
                res.send(err);

            livro[ativo]=false;
            livro.save(function(err) {
                if (err)
                    res.send(err);
                res.json({ message: 'Livro removido' });
            });

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
