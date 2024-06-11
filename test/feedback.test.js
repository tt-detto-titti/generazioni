const request = require('supertest');
const app = require('../backend/server');
const jwt = require('jsonwebtoken');
const config = require('../backend/config/auth.config');

const ID_ANZIANO = '6667169dfc463448ca75ea9b';
const ID_VOLONTARIO = '6653382801e34c3fd8142996';
const ID_RICHIESTA_VALIDA = '66681fbb58d261d2347505ab';
const ID_RICHIESTA_NON_VALIDA = '6667169dfc463448ca75ea9b';

var token;
function generaToken(id) {
  // Genero il token d'accesso per l'account di test
  return jwt.sign({ id: id }, config.JWT_SECRET, {
    algorithm: 'HS256',
    expiresIn: 86400
  });
}

describe('Test - (16) Feedback/Segnalazione', () => {
  // Test Case 22
  test('Anziano segnala comportamento scorretto da parte di un volontario', async () => {
    token = generaToken(ID_ANZIANO);
    const response = await request(app)
      .post('/apiv2/feedback/add/' + ID_RICHIESTA_VALIDA)
      .set('x-access-token', token)
      .set('Accept', 'application/json')
      .send({
        tipologia: 'segnalazione',
        descrizione: 'Il volontario ha rubato a casa mia'
      })
      .expect('Content-Type', /json/)
      .expect(201);
    expect(response.body.message).toBe('Feedback salvato con successo.');
  }, 10000);

  // Test Case 23
  test('Volontario segnala comportamento scorretto da parte di un anziano', async () => {
    token = generaToken(ID_VOLONTARIO);
    const response = await request(app)
      .post('/apiv2/feedback/add/' + ID_RICHIESTA_VALIDA)
      .set('x-access-token', token)
      .set('Accept', 'application/json')
      .send({
        tipologia: 'segnalazione',
        descrizione: 'Sono stato truffato'
      })
      .expect('Content-Type', /json/)
      .expect(201);
    expect(response.body.message).toBe('Feedback salvato con successo.');
  }, 10000);

  // Test Case 24
  test('Feedback da parte di un anziano dopo aver ricevuto aiuto da un volontario', async () => {
    token = generaToken(ID_ANZIANO);
    const response = await request(app)
      .post('/apiv2/feedback/add/' + ID_RICHIESTA_VALIDA)
      .set('x-access-token', token)
      .set('Accept', 'application/json')
      .send({
        tipologia: 'feedback',
        descrizione: 'Tutto bene'
      })
      .expect('Content-Type', /json/)
      .expect(201);
    expect(response.body.message).toBe('Feedback salvato con successo.');
  }, 10000);

  // Test Case 25
  test('Feedback da parte di un volontario dopo aver aiutato un anziano', async () => {
    token = generaToken(ID_VOLONTARIO);
    const response = await request(app)
      .post('/apiv2/feedback/add/' + ID_RICHIESTA_VALIDA)
      .set('x-access-token', token)
      .set('Accept', 'application/json')
      .send({
        tipologia: 'feedback',
        descrizione: 'Tutto bene'
      })
      .expect('Content-Type', /json/)
      .expect(201);
    expect(response.body.message).toBe('Feedback salvato con successo.');
  }, 10000);

  // Test Case 26
  test('Feedback da parte di un anziano ad una richiesta che non esiste', async () => {
    token = generaToken(ID_ANZIANO);
    const response = await request(app)
      .post('/apiv2/feedback/add/' + ID_RICHIESTA_NON_VALIDA)
      .set('x-access-token', token)
      .set('Accept', 'application/json')
      .send({
        tipologia: 'feedback',
        descrizione: 'Tutto bene'
      })
      .expect('Content-Type', /json/)
      .expect(404);
    expect(response.body.message).toBe('Richiesta non trovata!');
  }, 10000);

  // Test Case 27
  test('Feedback da parte di un volontario ad una richiesta che non esiste', async () => {
    token = generaToken(ID_VOLONTARIO);
    const response = await request(app)
      .post('/apiv2/feedback/add/' + ID_RICHIESTA_NON_VALIDA)
      .set('x-access-token', token)
      .set('Accept', 'application/json')
      .send({
        tipologia: 'feedback',
        descrizione: 'Tutto bene'
      })
      .expect('Content-Type', /json/)
      .expect(404);
    expect(response.body.message).toBe('Richiesta non trovata!');
  }, 10000);
});
