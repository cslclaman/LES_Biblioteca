var Reserva=require('../model/reserva.model');
var express=require('express');
var mongoose=require('mongoose');   
var router=express.Router();

router.route('/reservas')

    .get(function(req,res){
        Reserva.find(function(err,reservas){
            if(err)
                res.send(err);
            res.json(reservas);
        });
    })

    .post(function(req,res){
        var reserva = new Reserva(req.body);

        reserva._id = new mongoose.Types.ObjectId();
        if (reserva.dataReserva == null)
            reserva.dataReserva = new Date();
        reserva.ativa = true;

        reserva.save(function(err){
            if(err)
                res.send(err);
            res.send({message:'Reserva cadastrada'});
        });
    });

router.route('/reserva/:id')

    .get(function(req,res){ 
        Reserva.findOne({_idReserva:req.params.id},
            function(err, reserva) {
            if(err)
                res.send(err);
            res.json(reserva);
        });
    })

    .put(function(req,res){
        Reserva.findOne({_idReserva:req.params.id},function(err,reserva){
            if(err)
                res.send(err);

            for(prop in req.body){
                reserva[prop]=req.body[prop];
            }
            reserva.save(function(err) {
                if (err)
                    res.send(err);
                res.json({ message: 'Reserva atualizada'});
            });

        });
    })

    .delete(function(req,res){
        /* Em vez de excluir, essa função pode apenas deixar a reserva inativa.
        
        Reserva.findOne({_idReserva:req.params.id},function(err,reserva){
            if(err)
                res.send(err);

            reserva.ativa=false;

            reserva.save(function(err) {
                if (err)
                    res.send(err);
                res.json({ message: 'Reserva desativada'});
            });

        });
        */
        Reserva.remove({_idReserva: req.params.id}, function(err, reserva) {
            if (err)
                res.send(err);

            res.json({ message: 'Reserva removida'});
        });
    });

module.exports=router;