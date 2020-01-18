import socketio from 'socket.io-client';

const socket = socketio('http://192.168.100.4:3333', {
    autoConnect: false,
});

function connect(latitude, longitude, techs) {

    // Para mandar informações para o BackEnd usamos esse 
    // socket.io.opts. query apartir do momento que preenchemos
    // ele, estamos mandando para o backend essas informações.
    socket.io.opts.query = {
        latitude : latitude,
        longitude : longitude,
        techs : techs
    };

    socket.connect();

    socket.on('info', text => {
        console.log(text);
    })
}

/**
 *  Desconecta caso já esteja connectado.
 */
function disconnect(){
    
    if(socket.connected){
        socket.disconnect();
    }
}

/**
 * Método para ficar ouvindo o evento de novos desenvolvedores
 * cadastrados na região em que o usuário está no aplicativo.
 * 
 * @param {*} subscribeFunction Função a ser executada quando o evento acontecer.
 */
function subscribeToNewDevs(subscribeFunction){

    // Repare que o Dev vai vim no data então essa função quando chamada consegui injetar o data
    socket.on('new-dev', subscribeFunction);
}

export {
    connect,
    disconnect,
    subscribeToNewDevs,
}