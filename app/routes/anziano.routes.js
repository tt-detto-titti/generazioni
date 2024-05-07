module.exports = (app) => {
    const anziani = require("../controllers/utente.controller.js");
  
    var router = require("express").Router();
    // Crea un Anziano
    router.post("/", anzani.create);
    // Logga un utente ?? come si deve comportare con un anziano (che è già utente)?
    router.get("/", utenti.login);
  
    app.use("/api/anziani", router);
  };
  