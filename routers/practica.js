const express = require('express');
const Practica = require('../models/Practica');
const router = express.Router();

router.post('/new', async (req, res) => {
    const body = req.body;

    const existe = await Practica.findOne({where: {x: body.x}});
    if(existe) {
        return res.status(409).send({
            error: "Esa x ya existe xd"
        });
    }

    await Practica.create({
        x: body.x,
        y: body.y,
        z: body.z
    });

    res.send({
        ok: true
    });
});

router.delete('/:x', async (req, res) => {
    await Practica.destroy({where: {x: req.params.x}});
    res.send({
        ok: true
    });
});

router.get('/all', async (req, res) => {
    const practicas = await Practica.findAll();
    res.send(practicas);
});

module.exports = router;