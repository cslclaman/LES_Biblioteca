var Bloqueio=require('../model/bloqueio.model');
var Pessoa=require('../model/pessoa.model');

var express=require('express');

var router=express.Router();

router.route('/bloqueios')
    .get(function(req,res){
        Bloqueio.find(function(err,bloqueios){
            if(err)
                res.send(err);
            res.json(bloqueios);
        });
    })

router.route('/bloqueio/:socio')

    .get(function(req,res){
        Socio.findOne({_idPessoa:req.params.socio},function(err,socio){
            if (err)
                res.send(err);
            else {
                Bloqueio.find({socio:socio._id, dataFimBloqueio: {$lt: new Date()} },function(err,bloqueios){
                    if (err)
                        res.send(err);
                    res.json(bloqueios);
                });
            }
        });
    });
    
module.exports=router;