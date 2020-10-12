const express = require('express');

const app = express();

app.use(require('./usuario'));
app.use(require('./granja'));
app.use(require('./login'));
app.use(require('./estanque'));

module.exports = app;