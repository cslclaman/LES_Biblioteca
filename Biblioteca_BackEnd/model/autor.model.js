var mongoose=require('mongoose');
var Schema=mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

var autorSchema=new Schema({

    _idAutor: Number,
    nome : String,
    sobrenome: String
    
});

autorSchema.plugin(AutoIncrement, {inc_field: '_idAutor'});

module.exports=mongoose.model('Autor',autorSchema);