var mongoose=require('mongoose');
var Schema=mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

var emprestimoSchema = new Schema({

    _idEmprestimo: Number,
    socio: { type: mongoose.Schema.Types.ObjectId, required:true },
    livro: { type: mongoose.Schema.Types.ObjectId, required:true },
    status: {type:String, required: true},
    dataReserva: { type: Date, required: false },
    dataEmprestimo: [
        { type: Date }
    ],
    dataDevolucaoPrevista: { type: Date, required: false},
    dataDevolucao: { type: Date, required: false},
        
});

reservaSchema.plugin(AutoIncrement, {inc_field: '_idEmprestimo'});

module.exports=mongoose.model('Emprestimo',emprestimoSchema);