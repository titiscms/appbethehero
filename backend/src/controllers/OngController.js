const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {
   // é possível ter mesmo recurso com métodos diferentes
   async index(request, response) {
      // fazendo um select em todos os dados da tabela
      const ongs = await connection('ongs').select('*');
   
      // retornando uma lista das ongs
      return response.json(ongs);
   },   

   // definindo com uma função assincrona pois o insert abaixo pode demorar um pouco
   async create(request, response) {
      // desestruturação do body, garantindo que o usuário só envio os dados abaixo
      const { name, email, whatsapp, city, uf } = request.body;

      // usando o crypto para gerar um valor aleatório numa string no formato hexadecimal
      const id = crypto.randomBytes(4).toString('HEX');

      // conectando no banco e passando a tabela e as colunas que vão ser inseridas o dados
      // colocando o await, o codigo vai aguardar finalizar o insert para depois continuar
      await connection('ongs').insert({
         id, 
         name, 
         email, 
         whatsapp, 
         city, 
         uf
      });

      // retornando o id para ser usado dentro do sistema
      return response.json({ id });
   }
};