var mongoose=require('mongoose');
var Schema=mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

var emprestimoSchema = new Schema({

    _idEmprestimo: Number,
    socio: { type: mongoose.Schema.Types.ObjectId, required:true, ref: 'Pessoa' },
    livro: { type: mongoose.Schema.Types.ObjectId, required:true, ref: 'Livro' },
    status: {type:String, required: true},
    ativo: {type:Boolean, required: true, default: true},
    dataReserva: { type: Date, required: false },
    dataEmprestimo: [
        { type: Date }
    ],
    dataRetorno: { type: Date, required: false},
    dataDevolucao: { type: Date, required: false},
        
});

emprestimoSchema.plugin(AutoIncrement, {inc_field: '_idEmprestimo'});

module.exports=mongoose.model('Emprestimo',emprestimoSchema);