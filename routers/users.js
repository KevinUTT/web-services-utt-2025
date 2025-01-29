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
    const axios = require('axios');
    const datos_correo = {
        from: "Servicio de registro <uttorreon2025@gmail.com>",
        to: `${datos_usuario.name} ${datos_usuario.lastName} <${datos_usuario.email}>`,
        subject: "Registro de usuario",
        date: (new Date()).toUTCString(),
        messageId: "<uttorreon2025@gmail.com>",
        message: `Hola ${datos_usuario.username} :) - ¡Tu registro ha sido exitoso!`
    };
    const formato_correo = 
`From: ${datos_correo.from} 
To: ${datos_correo.to} 
Subject: ${datos_correo.subject} 
Date: ${datos_correo.date} 
Message-ID: ${datos_correo.messageId}

${datos_correo.message}`;

    const API_KEY = "KEY";
    const TOKEN = "TOKEN";

    try {
        await axios.post('https://gmail.googleapis.com/gmail/v1/users/me/messages/send?key=' + API_KEY,{
            raw: Buffer.from(formato_correo).toString('base64')
        }, {
            headers: {
                Authorization: "Bearer " + TOKEN,
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        });
    } catch(error) {
        console.log(error);
    }

    res.send({
        ok: true
    });
});

module.exports = router;