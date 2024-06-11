const request = require('supertest');
const app = require('../backend/server');

function generateRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

describe('Test Signup (1)', () => {
  // test case 3
  it('Registrazione di un nuovo utente con i campi validi', async () => {
    const response = await request(app)
      .post('/apiv2/auth/signup')
      .send({
        nome: 'Mario',
        cognome: 'Rossi',
        cf: generateRandomString(16),
        dataNascita: '1960-01-01T12:00:00Z',
        residenza: 'Via Trento 1, Roma RM 00133',
        telefono: generateRandomString(10),
        email: generateRandomString(20) + '@email.com',
        password: generateRandomString(8),
        ruoli: ['anziano']
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201);
    expect(response.body.message).toBe("L'utente è stato registrato correttamente.");
  });

  // test case 4
  it("Registrazione di un nuovo utente con i campi validi ma l'email già presente nel database", async () => {
    const response = await request(app)
      .post('/apiv2/auth/signup')
      //registrazione primo utente con email mario.rossi@email.com
      .send({
        nome: generateRandomString(8),
        cognome: generateRandomString(8),
        cf: generateRandomString(16),
        dataNascita: '1960-01-01T12:00:00Z',
        residenza: generateRandomString(18),
        telefono: generateRandomString(10),
        email: 'mario.rossi@email.com',
        password: generateRandomString(8),
        ruoli: ['anziano']
      })
      //registrazione una seconda volta con la stessa email
      .send({
        nome: 'Mario',
        cognome: 'Rossi',
        cf: generateRandomString(16),
        dataNascita: '1964-01-01T12:00:00Z',
        residenza: ' Via Trento 1, Roma RM 00133',
        telefono: generateRandomString(10),
        email: 'mario.rossi@email.com',
        password: 'pastaalpesto',
        ruoli: ['anziano']
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400);
    expect(response.body.message).toBe("L'email è gia presente nel database!");
  });

  // test case 5
  it('Registrazione di un nuovo utente con i campi validi ma il codice fiscale già presente nel database', async () => {
    const response = await request(app)
      .post('/apiv2/auth/signup')
      .send({
        nome: generateRandomString(8),
        cognome: generateRandomString(8),
        cf: 'RSSMRA60A01H501Q',
        dataNascita: '1960-01-01T12:00:00Z',
        residenza: generateRandomString(18),
        telefono: generateRandomString(10),
        email: generateRandomString(20) + '@email.com',
        password: generateRandomString(8),
        ruoli: ['anziano']
      })
      //registrazione una seconda volta con lo stesso codice fiscale
      .send({
        nome: 'Mario',
        cognome: 'Rossi',
        cf: 'RSSMRA60A01H501Q',
        dataNascita: '1960-01-01T12:00:00Z',
        residenza: 'Via Trento 1, Roma RM 00133',
        telefono: generateRandomString(10),
        email: generateRandomString(20) + '@email.com',
        password: 'pastaalpesto',
        ruoli: ['volontario']
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400);
    expect(response.body.message).toBe('Il codice fiscale è gia presente nel database!');
  });

  // test case 6
  it('Registrazione di un nuovo utente con i campi validi ma il numero di telefono già presente nel database', async () => {
    const response = await request(app)
      .post('/apiv2/auth/signup')
      .send({
        nome: generateRandomString(8),
        cognome: generateRandomString(8),
        cf: generateRandomString(16),
        dataNascita: '1960-01-01T12:00:00Z',
        residenza: generateRandomString(18),
        telefono: '3351234567',
        email: generateRandomString(20) + '@email.com',
        password: generateRandomString(8),
        ruoli: ['anziano']
      })
      //registrazione una seconda volta con lo stesso numero di telefono
      .send({
        nome: 'Mario',
        cognome: 'Rossi',
        cf: generateRandomString(16),
        dataNascita: '1960-01-01T12:00:00Z',
        residenza: 'Via Trento 1, Roma RM 00133',
        telefono: '3351234567',
        email: generateRandomString(20) + '@email.com',
        password: 'pastaalpesto',
        ruoli: ['anziano']
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400);
    expect(response.body.message).toBe('Il numero di telefono è gia presente nel database!');
  });

  // test case 7
  it("Registrazione di un nuovo utente con i campi validi a parte l'email", async () => {
    const response = await request(app)
      .post('/apiv2/auth/signup')
      .send({
        nome: 'Mario',
        cognome: 'Rossi',
        cf: generateRandomString(16),
        dataNascita: '1960-01-01T12:00:00Z',
        residenza: 'Via Trento 1, Roma RM 00133',
        telefono: generateRandomString(10),
        email: 'mario.rossi',
        password: 'pastaalpesto',
        ruoli: ['anziano']
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400);
    expect(response.body.message).toBe('Email non valida.');
  });

  //test case 8
  it('Registrazione di un nuovo utente con il campo nome vuoto e il resto dei campi validi', async () => {
    const response = await request(app)
      .post('/apiv2/auth/signup')
      .send({
        nome: '',
        cognome: 'Rossi',
        cf: generateRandomString(16),
        dataNascita: '1960-01-01T12:00:00Z',
        residenza: 'Via Trento 1, Roma RM 00133',
        telefono: generateRandomString(10),
        email: generateRandomString(10) + '@email.com',
        password: 'pastaalpesto',
        ruoli: ['anziano']
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400);
    expect(response.body.message).toBe('È necessario inserire il nome!');
  });

  //test case 9
  it('Registrazione di un nuovo utente con il campo cognome vuoto e il resto dei campi validi', async () => {
    const response = await request(app)
      .post('/apiv2/auth/signup')
      .send({
        nome: 'Mario',
        cognome: '',
        cf: generateRandomString(16),
        dataNascita: '1960-01-01T12:00:00Z',
        residenza: 'Via Trento 1, Roma RM 00133',
        telefono: generateRandomString(10),
        email: generateRandomString(20) + '@email.com',
        password: 'pastaalpesto',
        ruoli: ['anziano']
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400);
    expect(response.body.message).toBe('È necessario inserire il cognome!');
  });
});
