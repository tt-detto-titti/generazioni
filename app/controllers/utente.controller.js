const db = require("../models");
const Utente = db.utenti;

// Crea e salva un nuovo utente
exports.signup = (req, res) => {
  // Validazione
  if (
    !req.body.nome ||
    !req.body.cognome ||
    !req.body.email ||
    !req.body.password
  ) {
    res.status(400).send({ message: "Tutti i campi sono obbligatori." });
  }

  const utente = new Utente({
    nome: req.body.nome,
    cognome: req.body.cognome,
    email: req.body.email,
    password: req.body.password,
  });

  utente
    .save(utente)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.statuss(500).send({
        message: err.message || "Impossibile salvare l'utente nel database.",
      });
    });
};

// Verifica le credenziali di un utente
exports.login = (req, res) => {};
