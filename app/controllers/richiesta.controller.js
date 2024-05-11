const db = require("../models");
const Richiesta = db.richiesta;

// Crea e salva una nuova richiesta d'aiuto
exports.create = (req, res) => {
  // Validazione
  if (!req.body.desc) {
    res.status(400).send({ message: "La descrizione non può essere vuota!" });
    return;
  }

  // Creo una nuova richiesta
  const richiesta = new Richiesta({
    data: req.body.data,
    desc: req.body.desc,
  });

  // Salvo nel database
  richiesta
    .save(richiesta)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Uh oh, è successo qualcosa di strano mentre creavo Richiesta.",
      });
    });
};

exports.findAll = (req, res) => {
  Richiesta.find(true)
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
      err.message || "Qualcosa di strano è successo mentre cercavo le richieste."
    });
  });
};
