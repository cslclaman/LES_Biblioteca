var Emprestimo=require('../model/emprestimo.model');
var Pessoa = require('../model/pessoa.model');
var Bloqueio = require('../model/bloqueio.model');
var express=require('express');
var mongoose=require('mongoose');   
var router=express.Router();

router.route('/reservas')

    .get(function(req,res){
        Emprestimo.find({status:"reserva"}, function(err,reservas){
            if(err)
                res.send(err);
            res.json(reservas);
        });
    })

    .post(function(req,res){
        var reserva = new Emprestimo(req.body);

        reserva._id = new mongoose.Types.ObjectId();
        reserva.status = "reserva";
        reserva.ativo = true;
        if (reserva.dataReserva == null)
            reserva.dataReserva = new Date();

        reserva.save(function(err){
            if(err)
                res.send(err);
            res.send({message:'Reserva cadastrada'});
        });
    });

router.route('/reserva/:id')

    .get(function(req,res){ 
        Emprestimo.findOne({_idEmprestimo:req.params.id}, function(err, reserva) {
            if(err)
                res.send(err);
            res.json(reserva);
        });
    })

    .delete(function(req,res){
        Emprestimo.findOne({_idEmprestimo:req.params.id}, function(err, reserva) {
            if(err)
                res.send(err);

            reserva.ativo=false;

            reserva.save(function(err) {
                if (err)
                    res.send(err);
                res.json({ message: 'Reserva removida'});
            });
        });
    });

router.route('/emprestimos')

    .get(function(req,res){
        Emprestimo.find({status:"emprestimo"}, function(err,emprestimos){
            if(err)
                res.send(err);
            res.json(emprestimos);
        });
    })

    .post(function(req,res){
        var emprestimo = new Emprestimo(req.body);

        emprestimo._id = new mongoose.Types.ObjectId();
        emprestimo.status = "emprestimo";
        emprestimo.ativo = true;
        if (emprestimo.dataEmprestimo == null)
            emprestimo.dataEmprestimo = [new Date()];

        Pessoa.findOne({id:req.pessoa}, function(err, pessoa){
            if (err || pessoa == null){
                res.send(err);
            } else {
                var dataRetorno = new Date();
                if (pessoa.tipoSocio == "professor"){
                    dataRetorno.setDate(dataRetorno.getDate() + 14);
                } else {
                    dataRetorno.setDate(dataRetorno.getDate() + 7);
                }
                emprestimo.dataRetorno = dataRetorno;
                emprestimo.save(function(err){
                    if(err)
                        res.send(err);
                    res.send({message:'Emprestimo cadastrado'});
                });
            }
        });

        
    });

router.route('/emprestimo/:id')

    .get(function(req,res){ 
        Emprestimo.findOne({_idEmprestimo:req.params.id}, function(err, emprestimo) {
            if(err)
                res.send(err);
            res.json(emprestimo);
        });
    });

router.route('/renovacao/:id')

    .post(function(req,res){
        Emprestimo.findOne({_idEmprestimo:req.params.id},function(err,emprestimo){
            if(err)
                res.send(err);

            Emprestimo.find({status: "reserva", livro: emprestimo.livro, ativo: true}, function(err, reservas){
                if (err)
                    res.send(err);
                else {
                    if (reservas.length > 0){
                        res.json({message:"Livro com reserva não pode ser renovado"});
                    } else {
                        var dataAtual = new Date();
                        if (dataAtual > emprestimo.dataRetorno){
                            res.json({message:"Livro com entrega atrasada nao pode ser renovado"});
                        } else {
                            if (req.body.dataRenovacao == null)
                                emprestimo.dataEmprestimo.push(dataAtual);
                            else
                                emprestimo.dataEmprestimo.push(req.body.dataRenovacao);
                            
                            Pessoa.findOne({id:req.pessoa}, function(err, pessoa){
                                if (err || pessoa == null){
                                    res.send(err);
                                } else {
                                    var dataRetorno = new Date();
                                    if (pessoa.tipoSocio == "professor"){
                                        dataRetorno.setDate(dataRetorno.getDate() + 14);
                                    } else {
                                        dataRetorno.setDate(dataRetorno.getDate() + 7);
                                    }
                                    emprestimo.dataRetorno = dataRetorno;
                                    emprestimo.save(function(err){
                                        if(err)
                                            res.send(err);
                                        res.send({message:'Renovação concluída'});
                                    });
                                }
                            });
                        }
                    }
                }
            });
        });
    });

router.route('/devolucao/:id')

    .post(function(req,res){
        Emprestimo.findOne({_idEmprestimo:req.params.id},function(err,emprestimo){
            if(err)
                res.send(err);
            else {
                var dataAtual = new Date();
                var message, erro;

                emprestimo.status = "finalizado";
                emprestimo.ativo = false;
                emprestimo.dataDevolucao = dataAtual;

                if (dataAtual > emprestimo.dataRetorno){
                    var diasDif = dataAtual.getDate() - emprestimo.dataRetorno.getDate();
                    dataAtual.setDate(dataAtual.getDate() + diasDif);

                    var bloqueio = new Bloqueio();
                    bloqueio.socio = emprestimo.socio;
                    bloqueio.emprestimo = emprestimo._id;
                    dataInicioBloqueio = emprestimo.dataDevolucao;
                    dataFimBloqueio = dataAtual;

                    bloqueio.save(function(err){
                        if (err){
                            erro = err;
                        } else {
                            message = { message: 'Devolução efetuada com atraso - bloqueio de ' + diasDif + ' dias' };
                        }
                    });

                } else {
                    message = { message: 'Devolução efetuada'};
                }

                emprestimo.save(function(err) {
                    if (err)
                        erro = err;
                });
                
                if (erro)
                    res.send(erro);
                else
                    res.json(message);
            }
            
        });
    });

module.exports=router;