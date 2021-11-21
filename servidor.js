require('./modelos/conexion') // Se establece conexion con servidor

// Creamos variables
const express = require('express') // Importar express
const { createReadStream } = require('fs') // Paquete para leer archivos
const bodyParser = require("body-parser") // Paquete para trabajar con Json
const HTML_CONTENT_TYPE = 'text/html'
const path = require("path") // variable para rutas
var modeloUsuario = require('./modelos/usuarios') // Incluye el esquema del modelo de usuarios- conexion db.
var modeloInmueble = require('./modelos/inmuebles') // Incluye el esquema del modelo de inmuebles - conexion db.
var modeloUbicacion = require('./modelos/ubicaciones') // Incluye el esquema del modelo de ubicaciones- conexion db.
/*  Las Colecciones en Atlas deben ir en plural.  */

// Instancia de express
const app = new express()

//Se define la ruta de la carpeta para archivos estáticos (jpg, css, js)
app.use(express.static('public'))
app.use(bodyParser.json());

/* 
Funcion para insertar datos en DB, todo lo que se envie a '/upload' será insertado.
*/

app.post("/insertarUsuario", (req, res) => {

    // Elemento Json que se va a insertar en la DB
    var mod_usuario = {
        nombre: req.body.nombre,
        correo: req.body.correo,
        password: req.body.password
    }

    // Metodo para insertar un registro en la DB
    modeloUsuario.collection.insertOne(mod_usuario, function (err, res) {
        if (err) throw err
    }) // Fin insertOne

    res.send("datos creados del usuario")

}) // Fin post /upload

//Codigo para probar una consulta de la coleccion ubicacion
modeloUbicacion.find({barrio:'Diamante'},(err, docs) =>{
    console.log(docs)
})
//Fin de la consulta

// Insertar dador del inmueble

app.post("/insertarInmueble", (req, res) => {

    // Elemento Json que se va a insertar en la DB
    modeloUbicacion.find({barrio:'Diamante'},(err, docs) =>{
    var mod_inmueble = {
        nombre: req.body.nombre,
        tipo: req.body.tipo,
        ubicacion: docs[0]._id
        }

    // Metodo para insertar un registro en la DB
    modeloInmueble.collection.insertOne(mod_inmueble, function (err, res) {
        if (err) throw err
    }) // Fin insertOne

    res.send("datos creados del inmueble")
})

}) // Fin post /upload

// Insertar dador de la ubicacion
app.post("/insertarUbicacion", (req, res) => {

    // Elemento Json que se va a insertar en la DB
    var mod_ubicacion = {
        zona: req.body.zona,
        barrio: req.body.barrio,
        direccion: req.body.direccion
    }

    // Metodo para insertar un registro en la DB
    modeloUbicacion.collection.insertOne(mod_ubicacion, function (err, res) {
        if (err) throw err
    }) // Fin insertOne

    res.send("datos creados del inmueble")

}) // Fin post /upload

// Obtener respuesta del servidor
app.get('/', (req, res) => {

    // Metodo para incluir contenido html
    res.writeHead(200, { 'Content-Type': HTML_CONTENT_TYPE })

    //Se incluye plantilla html
    createReadStream('./inmueble.html').pipe(res)
    
})//Fin app.get

//Abrir puerto del servidor
app.listen(9000, () => {

    console.log("Servidor escuchando por el puerto 9000")

})//Fin app.listen