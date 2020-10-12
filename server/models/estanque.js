const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let estanqueSchema = new Schema({
    nombre: {
        type: String,
        required: [true, "El nombre es necesario"]
    },
    tamanio: {
        type: Number,
        required: [true, "El tamaño es necesario"]
    },
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' },
    granja: { type: Schema.Types.ObjectId, ref: 'Granja' }
});

module.exports = mongoose.model('estanque', estanqueSchema);