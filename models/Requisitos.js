const { type } = require('express/lib/response');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RequisitoSchema = new Schema ({

    nome: {
        type: String,
        required: true
    },

    descricao: {
        type: String,
        required: true
    },

    codRequisito: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Requisitos', RequisitoSchema);