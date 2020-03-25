const connection = require('../database/connection');

module.exports = {
   async create(request, response) {
      // id que a aplicação fará login virá através do corpo
      const { id } = request.body;

      // buscando ong no banco de dados e retornando apenas um resultado
      const ong = await connection('ongs')
         .where('id', id)
         .select('name')
         .first();
      
      // verificação se ONG existe no banco
      if(!ong) {
         // se ong não existir, jogar erro 400 bad request
         return response.status(400).json({ error: 'No ONG found with this ID' });
      }

      // se tudo der certo, retornar os dados da ong
      return response.json(ong);
   }
};