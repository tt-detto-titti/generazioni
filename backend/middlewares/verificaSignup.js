const config = require('../config/auth.config.js');
const db = require('../models');
const Utente = db.utente;

const RUOLI = config.ruoli;

// Controlla che nel database non esista un utente con la stessa email
const controllaEmailDoppia = async (req, res, next) => {
  try {
    const utente = await Utente.findOne({ email: req.body.email });
    if (utente) {
      res.status(400).send({ message: "L'email è gia presente nel database!" });
      return;
    }

    next();
  } catch (err) {
    res.status(500).send({ message: err });
  }
};

// Controlla che nel database non esista un utente con lo stesso codice fiscale
const controllaCFDoppio = async (req, res, next) => {
  try {
    const utente = await Utente.findOne({ cf: req.body.cf });
    if (utente) {
      res.status(400).send({ message: 'Il codice fiscale è gia presente nel database!' });
      return;
    }

    next();
  } catch (err) {
    res.status(500).send({ message: err });
  }
};

// Controlla che nel database non esista un utente con lo stesso numero di telefono
const controllaTelefonoDoppio = async (req, res, next) => {
  try {
    const utente = await Utente.findOne({ telefono: req.body.telefono });
    if (utente) {
      res.status(400).send({
        message: 'Il numero di telefono è gia presente nel database!'
      });
      return;
    }

    next();
  } catch (err) {
    res.status(500).send({ message: err });
  }
};

// Controlla che i ruoli inseriti esistano
const controllaRuolo = (req, res, next) => {
  const ruoli = req.body.ruoli;
  if (ruoli) {
    for (let i = 0; i < ruoli.length; i++) {
      if (!RUOLI.includes(ruoli[i])) {
        res.status(400).send({
          message: `Il ruolo ${ruoli[i]} non esiste!`
        });
        return;
      }
    }
  }

  next();
};

const verificaSignup = {
  controllaEmailDoppia,
  controllaCFDoppio,
  controllaTelefonoDoppio,
  controllaRuolo
};

module.exports = verificaSignup;
