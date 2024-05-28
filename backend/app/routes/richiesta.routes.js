const { authJwt } = require("../middlewares");
const controller = require("../controllers/richiesta.controller.js");
var router = require("express").Router();

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept",
    );
    next();
  });

  // Restituisce a un volontario tutte le richieste che potrebbe accettare
  router.get(
    "/disponibili",
    authJwt.controllaVolontario,
    controller.trovaRichiesteDisponibili,
  );
  // Permette a un volontario di accettare una richiesta
  router.post("/accetta/:id", authJwt.controllaVolontario, controller.accettaRichiesta);
  // Crea una richiesta
  router.post("/add", authJwt.controllaAnziano, controller.nuovaRichiesta);
  // Restituisce tutte le richieste fatte da parte di una persona anziana
  router.get(
    "/:id_anziano",
    authJwt.controllaAnziano,
    controller.trovaRichiesteAnziano,
  );

  app.use("/api/matchmaker/richieste", authJwt.verificaToken, router);
};
