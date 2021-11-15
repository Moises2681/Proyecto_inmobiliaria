require('./modelos/conexion') // Se establece conexion con servidor

// Creamos variables
const express = require('express') // Importar express
const { createReadStream } = require('fs') // Paquete para leer archivos
const bodyParser = require("body-parser") // Paquete para trabajar con Json
const HTML_CONTENT_TYPE = 'text/html'
const path = require("path") // variable para rutas
var modelo = require('./modelos/usuarios') // Incluye el esquema del modelo - conexion db.
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
    modelo.collection.insertOne(mod_usuario, function (err, res) {
        if (err) throw err
    }) // Fin insertOne

    res.send("datos creados")

}) // Fin post /upload





// Obtener respuesta del servidor
app.get('/', (req, res) => {

    // Metodo para incluir contenido html
    res.writeHead(200, { 'Content-Type': HTML_CONTENT_TYPE })

    //Se incluye plantilla html
    createReadStream('./index.html').pipe(res)
    
})//Fin app.get

//Abrir puerto del servidor
app.listen(9000, () => {

    console.log("Servidor escuchando por el puerto 9000")

})//Fin app.listen