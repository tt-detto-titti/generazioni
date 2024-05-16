const { authJwt } = require("../middlewares");
const controller = require("../controllers/richiesta.controller.js");
var router = require("express").Router();

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Crea una richiesta
  router.post("/add", authJwt.controllaAnziano, controller.nuovaRichiesta);

  app.use("/api/matchmaker/richieste", authJwt.verificaToken, router);
};
