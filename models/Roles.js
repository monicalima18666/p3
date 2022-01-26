const { type } = require('express/lib/response');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoleSchema = new Schema ({

    descricao: {
        type: String,
        required: true
    },

    idUtilizador: {
        type: String,
        required: true
    },

    idEquipa: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Roles', RoleSchema);