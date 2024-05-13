const config = require("../config/auth.config.js");
const db = require("../models");
const RUOLI = config.ruoli;
const Utente = db.utente;

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

// Controlla che i ruoli inseriti esistano
const controllaRuolo = (req, res, next) => {
  const ruoli = req.body.ruoli;

  if (ruoli) {
    for (let i = 0; i < ruoli.length; i++) {
      if (!RUOLI.includes(ruoli[i])) {
        res.status(400).send({
          message: `Il ruolo ${ruoli[i]} non esiste!`,
        });
        return;
      }
    }
  }

  next();
};

const verificaSignup = {
  controllaEmailDoppia,
  controllaRuolo,
};

module.exports = verificaSignup;
