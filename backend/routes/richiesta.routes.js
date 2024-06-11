const { authJwt } = require('../middlewares');
const controller = require('../controllers/richiesta.controller.js');
const router = require('express').Router();

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, Content-Type, Accept');
    next();
  });

  /*                 Versione 1                 */
  // Crea una nuova richiesta d'aiuto
  app.post(
    '/api/matchmaker/richieste/add',
    [authJwt.verificaToken, authJwt.controllaAnziano],
    controller.nuovaRichiesta
  );

  /*                 Versione 2                 */
  // Restituisce a un volontario tutte le richieste che potrebbe accettare
  router.get('/disponibili', authJwt.controllaVolontario, controller.trovaRichiesteDisponibili);
  // Restituisce tutte le richieste d'aiuto accettate
  router.get('/accettate/:id_volontario', authJwt.controllaVolontario, controller.trovaRichiesteAccettate);
  // Permette a un volontario di accettare una richiesta
  router.put('/accetta/:id_richiesta', authJwt.controllaVolontario, controller.accettaRichiesta);
  // Crea una nuova richiesta d'aiuto
  router.post('/add', authJwt.controllaAnziano, controller.nuovaRichiesta);
  // Restituisce tutte le richieste fatte da parte di una persona anziana
  router.get('/:id_anziano', authJwt.controllaAnziano, controller.trovaRichiesteAnziano);

  app.use('/apiv2/matchmaker/richieste', authJwt.verificaToken, router);
};
