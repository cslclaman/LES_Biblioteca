
var Livro=require('../model/livro.model');

var express=require('express');

var router=express.Router();

router.route('/livros')
    .get(function(req,res){
        var findParam;
        var status = req.query.status == null? '' : req.query.status.toString().toLowerCase();
        if (status == 'any' || status == 'all'){
            findParam = {};
        } else {
            if (status == 'inativo'){
                findParam = {ativo:false};
            } else{
                findParam = {ativo:true};
            }
        }

        Livro.find(findParam, function(err,livros){
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
            res.send({message:'Livro cadastrado'});
        });
    });

router.route('/livro/:id')
    .get(function(req,res){ 
        Livro.findOne({_idLivro:req.params.id},
            function(err, livro) {
            if(err)
                res.send(err);
            res.json(livro);
        });
    })

    .put(function(req,res){
        Livro.findOne({_idLivro:req.params.id},function(err,livro){
            if(err)
                res.send(err);

            for(prop in req.body){
                livro[prop]=req.body[prop];
            }
            livro.save(function(err) {
                if (err)
                    res.send(err);
                res.json({ message: 'Livro atualizado' });
            });

        });
    })

    .delete(function(req,res){
        Livro.findOne({_idLivro:req.params.id},function(err,livro){
            if(err)
                res.send(err);
        
            livro.ativo=false;
            
            livro.save(function(err) {
                if (err)
                    res.send(err);
                res.json({ message: 'Livro removido' });
            });
        });
    });

module.exports=router;