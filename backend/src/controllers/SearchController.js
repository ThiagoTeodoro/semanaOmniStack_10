const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {

    /**
     * Controller for Search Devs in range location
     * @param {*} request 
     * @param {*} response 
     */
    async index(request, response) {     
        
        const { latitude, longitude, techs } = request.query;
        const techsArray = parseStringAsArray(techs);
        
        const devs = await Dev.find({
            techs: {
                $in: techsArray
            },
            location : {
                $near: {
                    $geometry : {
                        type: 'Point',
                        coordinates: [longitude, latitude],                        
                    },
                    $maxDistance: 10000, //10Km
                }
            }
        });
        
        return response.json({devs : devs});
    },

};