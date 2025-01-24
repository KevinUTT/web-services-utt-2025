const express = require('express');
const Libro = require('./models/libro');
const app = express();
app.use(express.json());

const USUARIOS = {
    "Kevin": {
        "nombre": "Kevin",
        "apellidoPaterno": "Martin del Campo",
        "apellidoMaterno": "Fernández",
        "edad": 29,
        "genero": "Masculino"
    },
    "Pablo": {
        "nombre": "Juan Pablo",
        "apellidoPaterno": "Escobar",
        "apellidoMaterno": "Gaviria",
        "edad": 19,
        "genero": "Masculino"
    }
}

app.get('/users/:username', function(req, res) {
    const query = req.query;
    const path = req.params;

    const usuario = USUARIOS[path.username];

    if(!usuario) {
        res.status(404).send({
            error: `El usuario: ${path.username} no existe`
        });
        return;
    }

    if(Object.keys(query).length < 1) {
        res.send(usuario);
        return;
    }

    const copia = {};
    //filtrar
    if(query.nombre === "true") {
        copia.nombre = usuario.nombre;
    }

    if(query.apellidoPaterno === "true") {
        copia.apellidoPaterno = usuario.apellidoPaterno;
    }

    if(query.apellidoMaterno === "true") {
        copia.apellidoMaterno = usuario.apellidoMaterno;
    }

    if(query.edad === "true") {
        copia.edad = usuario.edad;
    }

    if(query.genero === "true") {
        copia.genero = usuario.genero;
    }

    res.json(copia);

});

app.post('/users/:username', function(req, res) {
    const query = req.query;
    const path = req.params;
    
    if(USUARIOS[path.username]) {
        res.status(409).send({
            error: `El usuario: ${path.username} ya existe`
        });
        return;
    }

    USUARIOS[path.username] = req.body;
    res.status(201).json({
        ok: true
    });
});

app.post('/libros/:ISBN', async function(req, res) {
    const isbn = req.params.ISBN;
    const datos = req.body;
    datos.ISBN = isbn;

    let result = await Libro.create(datos);
    let todos = await Libro.findAll();
    res.send(todos);
});

app.listen(2025, async function() {
    console.log("Server iniciado :D");
});