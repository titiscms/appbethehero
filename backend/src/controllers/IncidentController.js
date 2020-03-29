const connection = require('../database/connection');

module.exports = {
   async index(request, response) {
      // fazendo paginação
      // buscando o parametro page atraves do Query Params
      // definindo como 1 se o parametro não existir
      const { page = 1 } = request.query;

      // buscar todos os incidentes e fazendo a contagem
      // [ count ] seria o mesmo que count[0]
      const [ count ] = await connection('incidents').count();

      const incidents = await connection('incidents')
         // relacionando dados entre as tabelas incidents e ongs
         // comparar o id da tabela ong com id da ong na tabela incidents e trazer os resultados
         .join('ongs', 'ongs.id', "=", 'incidents.ong_id')
         // limitar a quantidade de registros de incidentes em cinco
         .limit(5)
         // calculo para iniciar no registro zero e pular de cinco em cinco em cada paginação
         .offset((page - 1) * 5)
         // especificando quais dados retornar de cada tabela
         .select([
            'incidents.*', 
            'ongs.name', 
            'ongs.email', 
            'ongs.whatsapp', 
            'ongs.city', 
            'ongs.uf'
         ]);
   
      // setando a quantidade de registros no header do response
      // definindo um nome para esse cabeçalho e acessando a propriedade 'count(*)'
      response.header('X-Total-Count', count['count(*)']);

      return response.json(incidents);
   }, 

   async create(request, response) {
      const { title, description, value } = request.body;

      // pegando o id da ong logada no sistema no header da requisição
      const ong_id = request.headers.authorization;
      
      // desestruturando para pegar o id que é resultado desse insert
      const [id] = await connection('incidents').insert({
         title,
         description,
         value,
         ong_id
      });

      return response.json({ id });
   },

   async delete(request, response) {
      // pegar id do incidente atraves do Route Params
      const { id } = request.params;

      // pegar o id da ong conectada
      const ong_id = request.headers.authorization;

      // buscar o incidente atraves do id do incidente
      const incident = await connection('incidents')
         .where('id', id)
         .select('ong_id')
         .first();

      // fazer verificação se o ong_id é diferente do ong_id conectado 
      if(incident.ong_id !== ong_id) {
         // se for diferente mudar status para 401 não autorizado
         return response.status(401).json({ error: 'Operation not permitted' });
      }

      // se for igual, deletar o incident do banco de dados
      await connection('incidents').where('id', id).delete();

      // e retorna status 204 no content
      return response.status(204).send();
   }
};