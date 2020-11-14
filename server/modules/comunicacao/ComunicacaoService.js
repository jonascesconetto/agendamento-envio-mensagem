GenericService = require('../../generics/GenericService');

class ComunicacaoService extends GenericService {
    constructor(){
        super();

        this.dao = require('./ComunicacaoDAO');
    }
}

module.exports = new ComunicacaoService();