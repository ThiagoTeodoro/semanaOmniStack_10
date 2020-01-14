const axios = require('axios');
const Dev = require('../models/Dev');


/**
 * Boa pratica de nomeclatura 
 * O Controller geralmente tem 5 metodos index, show, store, update, destroy
 * index : lista
 * show : mostra um unico dado
 * store: criar
 * update: alterar
 * destroy : deletar.
 */
module.exports = {
    
    /**
     * Controller for get all Devs registred in MongoDB
     * 
     * @param {*} request 
     * @param {*} response 
     */
    async index(request, response) {
        
        const devs = await Dev.find();
        return response.json(devs);
    },

    /**
     * Controller for register a new Dev in Database.
     * 
     * @param {*} request 
     * @param {*} response 
     */
    async store(request, response) {

        const { github_username, techs, latitude, longitude } = request.body;

        // Verificando se o usário já não está cadastrado no MongoDB
        let dev = await Dev.findOne({github_username: github_username});

        if(!dev){

            // O await força em conjunto com o async esperar/aguardar a resposta da requisição do axios
            const response_github = await axios.get('https://api.github.com/users/' + github_username);
        
            // Recebendo a resposta da requisição fazemos    
            let { name, avatar_url, bio }  = response_github.data;
            
            // Splitando por virgula e em conjunto com o map retirando espaços desnecessários nas Strings.
            let techsArray = techs.split(',').map(tech => tech.trim());
        
            // Sobrepondo name caso ele não exista, pois ele não é obrigatório no GitHub
            if(!name){
                name = response_github.data.login;
            }
        
            const location = {
                type : 'Point',
                coordinates : [longitude, latitude],
            }
        
            // Cadastarndo no banco de dados. O await vai fazer esperar o retorno do bd por que pode demorar. 
            dev = await Dev.create({
                name: name,
                github_username: github_username,
                bio: bio,
                avatar_url: avatar_url,
                techs: techsArray,  
                location : location,
            });

        };

        /**
         * Como eu selecionei ele lá em cima, se ele já tiver cadastrado ele 
         * vai retornar o já cadastrado se não ele vai cadastrar e retornar 
         * na mesma variavel dev, olha que bacana isso = )
         */
        return response.json(dev);
    },


};