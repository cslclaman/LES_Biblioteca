var mongoose=require('mongoose');
var Schema=mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

var livroSchema=new Schema({

    _idLivro: Number,
    titulo: { type: String, required: true },
    editora: { type: String, required: true },
    edicao: { type: String, required: true },
    genero: { type: String, required: false },
    numPaginas: { type: Number, required: false },
    
});

livroSchema.plugin(AutoIncrement, {inc_field: '_idLivro'});

module.exports=mongoose.model('Livro',livroSchema);