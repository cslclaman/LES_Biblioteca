var Pessoa=require('../model/pessoa.model');
var Socio=require('../model/socio.model'); 
var Funcionario=require('../model/funcionario.model');

var express=require('express');
var mongoose=require('mongoose');

var router=express.Router();

router.route('/socios')

    .get(function(req,res){
        Pessoa.find(function(err,pessoas){
            if(err)
                res.send(err);
            res.json(pessoas);
        });
    })

    .post(function(req,res){
        var pessoa=new Pessoa(req.body);
        pessoa._id = new mongoose.Types.ObjectId();
        pessoa.save(function(err){
            if(err)
                res.send(err);

            var socio = new Socio(req.body);
            socio.pessoa = pessoa._id;

            socio.save(function(err){
                if(err){
                    Pessoa.remove({_id:pessoa._id},function(err2){});
                    res.send(err+err2);
                }

                res.send({message:'Sócio cadastrado'});
            });
        });
    });

router.route('/s')
    .get(function(req,res){
        Socio.find(function(err,socios){
            if(err)
                res.send(err);
            res.json(socios);
        });
    });

module.exports=router;