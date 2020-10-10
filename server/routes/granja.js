const express = require('express');

const app = express();

app.get('/granja', function(req, res) {
    res.json('Get granja')
});

app.post('/granja', function(req, res) {
    let body = req.body;

    res.json({ granja: body })
});

app.put('/granja/:id', function(req, res) {
    let id = req.params.id;


    res.json({ id })
});

app.delete('/granja', function(req, res) {
    res.json('Delete granja')
});

module.exports = app;