const express = require('express');
const Estanque = require('../models/estanque')
const { verificaToken, verficaAdminRole } = require('../middlewares/autenticacion');

const app = express();

app.get('/estanque', verificaToken, function(req, res) {
    Estanque.find({})
        .sort('nombre')
        .populate('usuario', 'nombre email')
        .populate('estanque', 'nombre tamanio')
        .exec((err, estanques) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            Estanque.count({}, (err, conteo) => {

                res.json({
                    ok: true,
                    estanques,
                    conteo
                })
            })
        });
});


app.get('/estanqueByGranja/:id', verificaToken, function(req, res) {
    let id = req.params.id;
    Estanque.find({ "granja": id })
        .sort('nombre')
        .populate('granja', 'nombre ubicacion')
        .exec((err, estanques) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            total = 0;
            estanques.map((estanque) => {
                total += estanque.tamanio;
            });
            Estanque.count({}, (err, conteo) => {

                res.json({
                    ok: true,
                    estanques,
                    conteo,
                    tamanioGranja: total
                })
            })
        });
});

//Mostrar estanque por id
app.get('/estanque/:id', verificaToken, function(req, res) {

    let id = req.params.id;
    Estanque.findById(id, (err, estanqueDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!estanqueDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El ID no es Correcto'
                }
            });
        }
        res.json({
            ok: true,
            estanque: estanqueDB
        })
    });
});

app.post('/estanque', verificaToken, function(req, res) {
    let body = req.body;

    let estanque = new Estanque({
        nombre: body.nombre,
        tamanio: body.tamanio,
        estanque: body.estanque,
        granja: body.granja,
        usuario: req.usuario._id
    });

    estanque.save((err, estanqueDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!estanqueDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            estanque: estanqueDB
        })
    });
});

app.put('/estanque/:id', verificaToken, function(req, res) {

    let id = req.params.id;

    let body = req.body;

    let descEstanque = {
        nombre: body.nombre,
        tamanio: body.tamanio,
    };

    Estanque.findByIdAndUpdate(id, descEstanque, { new: true, runValidators: true }, (err, estanqueDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!estanqueDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({ ok: true, estanque: estanqueDB });
    })
});


app.delete('/estanque/:id', verificaToken, function(req, res) {
    let id = req.params.id;

    Estanque.findByIdAndRemove(id, (err, estanqueDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!estanqueDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El id no existe'
                }
            });
        }

        res.json({
            ok: true,
            message: 'Estanque borrada'
        })
    });
});

module.exports = app;