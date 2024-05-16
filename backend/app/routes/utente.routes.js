const { authJwt } = require("../middlewares/index.js");
const controller = require("../controllers/utente.controller.js");
var router = require("express").Router();

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // API di test
  // TODO eliminare le ripetizioni
  app.get("/api/test/tutti", controller.testTutti);
  router.get("/api/test/utente", controller.testUtente);
  app.get(
    "/api/test/anziano",
    [authJwt.verificaToken, authJwt.controllaAnziano],
    controller.testAnziano
  );
  app.get(
    "/api/test/volontario",
    [authJwt.verificaToken, authJwt.controllaVolontario],
    controller.testVolontario
  );
  app.get(
    "/api/test/supervisore",
    [authJwt.verificaToken, authJwt.controllaSupervisore],
    controller.testSupervisore
  );
  app.get(
    "/api/test/admin",
    [authJwt.verificaToken, authJwt.controllaAdmin],
    controller.testAdmin
  );

  app.use("/api/test", [authJwt.verificaToken], router);
};
