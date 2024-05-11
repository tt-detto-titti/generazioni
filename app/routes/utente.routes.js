const { authJwt } = require("../middlewares");
const controller = require("../controllers/utente.controller.js");

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/tutti", controller.testTutti);
  app.get("/api/test/utente", [authJwt.verificaToken], controller.testUtente);
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
};
