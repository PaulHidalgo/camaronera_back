require('./config/config');
const express = require('express');
const app = express();


var bodyParser = require('body-parser')
    // parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

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

app.listen(process.env.PORT, () => {
    console.log('Escuchando el puerto', process.env.PORT);
});