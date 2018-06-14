var Emprestimo=require('../model/emprestimo.model');
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

        emprestimo.save(function(err){
            if(err)
                res.send(err);
            res.send({message:'Emprestimo cadastrado'});
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

            Emprestimo.find({status: "reserva", ativo: true}, function(err, reservas){
                if (err)
                    res.send(err);
                else {
                    if (reservas.length > 0){
                        res.json({message:"Livro "});
                    }
                    var maxRenov = 3;
                    if (emprestimo.dataEmprestimo.length > maxRenov){
                        res.json({message:"Número de renovações máximo atingido"});
                    } else {
                        var DataRenovacao = req.body.dataRenovacao;
                        if (req.body.dataRenovacao == null)
                            emprestimo.dataEmprestimo.push(new Date());
                        else
                            emprestimo.dataEmprestimo.push(req.body.dataRenovacao);
                        
                        emprestimo.save(function(err) {
                            if (err)
                                res.send(err);
                            res.json({ message: 'Renovação concluída'});
                        });
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

            emprestimo.status = "finalizado";
            emprestimo.ativo = false;
            emprestimo.dataDevolucao = new Date();
            emprestimo.save(function(err) {
                if (err)
                    res.send(err);
                res.json({ message: 'Devolução efetuada'});
            });
        });
    });

module.exports=router;