module.exports = (app) => {
  const utenti = require("../controllers/utente.controller.js");
  var router = require("express").Router();

  // Registra un utente
  router.post("/register", utenti.signup);
  // Logga un utente
  router.post("/login", utenti.login);

  app.use("/api/utenti", router);
};
