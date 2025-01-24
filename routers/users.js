const express = require('express');
const User = require('../models/user');
const UsersValidations = require('./users.validations'); 
const router = express.Router();

router.post('/register', async (req, res) => {
    const datos_usuario = req.body;
    const validador = new UsersValidations();
    
    const resultadoValidacion = validador.validateRegister(datos_usuario);
    if(resultadoValidacion.error) {
        return res.status(400).send(resultadoValidacion.error);
    }
    
    //Buscar duplicados
    const existe = await User.findOne({username: datos_usuario.username});
    if(existe) {
        return res.status(409).send({
            error: `El usuario ${datos_usuario.username} ya existe`
        });
    }

    try {
        datos_usuario.enabled = false;
        await User.create(datos_usuario);
    }
    catch(error) {
        return res.status(400).send(error);
    }

    //Enviar el correo

    res.send({
        ok: true
    });
});

module.exports = router;