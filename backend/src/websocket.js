const socketio = require('socket.io');
const parseStringAsArray = require('./utils/parseStringAsArray');
const calculateDistance = require('./utils/calculateDistance');


// Salvando as conexões na memória
const clientsWebSocketRegistered = [];

// Variavel global com o servidor, para tornar acessivel em todas as funções.
let io;

exports.setupWebsocket = (server) => {
    console.log('Servidor Websocket em funcionamento...');

    io = socketio(server);

    io.on('connection', socket => {

        // É dentro do socket.handshake.query que vem os parâmetros do Front end Mobile.
        const {latitude, longitude, techs} = socket.handshake.query;

        clientsWebSocketRegistered.push({
            id: socket.id,
            coordinates: {
                latitude: Number(latitude),
                longitude: Number(longitude),
            },
            techs: parseStringAsArray(techs)
        })

        setTimeout(() => {
            socket.emit('info', 'Client registrado com sucesso!');
        }, 3000);
    })

}

/**
 *  Metodo que verifica se o novo Dev cadasrtrado (No caso pelo endpont Http)
 *  está em uma riao de 10 km de algum dos client que estão registrados
 *  no WebSocket e se desses clientes regitrados que estão buscando por Devs
 *  a pesquisa enviada bate com as techs desse novo Dev, se toda essa condição
 *  for verdadeira ele retorna a conexão registranda aqui na memoria em clientsWebSocketRegister
 */
exports.findConnections = (coordenadasNovoDev, techsNovoDev) => {

    return clientsWebSocketRegistered.filter(clientWebSocket =>  {
    
        // Esse if é para alguem se registre no websocket e clique no botão de busca sem digitar nada.
        if(clientWebSocket.techs){

            return calculateDistance(coordenadasNovoDev, clientWebSocket.coordinates) < 10
                && clientWebSocket.techs.some(techsClientNeded => techsNovoDev.includes(techsClientNeded));
        } else {

            return [];
        }
    })
}


/**
 * Metodo para enviar infomações para os Clients WebSocket
 * 
 * @param to Array com os Sockets
 * @param typeEvent tipo do Evento a ser enviado.
 * @param data Informações a serem enviadas.
 */
exports.sendEventToClient = (to, typeEvent, data) => {
    to.forEach(clientWebSocket => {
        io.to(clientWebSocket.id).emit(typeEvent, data);
    });
}