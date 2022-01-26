const { type } = require('express/lib/response');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EquipaSchema = new Schema ({

    nome: {
        type: String,
        required: true
    },

    contacto: {
        type: String,
        required: true
    },
    
    projetos: [
        
    ],
});

module.exports = mongoose.model('Equipas', EquipaSchema);