const { authJwt } = require('../middlewares');
const controller = require('../controllers/offerta.controller.js');
const router = require('express').Router();

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, Content-Type, Accept');
    next();
  });

  /*                 Versione 2                 */
  // Crea una nuova offerta d'aiuto
  router.post('/add', authJwt.controllaVolontario, controller.nuovaOfferta);
  // Restituisce tutte le offerte d'aiuto fatte da un volontario
  router.get('/:id_volontario', authJwt.controllaVolontario, controller.trovaOfferteVolontario);

  app.use('/apiv2/matchmaker/offerte', authJwt.verificaToken, router);
};
