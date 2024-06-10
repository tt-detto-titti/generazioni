//test case 2
const app = require('./app');
const jwt = require('jsonwebtoken'); //non sono sicuro sia giusto
const mongoose = require('mongoose');
// const { locals } = require('express/lib/application'); //serve?
describe('GET /api/matchmaker/richieste', () => {
  beforeAll( async() => { jest.setTimeout(8000);
    locals.db = await mongoose.connect(process.env.localhost || 8080); }); //non sono sicuro sia giusto l'URL
  afterAll( () => { mongoose.connection.close(true); });
//accesso con account volontario (diverso da anziano)
  var token = jwt.sign({email: 'ofelia.toscano@email.it', password: 'Ofelia1980'}.
    process.env.SUPER_SECRET, {expiresIn: 86400}); //crea un token

  test('POST /api/matchmaker/richieste/add', () => {
    return request(app)
      .post('/api/matchmaker/richieste/add')
      .set('x-access-token', token)
      .send({
        data: '2024-07-08T12:00:00Z',
        durata: 90,
        descrizione: 'ho bisogno di aiuto per fare la spesa',
        categoria: 'aiuto fuori casa'
      })
      .expect(200)
      .then(res => {
        expect(response.status).toBe(404);
        expect(response.body.error).toBe("Impossibile creare la richiesta di aiuto: Utente non trovato!");
      });
  })
})