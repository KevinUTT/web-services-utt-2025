const express = require('express');
const Autor = require('../models/autor');
const AutorsValidations = require('./autors.validations'); 
const router = express.Router();

router.post('/new', async (req, res)=> {
    const autor_data = req.body;
    //validar los datos
    const validador = new AutorsValidations();
    const resultado_validacion = validador.validateNewAutor(autor_data);
    if(resultado_validacion.error) {
        return res.status(400).send(resultado_validacion.error);
    }

    //verificar duplicados
    const existe = await Autor.findOne({ license: autor_data.license });
    if(existe) {
        return res.status(409).send({
            error: `El autor con la licencia ${autor_data.license} ya existe`
        });
    }

    //crear el autor
    try {
        await Autor.create(autor_data);
    } catch(error) {
        return res.status(400).send(error);
    }

    res.send({
        ok: true
    });
});

module.exports = router;