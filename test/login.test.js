const request = require('supertest');
const app = require('../backend/server');

describe('Test - (3) Login', () => {
  // Test Case 10
  test('Login di un utente con email e password corretta', async () => {
    const res = await request(app)
      .post('/apiv2/auth/login')
      .set('Accept', 'application/json')
      .send({
        email: 'giovanni.rana@email.it',
        password: 'pastaalpesto'
      })
      .expect('Content-Type', /json/)
      .expect(200);
    expect(res.body.email).toBe('giovanni.rana@email.it');
    expect(res.body.ruoli[0]).toBeDefined();
    expect(res.body.accessToken).toBeDefined();
  });

  // Test Case 11
  test('Login di un utente con email corretta ma password sbagliata', async () => {
    const res = await request(app)
      .post('/apiv2/auth/login')
      .set('Accept', 'application/json')
      .send({
        email: 'giovanni.rana@email.it',
        password: 'pastaalsugo'
      })
      .expect('Content-Type', /json/)
      .expect(401);
    expect(res.body.message).toBe('Password non valida!');
  });

  // Test Case 12
  test('Login di un utente con una email non registrata del database', async () => {
    const res = await request(app)
      .post('/apiv2/auth/login')
      .set('Accept', 'application/json')
      .send({
        email: 'giuseppe.bianchi@email.com',
        password: 'pastaalpesto'
      })
      .expect('Content-Type', /json/)
      .expect(404);
    expect(res.body.message).toBe('Utente non trovato!');
  });

  // Test Case 13
  test('Login di un utente con password vuota', async () => {
    const res = await request(app)
      .post('/apiv2/auth/login')
      .set('Accept', 'application/json')
      .send({
        email: 'giovanni.rana@email.it',
        password: ''
      })
      .expect('Content-Type', /json/)
      .expect(400);
    expect(res.body.message).toBe('È necessario inserire la password!');
  });

  // Test Case 14
  test('Login di utente con email vuota', async () => {
    const res = await request(app)
      .post('/apiv2/auth/login')
      .set('Accept', 'application/json')
      .send({
        email: '',
        password: 'pastaalpesto'
      })
      .expect('Content-Type', /json/)
      .expect(400);
    expect(res.body.message).toBe("È necessario inserire l'email!");
  });
});
