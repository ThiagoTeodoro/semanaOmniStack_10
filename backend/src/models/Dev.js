const mongoose = require('mongoose');
const PointSchema = require('./utils/PointSchema');

// Representação da Collection no MongoDB.
const DevSchema = new mongoose.Schema({
    name: String,
    github_username: String,
    bio: String,
    avatar_url: String,
    techs: [String],
    location: {
        type: PointSchema,
        index: '2dsphere', // Esse indice é para acelerar as buscas, no caso do latitude e logitude o Mongo/Mongoose fala para usar esse tipo.
    } 
})

// A exportação aqui o primeiro parâmetro 'Dev' é nome lá no Mongo
// da Collection que vai ser gerada, o DevSchema é a representação 
// do modelo desse Schema que criamos ali em cima.
module.exports = mongoose.model('Dev', DevSchema)