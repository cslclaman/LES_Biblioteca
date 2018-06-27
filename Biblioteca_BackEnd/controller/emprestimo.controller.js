var Emprestimo=require('../model/emprestimo.model');
var Pessoa = require('../model/pessoa.model');
var Bloqueio = require('../model/bloqueio.model');
var Livro = require('../model/livro.model');
var express=require('express');
var mongoose=require('mongoose');   
var router=express.Router();
var dateformat = require('dateformat');

function numReservas(idLivro){
    Emprestimo.find({status:"reserva", livro:idLivro, ativo:true}, function(err,reservas){
        if(err){
            console.log(err);
            return -1;
        } else{
            return reservas.length;
        }
    });
}

function numEmprestimos(idLivro){
    Emprestimo.find({status:"emprestimo", livro:idLivro}, function(err,reservas){
        if(err){
            console.log(err);
            return -1;
        } else{
            return reservas.length;
        }
    });
}

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
                Livro.findOne({_id: reserva.livro}, function (err, livro){
                    if (err)
                        res.send(err);
                    else {
                        livro.status = "reservado";
                        livro.save(function(err){
                            if (err)
                                res.send(err);
                            else
                                res.send({message:'Reserva cadastrada - posição na fila: ' + numReservas(livro._id) });
                        });
                    }
                });
            }
        });
    });

router.route('/reserva/:id')

    .get(function(req,res){ 
        Emprestimo.findOne({_idEmprestimo:req.params.id}, function(err, reserva) {
            if(err)
                res.send(err);
            else
                res.json(reserva);
        });
    })

    .post(function(req,res){
        Emprestimo.findOne({_idEmprestimo:req.params.id}, function(err, reserva) {
            if(err || reserva == null || !reserva.ativo){
                if (err)
                    res.send(err);
                else
                    if (reserva == null)
                        res.json({message: "Erro: Reserva com ID " + req.params.id + " não encontrada"});
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
                                        else {
                                            Livro.findOne({_id: reserva.livro}, function (err, livro){
                                                if (err)
                                                    res.send(err);
                                                else {
                                                    livro.status = "emprestado";
                                                    livro.save(function(err){
                                                    if (err)
                                                        res.send(err);
                                                    else
                                                        res.send({message:'Emprestimo cadastrado - retorno em ' + dateformat(reserva.dataRetorno, 'dd/mm/yyyy')});
                                                    });
                                                }
                                            });
                                            
                                        }                                            
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
            if (err || reserva == null){
                if (err)
                    res.send(err);
                else
                    res.json({message: "Erro: Reserva ID " + req.params.id + " não encontrada"});
            } else {

                reserva.ativo=false;

                reserva.save(function(err) {
                    if (err)
                        res.send(err);
                    else {
                        Livro.findOne({_id: reserva.livro}, function (err, livro){
                            if (err)
                                res.send(err);
                            else {
                                var nr = numReservas(livro._id);
                                if (nr < 0)
                                    res.json({message:"Erro: reservas não encontradas para livro"});
                                else {
                                    if (nr == 0)
                                        livro.status = "disponivel";
                                    else
                                        livro.status = "reservado";

                                    livro.save(function(err){
                                        if (err)
                                            res.send(err);
                                        else
                                            res.json({ message: 'Reserva removida'});
                                    });
                                }
                            }
                        });
                    }
                });
            }
        });
    });

router.route('/emprestimos')

    .get(function(req,res){
        Emprestimo.find({status:"emprestimo"}, function(err,emprestimos){
            if(err)
                res.send(err);
            else
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
                            var ne = numEmprestimos(emprestimo.livro);
                            if (ne < 0)
                                res.json({message:"Erro: reservas não encontradas para livro"}); 
                            else{
                                if (ne == 0)
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
                                        else{
                                            Livro.findOne({_id: reserva.livro}, function (err, livro){
                                                if (err || livro == null){
                                                    if (err)
                                                        res.send(err);
                                                    else
                                                        res.json({message:"Livro não encontrado"});
                                                }

                                                    
                                                else {
                                                    livro.status = "emprestado";
                                                    livro.save(function(err){
                                                    if (err)
                                                        res.send(err);
                                                    else
                                                        res.send({message:'Emprestimo cadastrado - retorno em ' + dateformat(emprestimo.dataRetorno, 'dd/mm/yyyy')});
                                                    });
                                                }
                                            });
                                        } 
                                            
                                    });
                                }
                            }
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
            if(err || emprestimo == null){
                if (err)
                    res.send(err);
                else
                    res.json({message: "Empréstimo não encontrado com ID " + req.params.id });
            } else {
                var nr = numReservas(emprestimo.livro);
                if (nr < 0){
                    res.json({message:"Erro: reservas não encontradas para livro"}); 
                } else {
                    if (nr > 0)
                        res.json({message:"Livro com reserva não pode ser renovado"});
                    else {
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
            }
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
                                    res.send(err);
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
                            Livro.findOne({livro: emprestimo.livro}, function(err, livro){
                                if (err || livro == null){
                                    if (err)
                                        console.log(err);
                                    else
                                        console.log("Livro NULL");
                                }
                                    
                                else {
                                    livro.status = "disponivel";
                                    Emprestimo.find({livro: emprestimo.livro, status:"reserva", ativo:true}, {}, {sort: {dataReserva: -1}}, function(err,reservas){
                                        if (err) {
                                            console.log(err);
                                        } else {
                                            if (reservas.length > 0){
                                                livro.status = "reservado";
                                                console.log("Livro disponível para sócio " + reservas[length-1].socio);
                                            } 
                                        }

                                        livro.save(function(err){
                                            if (err)
                                                console.log(err);
                                            else
                                                console.log("Livro ok");
                                        });
                                    })
                                    
                                }
                            });
                            
                        }
                    }
                });
            }
        });
    });

module.exports=router;