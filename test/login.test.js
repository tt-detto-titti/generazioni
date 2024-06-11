const request = require('supertest');
const app = require('../backend/server');

describe('Test - (3) Login', () => {
  // test case 10
  it('Login di un utente con email e password corretta', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'giovanni.rana@email.it',
        password: 'pastaalpesto'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.body.email).toBe('giovanni.rana@email.it');
    expect(response.body.ruoli[0]).toBeDefined();
    expect(response.body.accessToken).toBeDefined();
  });

  // test case 11
  it('Login di un utente con email corretta ma password sbagliata', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'giovanni.rana@email.it',
        password: 'pastaalsugo'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401);
    expect(response.body.message).toBe('Password non valida!');
  });

  // test case 12
  it('Login di un utente con una email non registrata del database', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'giuseppe.bianchi@email.com',
        password: 'pastaalpesto'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404);
    expect(response.body.message).toBe('Utente non trovato!');
  });

  // test case 13
  it('Login di un utente con password vuota', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'giovanni.rana@email.it',
        password: ''
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400);
    expect(response.body.message).toBe('È necessario inserire la password!');
  });

  // test case 14
  it('Login di utente con email vuota', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: '',
        password: 'pastaalpesto'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400);
    expect(response.body.message).toBe("È necessario inserire l'email!");
  });
});
