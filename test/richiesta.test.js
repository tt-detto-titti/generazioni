const request = require('supertest');
const app = require('../backend/server');
const jwt = require('jsonwebtoken');
const config = require('../backend/config/auth.config');

var token;
function generaToken(id) {
  // Genero il token d'accesso per l'account di test
  return jwt.sign({ id: id }, config.JWT_SECRET, {
    algorithm: 'HS256',
    expiresIn: 86400
  });
}

describe('Test - (6) NuovaRichiesta', () => {
  // Test Case 1
  test('Aggiunta di una nuova richiesta con i campi validi, l\'accessToken valido e disponendo del ruolo "anziano"', async () => {
    token = generaToken('666812b5775238144c44b0d8');
    const response = await request(app)
      .post('/api/matchmaker/richieste/add')
      .set('x-access-token', token)
      .set('Accept', 'application/json')
      .send({
        data: '2025-07-08T12:00:00Z',
        durata: 90,
        descrizione: 'ho bisogno di aiuto per fare la spesa',
        categoria: 'aiuto fuori casa'
      })
      .expect('Content-Type', /json/)
      .expect(201);
    expect(response.body.message).toBe('La richiesta è stata salvata correttamente.');
  }, 10000);

  // Test Case 2
  test('Aggiunta di una nuova richiesta con i campi validi, l\'accessToken valido e disponendo di un ruolo diverso da "anziano"', async () => {
    token = generaToken('6653382801e34c3fd8142996');
    const response = await request(app)
      .post('/api/matchmaker/richieste/add')
      .set('x-access-token', token)
      .set('Accept', 'application/json')
      .send({
        data: '2025-07-08T12:00:00Z',
        durata: 90,
        descrizione: 'ho bisogno di aiuto per fare la spesa',
        categoria: 'aiuto fuori casa'
      })
      .expect(403);
          expect(response.body.message).toBe('Richiede il ruolo di anziano!');
  }, 10000);
});
