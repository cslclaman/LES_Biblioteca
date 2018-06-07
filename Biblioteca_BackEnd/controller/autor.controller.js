var Autor=require('../model/autor.model');

var express=require('express');

var router=express.Router();

router.route('/autores')
    .get(function(req,res){
        Autor.find(function(err,autores){
            if(err)
                res.send(err);
            res.json(autores);
        });
    })

    .post(function(req,res){
        var autor=new Autor(req.body);
        autor.save(function(err){
            if(err)
                res.send(err);
            res.json({message:'Autor cadastrado'});
        });
    });

router.route('/autor/:id')

    .put(function(req,res){
        Autor.findOne({_idAutor:req.params.id},function(err,autor){
            if(err)
                res.send(err);

            for(prop in req.body){
                autor[prop]=req.body[prop];
            }
            autor.save(function(err) {
                if (err)
                    res.send(err);
                res.json({ message: 'Autor atualizado'});
            });

        })
    })

    .delete(function(req,res){
        Autor.remove({_idAutor: req.params.id}, function(err, autor) {
            if (err)
                res.send(err);

            res.json({ message: 'Autor removido'});
        });
    });

module.exports=router;