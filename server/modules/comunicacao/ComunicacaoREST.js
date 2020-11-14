const appConfig = require('../../appConfig');
GenericREST = require('../../generics/GenericREST');

class ComunicacaoREST extends GenericREST{
    constructor() {
        super();

        this.service = require('./ComunicacaoService');
    }

    registerRoutes(app) {
        console.log('*** Rotas para Comunicacao ***');

        let url = `${appConfig.rootAPI}/comunicacao`;
        let endPointAgendamento = `/agendamento`;
        let endPointAgendamentoStatus = `/status`;
        let endPointAgendamentoDelete = `/delete`;

        console.log(`***   GET      ${url}${endPointAgendamento}${endPointAgendamentoStatus}`);
        app.get(`${url}${endPointAgendamento}${endPointAgendamentoStatus}`, this.getRecords);

        console.log(`***   GET      ${url}${endPointAgendamento}${endPointAgendamentoStatus}/:id`);
        app.get(`${url}${endPointAgendamento}${endPointAgendamentoStatus}/:id`, this.getRecord);

        console.log(`***   POST     ${url}${endPointAgendamento}`);
        app.post(`${url}${endPointAgendamento}`, this.add);

        console.log(`***   PUT      ${url}${endPointAgendamento}/:id`);
        app.put(`${url}${endPointAgendamento}/:id`, this.update);

        console.log(`***   DELETE   ${url}${endPointAgendamento}${endPointAgendamentoDelete}/:id`);
        app.delete(`${url}${endPointAgendamento}${endPointAgendamentoDelete}/:id`, this.delete);
    }
}

module.exports = new ComunicacaoREST();