const express = require('express');
const User = require('../models/user');
const UsersValidations = require('./users.validations'); 
const GMail = require('../utils/gmail');
const Tokens = require('../utils/tokens');
const Token = require('../models/token');
const router = express.Router();

router.post('/register', async (req, res) => {

    const datos_usuario = req.body;
    const validador = new UsersValidations();
    
    const resultadoValidacion = validador.validateRegister(datos_usuario);
    if(resultadoValidacion.error) {
        return res.status(400).send(resultadoValidacion.error);
    }
    
    //Buscar duplicados
    const existe = await User.findOne({ where: {username: datos_usuario.username} });
    if(existe) {
        return res.status(409).send({
            error: `El usuario ${datos_usuario.username} ya existe`
        });
    }

    //Generar enlaces con tokens
    token = new Tokens();
    enlace_activar = "http://localhost:2025/users/activate/" + token.Token;
    enlace_cancelar = "http://localhost:2025/users/deny/" + token.Token;
        
    try {
        datos_usuario.enabled = false;
        datos_usuario.token = token.Token;
        await User.create(datos_usuario);
    }
    catch(error) {
        return res.status(400).send(error);
    }

    //Enviar el correo
    correo = new GMail();
    correo.To = datos_usuario.email;
    correo.Subject = "Bienvenido a nuestra libreria digital :)";
    correo.Message = 
        `Hola, ${datos_usuario.name} ${datos_usuario.lastName}\n\n` +
        `Gracias por registrarte. Para activar tu cuenta, debes hacer click en este enlace: ${enlace_activar}\n\n` +
        `Si tu no has hecho este registro, da click aqui para cancelar este registro: ${enlace_cancelar}`; 

        try {
            await correo.Send();
        } catch(error) {
            console.log(error);
        }

    res.send({
        ok: true
    });
});

router.get('/all', async (req, res) => {
    const users = User.findAll();
    res.send(users);
    
});

router.get('/redirect', async (req, res) => {
    res.redirect("https://www.google.com");
})

router.get('/activate/:token', async (req, res) => {
    const token = req.params.token

    //Buscar el token en la BDD
    const token_encontrado = await Token.findOne({ where: {token: token }});
    if(!token_encontrado) {
        return res.status(404).send({
            error: "El token indicado no existe. Por favor verifique que sea correcto"
        });
    }

    if(token_encontrado.used) {
        return res.status(409).send({
            error: "El token ya ha sido usado"
        });
    }

    if(token_encontrado.expiration < new Date()) {
        return res.status(409).send({
            error: "El token ya ha ha expirado"
        });
    }

    const user = await User.findOne({ where: {token: token}});
    if(user) {
        user.enabled = true;
        await user.save();
    }

    token_encontrado.used = true;
    await token_encontrado.save();

    const FileStream = require('fs');
    const archivo = FileStream.readFileSync(process.cwd() + "/pages/users/activated.html");
    res.send(archivo.toString());
});

router.get('/deny/:token', async (req, res) => {
    const token = req.params.token

    //Buscar el token en la BDD
    const token_encontrado = await Token.findOne({ where: {token: token}});
    if(token_encontrado) {
        token_encontrado.used = true;
        await token_encontrado.save();
    }

    res.send({
        ok: true
    });
});

module.exports = router;