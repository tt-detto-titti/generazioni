const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const Utente = db.utente;
const Ruolo = db.ruolo;

const verificaToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "È necessario fornire un token!" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Non sei autorizzato!" });
    }
    req.id_utente = decoded.id;
    next();
  });
};

const controllaRuolo = (ruoloRichiesto) => {
  return async (req, res, next) => {
    try {
      const utente = await Utente.findById(req.id_utente);
      if (!utente) {
        res.status(404).send({ message: "Utente non trovato!" });
        return;
      }

      const ruoli = await Ruolo.find({ _id: { $in: utente.ruoli } });
      if (!ruoli) {
        res.status(404).send({ message: "Ruoli non trovati!" });
        return;
      }

      const haRuolo = ruoli.some((ruolo) => ruolo._id === ruoloRichiesto);
      if (haRuolo) {
        next();
      } else {
        res
          .status(403)
          .send({ message: `Richiede il ruolo di ${ruoloRichiesto}!` });
      }
    } catch (err) {
      res.status(500).send({ message: err });
    }
  };
};

const controllaAnziano = controllaRuolo("anziano");
const controllaVolontario = controllaRuolo("volontario");
const controllaSupervisore = controllaRuolo("supervisore");
const controllaAdmin = controllaRuolo("admin");

const authJwt = {
  verificaToken,
  controllaAnziano,
  controllaVolontario,
  controllaSupervisore,
  controllaAdmin,
};

module.exports = authJwt;
