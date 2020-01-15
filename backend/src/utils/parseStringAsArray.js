/**
 * Função responsável por receber uma String separada por 
 * virgula e transformar essa String em um Array, atravéz 
 * do split, e da limpeza dos espaços denessário com o trim.
 */
module.exports = function parseStringAsArray(arrayAsString) {    
    return arrayAsString.split(',').map(data => data.trim());
};