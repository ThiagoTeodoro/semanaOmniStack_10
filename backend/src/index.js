// Métodos HTTP : GET, POST, PUT, DELETE

// Tipos de Parâmetros

// Query Params: request.query (Filtros, ordenação, paginação, ...)
// Route Params: /:variavel request.params (Identificar um recurso na alteração ou remoção)
// Body: request.body (Dados para criação ou alteração de um registro)

// MongoDB (Não-relacional)

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const routes = require('./routes.js');
const { setupWebsocket } = require('./websocket');

// Configuração do acesso ao banco de dados Mongo no mLab
mongoose.connect('mongodb://omnistack:omnistack10@ds013456.mlab.com:13456/week10', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
})

// Configurações Express a Ordem é importante primeiro o json depois do routes
// O JavaScript executa linha a linha então é importante se atentar a essa ordem.
const app = express();
const server = http.Server(app);

// Configurando servidor por Websocket
setupWebsocket(server);

app.use(cors()); // Dessa forma ele liberar o Cors para todo mundo.
app.use(express.json());
app.use(routes);

// Porta da Aplicação
server.listen(3333);