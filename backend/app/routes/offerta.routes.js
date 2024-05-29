const { authJwt } = require("../middlewares");
const controller = require("../controllers/offerta.controller.js");
var router = require("express").Router();

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept",
    );
    next();
  });

  // Crea una nuova offerta d'aiuto
  router.post("/add", authJwt.controllaVolontario, controller.nuovaOfferta);

  app.use("/api/matchmaker/offerte", authJwt.verificaToken, router);
};
