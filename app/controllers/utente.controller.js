const db = require("../models");
const Utente = db.utenti;

// Crea e salva un nuovo utente
exports.signup = (req, res) => {
  const utente = new Utente({
    nome: req.body.nome,
    cognome: req.body.cognome,
    cf: req.body.cf,
    dataNascita: req.body.dataNascita,
    residenza: req.body.residenza,
    telefono: req.body.telefono,
    email: req.body.email,
    password: req.body.password,
    qualifica: ["utente"],
  });

  utente
    .save(utente)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Impossibile salvare l'utente: " + err.message,
      });
    });
};

// Verifica le credenziali di un utente
exports.login = (req, res) => {};
