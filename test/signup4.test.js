//test case 6
const app = require('./app');
const jwt = require('jsonwebtoken'); //non sono sicuro sia giusto
const mongoose = require('mongoose');
// const { locals } = require('express/lib/application'); //serve?
describe('GET /api/auth/signup', () => {
  beforeAll( async() => { jest.setTimeout(8000);
    locals.db = await mongoose.connect(process.env.localhost || 8080); }); //non sono sicuro sia giusto l'URL
  afterAll( () => { mongoose.connection.close(true); });

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
      //registrazione una seconda volta con lo stesso numero di telefono
      .send({
        nome: 'Mario Luigi',
        cognome: 'Rossi',
        cf: 'RSSMRA64A01H501Q',
        dataNascita: '1964-01-01T12:00:00Z',
        residenza: 'Via Roma 1, Trento TN 38122',
        telefono: '3351234567',
        email: 'luigi.rossi@email.com',
        password: 'pastaalsugo',
        ruoli: ['volontario']
      })
      .expect(200)
      .then(res => {
        expect(response.status).toBe(400);
        expect(res.body.message).toBe("Il numero di telefono è gia presente nel database!");
      });
  })
})