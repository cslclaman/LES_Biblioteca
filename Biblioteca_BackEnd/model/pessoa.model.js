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
    tipoSocio: { type: String, required: true },
    cargo: { type: String, required: false},
    permissoes: { type: String, required: true}
    
},{ usePushEach: true });

pessoaSchema.plugin(AutoIncrement, {inc_field: '_idPessoa'});

module.exports=mongoose.model('Pessoa',pessoaSchema);