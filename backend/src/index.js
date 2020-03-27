const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

// se fosse colocar em produção, passar o parametro " origin: 'http://meuapp.com' " dentro do cors se nossa aplicação estiver hospedada nessa url
// como estamos em desenvolvimento, não passamos o parametro para que todas as aplicações possam "enxergar" a api
app.use(cors());
// informando o express ir no corpo da requisição e converter num objeto javascript (Json), transformando em algo entendível pela aplicação
app.use(express.json());
// buscando a rotas
app.use(routes);

app.listen(3333);