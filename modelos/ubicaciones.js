
var mongoose= require("mongoose")

const inmobiliariaEsquema = mongoose.Schema({

zona:{
   type: String

},
barrio: {

    type: String
},

direccion: {
    type: String
}
})
module.exports= mongoose.model('ubicaciones', inmobiliariaEsquema)
