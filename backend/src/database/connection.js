const knex = require('knex');
const configuration = require('../../knexfile');

// gerenciando variaveis de ambiente para configurar ambiente de dev ou test
const config = process.env.NODE_ENV === 'test' ? configuration.test : configuration.development;

// passando as configurações de conexão no banco de dados(desenvolvimento);
const connection = knex(config);

module.exports = connection;