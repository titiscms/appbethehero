const knex = require('knex');
const configuration = require('../../knexfile');

// passando as configurações de conexão no banco de dados(desenvolvimento);
const connection = knex(configuration.development);

module.exports = connection;