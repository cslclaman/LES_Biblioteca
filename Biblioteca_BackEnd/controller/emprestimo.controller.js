var Emprestimo=require('../model/emprestimo.model');
var Pessoa = require('../model/pessoa.model');
var Bloqueio = require('../model/bloqueio.model');
var express=require('express');
var mongoose=require('mongoose');   
var router=express.Router();
var dateformat = require('dateformat');

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
            else {
               Emprestimo.find({status:"reserva", livro: reserva.livro}, function(err,reservas){
                    if(err)
                        res.send(err);
                    else
                        res.send({message:'Reserva cadastrada - posição na fila: ' + reservas.length });
                });
            }
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

    .post(function(req,res){
        Emprestimo.findOne({_idEmprestimo:req.params.id}, function(err, reserva) {
            if(err || !reserva.ativo){
                if (err)
                    res.send(err);
                else
                    res.json({message: "Erro: Reserva inativa"});
            } else {
                Pessoa.findOne({_id:reserva.socio}, function(err, pessoa){
                    if (err || pessoa == null){
                        res.send(err);
                    } else {
                        Bloqueio.find({socio:pessoa._id,dataFimBloqueio: {$lt: new Date()}}, function(err,bloqueios){
                            if (err)
                                res.send(err);
                            else {
                                if (bloqueios.length > 0){
                                    res.json({message : "Erro: Sócio bloqueado"});
                                } else {
                                    reserva.status = "emprestimo";
                                    if (req.body.dataEmprestimo == null)
                                        reserva.dataEmprestimo = [new Date()];
                                    else
                                        reserva.dataEmprestimo = [req.body.dataEmprestimo];
        
                                    if (req.body.dataRetorno == null){
                                        var dataRetorno = new Date();
                                        if (pessoa.tipoSocio == "professor"){
                                            dataRetorno.setDate(dataRetorno.getDate() + 14);
                                        } else {
                                            dataRetorno.setDate(dataRetorno.getDate() + 7);
                                        }
                                        reserva.dataRetorno = dataRetorno;
                                    } else {
                                        reserva.dataRetorno = req.body.dataRetorno;
                                    }
                                    reserva.save(function(err){
                                        if(err)
                                            res.send(err);
                                        else
                                            res.send({message:'Emprestimo cadastrado - retorno em ' + dateformat(reserva.dataRetorno, 'dd/mm/yyyy')});
                                    });
                                }
                            }
                        });
                       
                    }
                });
            }
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
       
        Pessoa.findOne({_id:req.body.socio}, function(err, pessoa){
            if (err || pessoa == null){
                if (err)
                    res.send(err);
                else 
                    res.json({message: "Sócio não encontrado"});
            } else {
                Bloqueio.find({socio:pessoa._id,dataFimBloqueio: {$lt: new Date()}}, function(err,bloqueios){
                    if (err)
                        res.send(err);
                    else {
                        if (bloqueios.length > 0)
                            res.json({message : "Erro: Sócio bloqueado"});
                        else {
                            Emprestimo.find({ livro: req.body.livro, ativo: true }, function(err, emprestimos){
                                if (err)
                                    res.send(err);
                                else {
                                    if (emprestimos.length > 0)
                                        res.json({message: "Erro: Livro emprestado e não disponível"});
                                    else {
                                        emprestimo._id = new mongoose.Types.ObjectId();
                                        emprestimo.status = "emprestimo";
                                        emprestimo.ativo = true;
                                        if (req.body.dataEmprestimo == null)
                                            emprestimo.dataEmprestimo = [new Date()];
                                        else
                                            emprestimo.dataEmprestimo = [req.body.dataEmprestimo];

                                        if (req.body.dataRetorno == null){
                                            var dataRetorno = new Date();
                                            if (pessoa.tipoSocio == "professor"){
                                                dataRetorno.setDate(dataRetorno.getDate() + 14);
                                            } else {
                                                dataRetorno.setDate(dataRetorno.getDate() + 7);
                                            }
                                            emprestimo.dataRetorno = dataRetorno;
                                        } 

                                        emprestimo.save(function(err){
                                            if(err)
                                                res.send(err);
                                            else 
                                                res.send({message:'Emprestimo cadastrado - retorno em ' + dateformat(emprestimo.dataRetorno, 'dd/mm/yyyy')});
                                        });
                                    }
                                }
                            });
                        }
                    }
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
                            var dataRenov;
                            if (req.body.dataRenovacao == null)
                                dataRenov = dataAtual;
                            else
                                dataRenov = new Date(req.body.dataRenovacao);
                            
                            emprestimo.dataEmprestimo.push(dataRenov);

                            Pessoa.findOne({id:req.pessoa}, function(err, pessoa){
                                if (err || pessoa == null){
                                    res.send(err);
                                } else {
                                    var dataRetorno = dataRenov;
                                    if (pessoa.tipoSocio == "professor"){
                                        dataRetorno.setDate(dataRetorno.getDate() + 14);
                                    } else {
                                        dataRetorno.setDate(dataRetorno.getDate() + 7);
                                    }
                                    emprestimo.dataRetorno = dataRetorno;
                                    emprestimo.save(function(err){
                                        if(err)
                                            res.send(err);
                                        else
                                            res.send({message:'Renovação efetuada - retorno em ' + dateformat(dataRetorno, 'dd/mm/yyyy')});
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
            if (err || emprestimo == null){
                if (err)
                    res.send(err);
                else
                    res.json({message: "Erro: emprestimo ID " + req.params.id + " não encontrado"});
            } else {
                var dataAtual = new Date();

                if (req.body.dataDevolucao == null)
                    emprestimo.dataDevolucao = dataAtual;
                else
                    emprestimo.dataDevolucao = new Date(req.body.dataDevolucao);

                emprestimo.ativo = false;

                emprestimo.save(function(err) {
                    if (err)
                        res.send(err);
                    else {
                        var entregue = false;

                        if (emprestimo.dataDevolucao > emprestimo.dataRetorno){
                            var diasDif = emprestimo.dataDevolucao.getDate() - emprestimo.dataRetorno.getDate();
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
                                    res.json({ message: 'Devolução efetuada com atraso - bloqueio de ' + diasDif + ' dias' });
                                    entregue = true;
                                }
                            });
                        } else {
                            res.json({ message: 'Devolução efetuada no prazo'});
                            entregue = true;
                        }

                        if (entregue){
                            Emprestimo.find({livro: emprestimo.livro, status:"reserva", ativo:true}, {}, {sort: {dataReserva: -1}}, function(err,reservas){
                                if (err) console.log(err);
                                else {
                                    if (reservas.length > 0){
                                        var i = 0;
                                        while (i < reservas.length){
                                            console.log(dateformat(reservas[i].dataReserva,'dd/mm/yyyy'));
                                        }
                                    }
                                }
                            })
                        }
                    }
                });
            }
        });
    });

module.exports=router;