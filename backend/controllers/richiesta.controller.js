const db = require('../models');
const Richiesta = db.richiesta;
const Utente = db.utente;

const yup = require('yup');

const schemaRichiesta = yup.object().shape({
  data: yup.date().min(new Date(), 'La data deve essere futura').required('È necessario inserire la data!'),
  durata: yup
    .number()
    .min(30, 'La durata minima è di 30 minuti')
    .max(180, 'La durata massima è di 180 minuti')
    .required('È necessario inserire la durata!'),
  descrizione: yup.string().required('È necessario inserire una descrizione!'),
  categoria: yup.string().required('È necessario inserire la categoria di aiuto!')
});

// Crea e salva una nuova richiesta d'aiuto
exports.nuovaRichiesta = async (req, res) => {
  try {
    await schemaRichiesta.validate({
      data: req.body.data,
      durata: req.body.durata,
      descrizione: req.body.descrizione,
      categoria: req.body.categoria
    });

    const utente = await Utente.findById(req.id_utente);
    if (!utente) {
      return res.status(404).send({ message: 'Utente non trovato!' });
    }

    const richiesta = new Richiesta({
      data: req.body.data,
      durata: req.body.durata,
      descrizione: req.body.descrizione,
      categoria: req.body.categoria,
      id_anziano: req.id_utente
    });

    await richiesta.save();
    return res.status(201).send({ message: 'La richiesta è stata salvata correttamente.' });
  } catch (err) {
    if (err instanceof yup.ValidationError) {
      return res.status(400).send({ message: err.message });
    }
    return res.status(500).send({ message: 'Impossibile creare la richiesta di aiuto: ' + err.message });
  }
};

// Restituisce tutte le richieste d'aiuto fatte da parte di una persona anziana
exports.trovaRichiesteAnziano = async (req, res) => {
  try {
    const richieste = await Richiesta.find({
      id_anziano: req.params.id_anziano
    });
    return res.status(200).send(richieste);
  } catch (err) {
    return res.status(500).send({ message: "Impossibile cercare le richieste d'aiuto: " + err.message });
  }
};

// Restituisce tutte le richieste d'aiuto per il futuro che sono ancora in attesa
exports.trovaRichiesteDisponibili = async (req, res) => {
  try {
    const richieste = await Richiesta.find({
      data: { $gte: new Date() },
      stato: 'in attesa'
    });
    return res.status(200).send(richieste);
  } catch (err) {
    return res.status(500).send({ message: "Impossibile cercare le richieste d'aiuto: " + err.message });
  }
};

// Restituisce tutte le richieste accettate da un volontario
exports.trovaRichiesteAccettate = async (req, res) => {
  try {
    const richieste = await Richiesta.find({
      id_volontario: req.params.id_volontario
    });
    return res.status(200).send(richieste);
  } catch (err) {
    return res.status(500).send({ message: "Impossibile cercare le richieste d'aiuto: " + err.message });
  }
};

// Accetta una richiesta d'aiuto
exports.accettaRichiesta = async (req, res) => {
  try {
    const richiesta = await Richiesta.findById(req.params.id_richiesta);
    if (!richiesta) {
      return res.status(404).send({ message: 'Richiesta non trovata!' });
    }

    richiesta.stato = 'accettata';
    richiesta.id_volontario = req.id_utente;
    await richiesta.save();

    return res.status(200).send({ message: 'La richiesta è stata accettata correttamente.' });
  } catch (err) {
    return res.status(500).send({ message: 'Impossibile accettare la richiesta di aiuto: ' + err.message });
  }
};
