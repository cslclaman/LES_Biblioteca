var mongoose=require('mongoose');
var Schema=mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

var reservaSchema = new Schema({

    _idReserva: Number,
    pessoa: { type: mongoose.Schema.Types.ObjectId, required:true },
    livro: { type: mongoose.Schema.Types.ObjectId, required:true },
    dataReserva: { type: Date, required: true },
    ativa: {type: Boolean}
    
});

reservaSchema.plugin(AutoIncrement, {inc_field: '_idPessoa'});

module.exports=mongoose.model('Reserva',reservaSchema);