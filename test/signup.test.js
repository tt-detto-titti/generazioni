//test case 3
const app = require('./app');
const jwt = require('jsonwebtoken'); //non sono sicuro sia giusto
const mongoose = require('mongoose');
// const { locals } = require('express/lib/application'); //serve?
describe('GET /api/auth/signup', () => {
  beforeAll( async() => { jest.setTimeout(8000);
    locals.db = await mongoose.connect(process.env.localhost || 8080); }); //non sono sicuro sia giusto l'URL
  afterAll( () => { mongoose.connection.close(true); });
/*
  var token = jwt.sign({email: 'giovanni.rana@email.it', password: 'pastaalpesto'}.
    process.env.SUPER_SECRET, {expiresIn: 86400}); //crea un token
*/ //parte token non dovrebbe essere necessaria
  test('POST /api/auth/signup', () => {
    return request(app)
      .post('/api/auth/signup')
      //.set('x-access-token', token)
      .send({
        nome: 'Mario',
        cognome: 'Rossi',
        cf: 'RSSMRA60A01H501Q',
        dataNascita: '1960-01-01T12:00:00Z',
        residenza: 'Via Trento 1, Roma RM 00133',
        telefono: '3351234567',
        email: 'mario.rossi@email.com',
        password: 'pastaalpesto',
        ruoli: ['anziano']
      })
      .expect(200)
      .then(res => {
        expect(response.status).toBe(500);
        expect(res.body.nome).toBe('Mario');
        expect(res.body.cognome).toBe('Rossi');
        expect(res.body.cf).toBe('RSSMRA60A01H501Q');
        expect(res.body.dataNascita).toBe('1960-01-01T12:00:00Z');
        expect(res.body.residenza).toBe('Via Trento 1, Roma RM 00133');
        expect(res.body.telefono).toBe('3351234567');
        expect(res.body.email).toBe('mario.rossi@email.com');
        expect(res.body.password).toBe('pastaalpesto');
        expect(res.body.ruoli[0]).toBe('anziano');
      });
  })
})