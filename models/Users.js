const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema ({

    nome: {
        type: String,
        required: true
    },

    contacto: {
        type: String,
        required: true
    },
    
    username: {
        type: String,
        unique: true,
        required: true,
        lowercase:true
    },

    password: {
        type: String,
        required: true,
        select: true
    },

    tipo: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Users', UserSchema);