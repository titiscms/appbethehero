const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection')

describe('ONG', () => {
  // fazendo as migrates no banco de dados test
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  // finalizando a conexão com o banco de dados
  afterAll(async () => {
    await connection.destroy();
  });

  it('should be able to create a new ONG', async () => {
    const response = await request(app)
      .post('/ongs')
      .send({
        name: "PET2",
        email: "contato@pet.com.br",
        whatsapp: "5511333337777",
        city: "São Paulo",
        uf: "SP"
      });

    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toHaveLength(8);
  });
});