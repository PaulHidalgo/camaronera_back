const express = require('express');
const app = express();
const { verificaToken, verficaAdminRole } = require('../middlewares/autenticacion');

const Granja = require('../models/granja')

//Mostrar todas las granjas
app.get('/granja', verificaToken, function(req, res) {

    Granja.find({})
        .sort('nombre')
        .populate('usuario', 'nombre email')
        .exec((err, granjas) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            Granja.count({}, (err, conteo) => {

                res.json({
                    ok: true,
                    granjas,
                    conteo
                })
            })
        });
});

//Mostrar granja por id
app.get('/granja/:id', verificaToken, function(req, res) {

    let id = req.params.id;
    Granja.findById(id, (err, granjaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!granjaDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El ID no es Correcto'
                }
            });
        }
        res.json({
            ok: true,
            granja: granjaDB
        })
    });
});

// Crear Granjas
app.post('/granja', verificaToken, function(req, res) {
    let body = req.body;

    let granja = new Granja({
        nombre: body.nombre,
        ubicacion: body.ubicacion,
        usuario: req.usuario._id
    });

    granja.save((err, granjaDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!granjaDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            granja: granjaDB
        })
    });

});

// Actualizar Granjas
app.put('/granja/:id', verificaToken, function(req, res) {
    let id = req.params.id;

    let body = req.body;

    let descGranja = {
        nombre: body.nombre,
        ubicacion: body.ubicacion
    };

    Granja.findByIdAndUpdate(id, descGranja, { new: true, runValidators: true }, (err, granjaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!granjaDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({ ok: true, granja: granjaDB });
    })
});

app.delete('/granja/:id', verificaToken, function(req, res) {
    let id = req.params.id;

    Granja.findByIdAndRemove(id, (err, granjaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!granjaDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El id no existe'
                }
            });
        }

        res.json({
            ok: true,
            message: 'Granja borrada'
        })
    });
});

module.exports = app;