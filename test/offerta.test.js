const request = require('supertest');
const app = require('../backend/server');
const jwt = require('jsonwebtoken');
const config = require('../backend/config/auth.config');

const ID_ANZIANO = '6667169dfc463448ca75ea9b';
const ID_VOLONTARIO = '6653382801e34c3fd8142996';

var token;
function generaToken(id) {
  // Genero il token d'accesso per l'account di test
  return jwt.sign({ id: id }, config.JWT_SECRET, {
    algorithm: 'HS256',
    expiresIn: 86400
  });
}

describe('Test - (11) Disponibilita', () => {
  // Test Case 19
  test('Aggiunta di una nuova offerta d\'aiuto con i campi validi, l\'accessToken valido e disponendo del ruolo "volontario"', async () => {
    token = generaToken(ID_VOLONTARIO);
    const response = await request(app)
      .post('/apiv2/matchmaker/offerte/add')
      .set('x-access-token', token)
      .set('Accept', 'application/json')
      .send({
        data: '2025-07-08T12:00:00Z',
        durata: 180,
        categoria: ['aiuto in casa', 'aiuto fuori casa', 'compagnia']
      })
      .expect('Content-Type', /json/)
      .expect(201);
    expect(response.body.message).toBe("L'offerta di aiuto è stata salvata correttamente.");
  }, 10000);

  // Test Case 20
  test('Aggiunta di una nuova offerta d\'aiuto con i campi validi, l\'accessToken valido e disponendo di un ruolo diverso da "volontario"', async () => {
    token = generaToken(ID_ANZIANO);
    const response = await request(app)
      .post('/apiv2/matchmaker/offerte/add')
      .set('x-access-token', token)
      .set('Accept', 'application/json')
      .send({
        data: '2025-07-08T12:00:00Z',
        durata: 180,
        categoria: ['aiuto in casa', 'aiuto fuori casa', 'compagnia']
      })
      .expect(403);
    expect(response.body.message).toBe('Richiede il ruolo di volontario!');
  }, 10000);

  //test case 21
  test('Aggiunta di una nuova offerta d\'aiuto con i campi validi, l\'accessToken valido e disponendo del ruolo "volontario"', async () => {
    token = generaToken(ID_VOLONTARIO);
    const response = await request(app)
      .post('/apiv2/matchmaker/offerte/add')
      .set('x-access-token', token)
      .set('Accept', 'application/json')
      .send({
        durata: 180,
        categoria: ['aiuto in casa', 'aiuto fuori casa', 'compagnia']
      })
      .expect('Content-Type', /json/)
      .expect(400);
    expect(response.body.message).toBe('È necessario inserire la data!');
  }, 10000);
});
