var mongoose=require('mongoose');
var Schema=mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

var bloqueioSchema=new Schema({

    _idBloqueio: Number,
    socio: { type: mongoose.Schema.Types.ObjectId, ref: 'Pessoa', required: true },
    emprestimo: { type: mongoose.Schema.Types.ObjectId, ref: 'Emprestimo', required: true },
    dataInicioBloqueio: {type: Date, required: true},
    dataFimBloqueio: {type: Date, required: true},

},{ usePushEach: true });

bloqueioSchema.plugin(AutoIncrement, {inc_field: '_idBloqueio'});

module.exports=mongoose.model('Bloqueio',bloqueioSchema);