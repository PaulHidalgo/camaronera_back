const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let granjaSchema = new Schema({
    nombre: {
        type: String,
        required: [true, "El nombre es necesario"]
    },
    ubicacion: {
        type: String
    },
    estado: {
        type: Boolean,
        default: true
    },
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' }
});

module.exports = mongoose.model('Granja', granjaSchema);