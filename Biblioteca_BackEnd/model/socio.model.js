var mongoose=require('mongoose');
var Schema=mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

var socioSchema=new Schema({

    pessoa: { type: mongoose.Schema.Types.ObjectId, ref: 'Pessoa', required: true },
    _idSocio: Number,
    tipo: { type:String, required: true }

});

socioSchema.plugin(AutoIncrement, {inc_field: '_idSocio'});

module.exports=mongoose.model('Socio',socioSchema);