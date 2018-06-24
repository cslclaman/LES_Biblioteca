var Pessoa=require('../model/pessoa.model');

var express=require('express');
var mongoose=require('mongoose');

var router=express.Router();

router.route('/socios')

    .get(function(req,res){

        var options;
        if (req.query.tipo == null){
            options = {};
        } else {
            var tipo = req.query.tipo.toString().toLowerCase();
            options = {tipoSocio: tipo};
        }

        Pessoa.find(options, function(err,pessoas){
            if(err)
                res.send(err);
            res.json(pessoas);
        });
    })

    .post(function(req,res){
        var pessoa = new Pessoa(req.body);
        pessoa._id = new mongoose.Types.ObjectId();
        pessoa.permissoes = "R";

        Pessoa.findOne({cpf: pessoa.cpf}, function(err,outro){
            if (err)
                res.send(err);
            else {
                if (outro != null){
                    res.send({message: "Erro: sócio já existe com CPF informado"});
                } else {
                    pessoa.save(function(err){
                        if(err)
                            res.send(err);
                            
                        res.send({message:'Sócio cadastrado'});
                    });
                }
            }
        });
    });

router.route('/socio/:id')

    .get(function(req,res){ 
        Pessoa.findOne({ _idPessoa:req.params.id }, function(err, pessoa) {
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
        Pessoa.find({tipoSocio: "funcionario"}, function(err,pessoas){
            if(err)
                res.send(err);
            res.json(pessoas);
        });
    })

    .post(function(req,res){
        var pessoa = new Pessoa(req.body);
        pessoa._id = new mongoose.Types.ObjectId();
        pessoa.tipoSocio = "funcionario";
        pessoa.permissoes = "ER";

        switch (pessoa.cargo){
            case "bibliotecario-chefe":
                pessoa.permissoes += "FLS";
                break;
            case "arquivista":
                pessoa.permissoes += "L";
                break;
            case "recepcionista":
                pessoa.permissoes += "S";
                break;
        }
        
        Pessoa.findOne({cpf: pessoa.cpf}, function(err,outro){
            if (err)
                res.send(err);
            else {
                if (outro != null){
                    res.send({message: "Erro: funcionário já existe com CPF informado"});
                } else {
                    pessoa.save(function(err){
                        if(err)
                            res.send(err);
                            
                        res.send({message:'Funcionario cadastrado'});
                    });
                }
            }
        });
    });

router.route('/funcionario/:id')

    .get(function(req,res){ 
        Pessoa.findOne({ _idPessoa:req.params.id, tipoSocio: "funcionario"},
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
                    res.json({status: "Erro", message: 'Nome de usuário ou senha inválidos'});
                else 
                    res.json({status: "OK", usuario: 
                    {
                        login: pessoa.login,
                        nome: pessoa.nome,
                        permissoes: pessoa.permissoes
                    }
                });
            }
            
        })
    });

module.exports=router;