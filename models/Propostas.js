const { type } = require('express/lib/response');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PropostaSchema = new Schema ({

    grauPrioridade: {
        type: String,
        required: true
    },

    data: {
        type: Date,
        required: true,
        default: Date.now
    },
});

module.exports = mongoose.model('Propostas', PropostaSchema);