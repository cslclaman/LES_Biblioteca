var mongoose=require('mongoose');
var Schema=mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

var livroSchema=new Schema({

    _idLivro: Number,
    titulo: { type: String, required: true },
    autor: [ 
        { type: mongoose.Schema.Types.ObjectId, ref: 'Autor' }
    ],
    editora: { type: String, required: true },
    edicao: { type: Number, required: false },
    genero: { type: String, required: false },
    numPaginas: { type: Number, required: false },
    ano: { type: Number, required: false },
    status: {type: String, required: true, default: "disponivel" },
    localizacao: {type: String, required: false}
    
},{ usePushEach: true });

livroSchema.plugin(AutoIncrement, {inc_field: '_idLivro'});

module.exports=mongoose.model('Livro',livroSchema);