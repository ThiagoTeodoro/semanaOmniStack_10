const mongoose = require('mongoose');

// Tipo para Geolocalização retiardo da documentação do Mongoose
const PointSchema = new mongoose.Schema({
    type : {
        type: String,
        enum: ['Point'],
        required: true,
    },
    coordinates: {
        type: [Number],
        required: true,
    }
});

module.exports = PointSchema;