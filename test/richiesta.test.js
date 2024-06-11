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
  return jwt.sign({ id: id }, config.JWT_SECRET, {
    algorithm: 'HS256',
    expiresIn: 86400
  });
}

describe('Test - (6) NuovaRichiesta', () => {
  // Test Case 1
  test('Aggiunta di una nuova richiesta con i campi validi, l\'accessToken valido e disponendo del ruolo "anziano"', async () => {
    token = generaToken(ID_ANZIANO);
    const res = await request(app)
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
    expect(res.body.message).toBe('La richiesta è stata salvata correttamente.');
  }, 10000);

  // Test Case 2
  test('Aggiunta di una nuova richiesta con i campi validi, l\'accessToken valido e disponendo di un ruolo diverso da "anziano"', async () => {
    token = generaToken(ID_VOLONTARIO);
    const res = await request(app)
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
      .expect(403);
    expect(res.body.message).toBe('Richiede il ruolo di anziano!');
  }, 10000);

  // Test Case 15
  test('Aggiunta di una nuova richiesta con i campi validi a parte data che è vuoto, l\'accessToken valido e disponendo del ruolo "anziano"', async () => {
    token = generaToken(ID_ANZIANO);
    const res = await request(app)
      .post('/api/matchmaker/richieste/add')
      .set('x-access-token', token)
      .set('Accept', 'application/json')
      .send({
        durata: 90,
        descrizione: 'ho bisogno di aiuto per fare la spesa',
        categoria: 'aiuto fuori casa'
      })
      .expect('Content-Type', /json/)
      .expect(400);
    expect(res.body.message).toBe('È necessario inserire la data!');
  }, 10000);

  // Test Case 30
  test('Aggiunta di una nuova richiesta con i campi validi a parte durata che è vuoto, l\'accessToken valido e disponendo del ruolo "anziano"', async () => {
    token = generaToken(ID_ANZIANO);
    const res = await request(app)
      .post('/api/matchmaker/richieste/add')
      .set('x-access-token', token)
      .set('Accept', 'application/json')
      .send({
        data: '2025-07-08T12:00:00Z',
        descrizione: 'ho bisogno di aiuto per fare la spesa',
        categoria: 'aiuto fuori casa'
      })
      .expect('Content-Type', /json/)
      .expect(400);
    expect(res.body.message).toBe('È necessario inserire la durata!');
  }, 10000);

  // Test Case 31
  test('Aggiunta di una nuova richiesta con i campi validi a parte descrizione che è vuoto, l\'accessToken valido e disponendo del ruolo "anziano"', async () => {
    token = generaToken(ID_ANZIANO);
    const res = await request(app)
      .post('/api/matchmaker/richieste/add')
      .set('x-access-token', token)
      .set('Accept', 'application/json')
      .send({
        data: '2025-07-08T12:00:00Z',
        durata: 90,
        categoria: 'aiuto fuori casa'
      })
      .expect('Content-Type', /json/)
      .expect(400);
    expect(res.body.message).toBe('È necessario inserire una descrizione!');
  }, 10000);

  // Test Case 32
  test('Aggiunta di una nuova richiesta con i campi validi a parte categoria che è vuoto, l\'accessToken valido e disponendo del ruolo "anziano"', async () => {
    token = generaToken(ID_ANZIANO);
    const res = await request(app)
      .post('/api/matchmaker/richieste/add')
      .set('x-access-token', token)
      .set('Accept', 'application/json')
      .send({
        data: '2025-07-08T12:00:00Z',
        durata: 90,
        descrizione: 'ho bisogno di aiuto per fare la spesa'
      })
      .expect('Content-Type', /json/)
      .expect(400);
    expect(res.body.message).toBe('È necessario inserire la categoria di aiuto!');
  }, 10000);
});

describe('Test - (13) VisualizzazioneRichieste', () => {
  // Test Case 16
  test("Accettazione di una richiesta d'aiuto da parte di un volontario", async () => {
    token = generaToken(ID_VOLONTARIO);
    const res = await request(app)
      .put(`/api/matchmaker/richieste/accetta/${ID_RICHIESTA_VALIDA}`)
      .set('x-access-token', token)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
    expect(res.body.message).toBe('La richiesta è stata accettata correttamente.');
  }, 10000);

  // Test Case 17
  test('Utente non registrato come volontario prova ad accettare una richiesta', async () => {
    token = generaToken(ID_ANZIANO);
    const res = await request(app)
      .put(`/api/matchmaker/richieste/accetta/${ID_RICHIESTA_VALIDA}`)
      .set('x-access-token', token)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(403);
    expect(res.body.message).toBe('Richiede il ruolo di volontario!');
  }, 10000);

  // Test Case 18
  test('Volontario accetta richiesta che non esiste', async () => {
    token = generaToken(ID_VOLONTARIO);
    const res = await request(app)
      .put(`/api/matchmaker/richieste/accetta/${ID_RICHIESTA_NON_VALIDA}`)
      .set('x-access-token', token)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404);
    expect(res.body.message).toBe('Richiesta non trovata!');
  });
});
