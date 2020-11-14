let rest = [];

rest.push('comunicacao/ComunicacaoREST');

function routes(app){
    console.log("*** Load Routes ***");

    for(index in rest){
        let obj = require('./modules/' + rest[index]);

        obj.registerRoutes(app);
    }
}

module.exports = routes;