const { authJwt } = require("../middlewares");
const controller = require("../controllers/disponibilita.controller");
var router = require("express").Router();

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept",
    );
    next();
  });

  // Crea una nuova disponibilita
  router.post(
    "/add",
    authJwt.controllaVolontario,
    controller.nuovaDisponibilita,
  );

  app.use("/api/matchmaker/disponibilita", authJwt.verificaToken, router);
};
