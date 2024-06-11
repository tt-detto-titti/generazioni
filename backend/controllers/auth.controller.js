const config = require('../config/auth.config.js');
const db = require('../models');
const Utente = db.utente;

// Usato per gestire i token di accesso
const jwt = require('jsonwebtoken');
// Usato per generare e controllare gli hash delle password
const bcrypt = require('bcryptjs');
// Usato per validare i valori inseriti
const yup = require('yup');

const schemaSignUp = yup.object().shape({
  nome: yup
    .string()
    .required('È necessario inserire il nome!')
    .max(25, 'Sono consentiti al massimo 25 caratteri per il nome.'),
  cognome: yup
    .string()
    .required('È necessario inserire il cognome!')
    .max(25, 'Sono consentiti al massimo 25 caratteri per il cognome.'),
  cf: yup.string().required('È necessario inserire il Codice Fiscale!').length(16, 'Codice Fiscale non corretto.'),
  residenza: yup
    .string()
    .required("È necessario inserire l'indirizzo di residenza!")
    .max(50, 'Sono consentiti al massimo 50 caratteri per la residenza.'),
  dataNascita: yup
    .date()
    .required('È necessario inserire la data di nascita!')
    .max(new Date(Date.now() - 567648000000), 'Devi essere almeno maggiorenne.')
    .min(new Date(1900, 0, 1), 'Non sei Matusalemme.'),
  email: yup.string().required("È necessario inserire l'email!").email('Email non valida.'),
  telefono: yup.string().required('È necessario inserire il numero di telefono!'),
  password: yup
    .string()
    .required('È necessario inserire la password!')
    .min(8, "La password dev'essere lunga almeno 8 caratteri.")
    .max(32, "La password dev'essere lunga al massimo 32 caratteri.")
});

const schemaLogin = yup.object().shape({
  email: yup.string().required("È necessario inserire l'email!").email('Email non valida.'),
  password: yup.string().required('È necessario inserire la password!')
});

exports.signup = async (req, res) => {
  try {
    await schemaSignUp.validate({
      nome: req.body.nome,
      cognome: req.body.cognome,
      cf: req.body.cf,
      dataNascita: req.body.dataNascita,
      residenza: req.body.residenza,
      telefono: req.body.telefono,
      email: req.body.email,
      password: req.body.password
    });

    const utente = new Utente({
      nome: req.body.nome,
      cognome: req.body.cognome,
      cf: req.body.cf,
      dataNascita: req.body.dataNascita,
      residenza: req.body.residenza,
      telefono: req.body.telefono,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8)
    });

    // TODO non permettere a chiunque di registrarsi come admin lol
    if (req.body.ruoli) {
      utente.ruoli = req.body.ruoli;
    } else {
      // Se non viene specificato un ruolo, viene assegnato "utente" di default
      utente.ruoli = [{ _id: 'utente' }];
    }

    await utente.save();
    res.status(201).send({ message: "L'utente è stato registrato correttamente." });
  } catch (err) {
    if (err instanceof yup.ValidationError) {
      return res.status(400).send({ message: err.message });
    }
    res.status(500).send({ message: "Impossibile registrare l'utente: " + err.message });
  }
};

exports.login = async (req, res) => {
  try {
    await schemaLogin.validate({
      email: req.body.email,
      password: req.body.password
    });

    const utente = await Utente.findOne({ email: req.body.email });
    if (!utente) {
      return res.status(404).send({ message: 'Utente non trovato!' });
    }

    // Verifica la password tramite l'hash
    const passwordValida = bcrypt.compareSync(req.body.password, utente.password);
    if (!passwordValida) {
      return res.status(401).send({
        accessToken: null,
        message: 'Password non valida!'
      });
    }

    // Genera un token d'accesso
    const token = jwt.sign({ id: utente._id }, config.JWT_SECRET, {
      algorithm: 'HS256',
      expiresIn: 86400
    });

    res.status(200).send({
      id: utente._id,
      nome: utente.nome,
      cognome: utente.cognome,
      email: utente.email,
      ruoli: utente.ruoli,
      accessToken: token
    });
  } catch (err) {
    if (err instanceof yup.ValidationError) {
      return res.status(400).send({ message: err.message });
    }
    res.status(500).send({ message: 'Impossibile effettuare il login: ' + err.message });
  }
};
