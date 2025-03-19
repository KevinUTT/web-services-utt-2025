const express = require('express');
const Libro = require('../models/libro');
const LibrosValidations = require('./libros.validations');
const router = express.Router();
const Axios = require('axios');
const DeepSeek = require('../utils/deepseek');
const Autor = require('../models/autor');
const Database = require('../utils/database');

router.post('/new', async (req, res) => {
    const libro_data = req.body;
    //validar los datos
    const validador = new LibrosValidations();
    const resultado_validacion = validador.validateNewLibro(libro_data);
    if(resultado_validacion.error) {
        return res.status(400).send(resultado_validacion.error);
    }

    //verificar duplicados
    const existe = await Libro.findOne({ where: {ISBN: libro_data.ISBN}});
    if(existe) {
        return res.status(409).send({
            error: `El libro con el ISBN ${libro_data.ISBN} ya existe`
        });
    }

    //intentar crear
    try {
        await Libro.create(libro_data);
    } catch(error) {
        return res.status(400).send(error);
    }

    res.send({
        ok: true
    });
});

router.post('/ai/new', async (req, res) => {
    const DS = await new DeepSeek();
    DS.Prompt = "Genera un JSON que genere el nombre completo de un autor de libros ficticio, donde tengas los campos: 'license' que es un valor alfanumérico super aleatorio de 12 caracteres sin espacios ni guiones, 'name' es un nombre de persona ficticio aleatorio, 'lastName' es un apellido de persona ficticio aleatorio, 'secondLastName' es un apellido de persona ficticio aleatorio, 'year' es un año super aleatorio no mayor al año actual y menor a 2006. Regresa solo el JSON sin notación MarkDown";
    const autor = await DS.SendRequest();
    let json_autor = JSON.parse(autor.replace("```json", "").replace("```", ""));
    const existeAutor = await Autor.findOne({
        where: {
            license: json_autor.license
        }
    });

    if(!existeAutor) {
        const new_autor = await Autor.create(json_autor);
    } else {
        json_autor = existeAutor;
    }


    DS.Prompt = "Genera un libro de texto, donde debes poner el contenido en un JSON; tu respuesta no debe incluir nada más que solo el JSON con los siguientes campos: 'ISBN' es un texto alfanumérico de entre 16 caracteres sin guiones ni espacios super aleatorio, con mayusculas y minúsculas; trata de hacer diferente cada vez, 'title' es el campo que contien el título de el libro ficticio, 'editorial' es una editorial ficticia para el libro, 'pages' el número de páginas, 'year' es un año real no mayor al actual, 'genre' es el género del libro ficticio, 'language' es el idioma del libro ficticio, 'format' puede ser entre PDF, DOC, TXT, FISICO o COPIA, 'sinopsis' es la sinopsis de tu libro ficticio, 'content' es el contenido del libro que debe ser un texto que coincida con las características anteriores";
    const libro = await DS.SendRequest();
    let json = JSON.parse(libro.replace("```json", "").replace("```", ""));
    
    json.autor_license = json_autor.license;
    const existeLibro = await Libro.findOne({
        where: {
            ISBN: json.ISBN
        }
    });

    if(!existeLibro) {
        const new_libro = await Libro.create(json);
    } else {
        json = existeLibro;
    }

    res.send(json);

});

router.get('/all', async (req, res) => {
    const headers = req.headers["user-agent"];
    let [libros, info] = await Database.getSequelize.query(
        "SELECT * FROM Libro INNER JOIN Autor ON Libro.autor_license = Autor.license"
    );
    res.send(libros || []);
});

module.exports = router;