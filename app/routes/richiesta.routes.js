module.exports = (app) => {
  const richieste = require("../controllers/richiesta.controller.js");

  var router = require("express").Router();

  // Crea una richiesta
  router.post("/", richieste.create);

  // Restituisci tutte le richieste
  router.get("/", richieste.findAll);

  app.use("/api/richieste", router);
};
