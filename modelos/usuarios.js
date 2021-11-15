var mongoose = require('mongoose');
//Set up default mongoose connection
const userscheme = new mongoose.Schema({
    nombre : {
        type: String
    },
    correo : {
        type: String
    },
    password : {
        type: String
    }
})// Fin userScheme

module.exports = mongoose.model('usuarios', userscheme)