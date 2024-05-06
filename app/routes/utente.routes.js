module.exports = (app) => {
  const utenti = require("../controllers/utente.controller.js");

  var router = require("express").Router();

  /**
   * @openapi
   * /:
   *  post:
   *      summary: crea un utente
   */
  router.post("/", utenti.signup);

  // Logga un utente
  router.get("/", utenti.login);

  app.use("/api/utenti", router);
};
