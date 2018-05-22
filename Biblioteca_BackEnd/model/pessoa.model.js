var mongoose=require('mongoose');
var Schema=mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

var pessoaSchema=new Schema({

    _idPessoa: Number,
    nome: { type: String, required: true },
    dataNascimento: { type: Date, required: true },
    cpf: { type: String, required: true },
    endereco: { type: String, required: false },
    telefone: { type: String, required: false },
    email: { type: String, required: false },
    login: { type: String, required: true },
    senha: { type: String, required: true },
    
    socio: { type: mongoose.Schema.Types.ObjectId, ref: 'Socio', required: false },
    funcionario: { type: mongoose.Schema.Types.ObjectId, ref: 'Funcionario', required: false } 
        
});

pessoaSchema.plugin(AutoIncrement, {inc_field: '_idPessoa'});

module.exports=mongoose.model('Pessoa',pessoaSchema);