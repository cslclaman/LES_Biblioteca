var Pessoa=require('../model/pessoa.model');

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
        var pessoa = new Pessoa(req.body);
        pessoa._id = new mongoose.Types.ObjectId();
        
        pessoa.save(function(err){
            if(err)
                res.send(err);
                
            res.send({message:'Sócio cadastrado'});
        });
    });

router.route('/socio/:id')

    .get(function(req,res){ 
        Pessoa.findOne({_idPessoa:req.params.id},
            function(err, pessoa) {
            if(err)
                res.send(err);
            res.json(pessoa);
        });
    })

    .put(function(req,res){
        Pessoa.findOne({_idPessoa:req.params.id},function(err,pessoa){
            if(err)
                res.send(err);

            for(prop in req.body){
                pessoa[prop]=req.body[prop];
            }
            pessoa.save(function(err) {
                if (err)
                    res.send(err);
                res.json({ message: 'Sócio atualizado'});
            });

        });
    })

    .delete(function(req,res){
        Pessoa.remove({_idPessoa: req.params.id}, function(err, pessoa) {
            if (err)
                res.send(err);

            res.json({ message: 'Sócio removido'});
        });
    });

router.route('/funcionarios')

    .get(function(req,res){
        Pessoa.find(function(err,pessoas){
            if(err)
                res.send(err);
            res.json(pessoas);
        });
    })

    .post(function(req,res){
        var pessoa = new Pessoa(req.body);
        pessoa._id = new mongoose.Types.ObjectId();
        
        pessoa.save(function(err){
            if(err)
                res.send(err);
                
            res.send({message:'Funcionario cadastrado'});
        });
    });

router.route('/funcionario/:id')

    .get(function(req,res){ 
        Pessoa.findOne({_idPessoa:req.params.id},
            function(err, pessoa) {
            if(err)
                res.send(err);
            res.json(pessoa);
        });
    })

    .put(function(req,res){
        Pessoa.findOne({_idPessoa:req.params.id},function(err,pessoa){
            if(err)
                res.send(err);

            for(prop in req.body){
                pessoa[prop]=req.body[prop];
            }
            pessoa.save(function(err) {
                if (err)
                    res.send(err);
                res.json({ message: 'Funcionário atualizado'});
            });

        });
    })

    .delete(function(req,res){
        Pessoa.remove({_idPessoa: req.params.id}, function(err, pessoa) {
            if (err)
                res.send(err);

            res.json({ message: 'Funcionário removido' });
        });
    });

router.route('/login')
    .post(function(req,res){
        Pessoa.findOne({login:req.body.login, senha:req.body.senha},function(err, pessoa){
            if (err)
                res.send(err);
            else {
                if (pessoa == null)
                    res.json({message: 'Nome de usuário ou senha inválidos'});
                else
                    res.json(pessoa);
            }
            
        })
    });

module.exports=router;