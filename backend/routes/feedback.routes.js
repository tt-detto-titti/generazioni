const { authJwt } = require('../middlewares');
const controller = require('../controllers/feedback.controller.js');
var router = require('express').Router();

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, Content-Type, Accept');
    next();
  });

  /*                 Versione 2                 */
  // Crea un nuovo feedback per la richiesta di cui viene specificato l'id
  router.post('/add/:id_richiesta', controller.nuovoFeedback);

  app.use('/apiv2/feedback', authJwt.verificaToken, router);
};
