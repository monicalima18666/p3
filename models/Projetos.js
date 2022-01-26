const { type } = require('express/lib/response');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjetoSchema = new Schema ({

    nome: {
        type: String,
        required: true
    },

    tipoProjeto: {
        type: String,
        required: true
    },
    
    descricao: {
        type: String,
        required: true
    },

    budjet: {
        type: Number,
        required: true
    },
});

module.exports = mongoose.model('Projetos', ProjetoSchema);