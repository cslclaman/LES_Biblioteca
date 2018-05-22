var mongoose=require('mongoose');
var Schema=mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

var funcionarioSchema=new Schema({

    _idFuncionario: Number,
    cargo: { type: String, required: true }

});

funcionarioSchema.plugin(AutoIncrement, {inc_field: '_idFuncionario'});

module.exports=mongoose.model('Funcionario',funcionarioSchema);