const express = require('express');
const Libro = require('../models/libro');
const LibrosValidations = require('./libros.validations');
const router = express.Router();

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

router.get('/all', async (req, res) => {
    const libros = await Libro.findAll();
    res.send(libros);
});

module.exports = router;