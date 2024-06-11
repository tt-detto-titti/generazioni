const request = require('supertest');
const app = require('../backend/server');

describe('Test - (3) Login', () => {
  // test case 10
  test('Login di un utente con email e password corretta', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .set('Accept', 'application/json')
      .send({
        email: 'giovanni.rana@email.it',
        password: 'pastaalpesto'
      })
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.body.email).toBe('giovanni.rana@email.it');
    expect(response.body.ruoli[0]).toBeDefined();
    expect(response.body.accessToken).toBeDefined();
  });

  // test case 11
  test('Login di un utente con email corretta ma password sbagliata', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .set('Accept', 'application/json')
      .send({
        email: 'giovanni.rana@email.it',
        password: 'pastaalsugo'
      })
      .expect('Content-Type', /json/)
      .expect(401);
    expect(response.body.message).toBe('Password non valida!');
  });

  // test case 12
  test('Login di un utente con una email non registrata del database', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .set('Accept', 'application/json')
      .send({
        email: 'giuseppe.bianchi@email.com',
        password: 'pastaalpesto'
      })
      .expect('Content-Type', /json/)
      .expect(404);
    expect(response.body.message).toBe('Utente non trovato!');
  });

  // test case 13
  test('Login di un utente con password vuota', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .set('Accept', 'application/json')
      .send({
        email: 'giovanni.rana@email.it',
        password: ''
      })
      .expect('Content-Type', /json/)
      .expect(400);
    expect(response.body.message).toBe('È necessario inserire la password!');
  });

  // test case 14
  test('Login di utente con email vuota', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .set('Accept', 'application/json')
      .send({
        email: '',
        password: 'pastaalpesto'
      })
      .expect('Content-Type', /json/)
      .expect(400);
    expect(response.body.message).toBe("È necessario inserire l'email!");
  });
});
