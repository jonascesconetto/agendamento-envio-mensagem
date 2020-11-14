GenericDAO = require('../../generics/GenericDAO');

class ComunicacaoDAO extends GenericDAO {
    constructor(){
        super();

        this.tableName = 'comunicacao';
    }
}

module.exports = new ComunicacaoDAO();