const config = require("../config/auth.config.js");
const db = require("../models/index.js");
const Utente = db.utente;
const Ruolo = db.ruolo;

// Usato per gestire i token di accesso
var jwt = require("jsonwebtoken");
// Usato per generare e controllare gli hash delle password
var bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  try {
    const utente = new Utente({
      nome: req.body.nome,
      cognome: req.body.cognome,
      cf: req.body.cf,
      dataNascita: req.body.dataNascita,
      residenza: req.body.residenza,
      telefono: req.body.telefono,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });

    utenteSalvato = await utente.save();

    // TODO non permettere a chiunque di registrarsi come admin lol
    if (req.body.ruoli) {
      utenteSalvato.ruoli = req.body.ruoli;
    } else {
      // Se non viene specificato un ruolo, viene assegnato "utente" di default
      utenteSalvato.ruoli = [{ _id: "utente" }];
    }

    await utenteSalvato.save();
    res
      .status(201)
      .send({ message: "L'utente è stato registrato correttamente." });
  } catch (err) {
    res.status(500).send({ message: err });
  }
};

exports.login = async (req, res) => {
  try {
    const utente = await Utente.findOne({ email: req.body.email });

    if (!utente) {
      return res.status(404).send({ message: "Utente non trovato!" });
    }

    // Verifica la password con l'hash
    const passwordValida = bcrypt.compareSync(
      req.body.password,
      utente.password
    );
    if (!passwordValida) {
      return res.status(401).send({
        accessToken: null,
        message: "Password non valida!",
      });
    }

    // Genera un token d'accesso
    const token = jwt.sign({ id: utente._id }, config.secret, {
      algorithm: "HS256",
      expiresIn: 86400, // 24 ore
    });

    res.status(200).send({
      id: utente._id,
      email: utente.email,
      ruoli: utente.ruoli,
      accessToken: token,
    });
  } catch (err) {
    res.status(500).send({ message: err });
  }
};
