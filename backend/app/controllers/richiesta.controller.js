const db = require('../models');
const Richiesta = db.richiesta;
const Utente = db.utente;
const ServizioMatchmaker = require('../services/matchmaker.service.js');
const ServizioEmail = require('../services/email.service.js');

// Crea e salva una nuova richiesta d'aiuto
exports.nuovaRichiesta = async (req, res) => {
  try {
    const utente = await Utente.findById(req.id_utente);
    if (!utente) {
      res.status(404).send({ message: 'Utente non trovato!' });
      return;
    }

    const richiesta = new Richiesta({
      data: req.body.data,
      durata: req.body.durata,
      descrizione: req.body.descrizione,
      categoria: req.body.categoria,
      id_anziano: req.id_utente
    });

    await richiesta.save();

    // Controlla la presenza di match disponibili
    const offerte = await ServizioMatchmaker.controllaMatchRichiesta(richiesta);
    // Invia una email se è stato trovato un match
    offerte.forEach((offerta) => {
      ServizioEmail.inviaNotificaMatch(offerta.id_volontario.email, [richiesta]);
    })

    res.status(201).send({ message: 'La richiesta è stata salvata correttamente.' });
  } catch (err) {
    res.status(500).send({ message: 'Impossibile creare la richiesta di aiuto: ' + err.message });
  }
};

// Restituisce tutte le richieste d'aiuto fatte da parte di una persona anziana
exports.trovaRichiesteAnziano = async (req, res) => {
  try {
    const richieste = await Richiesta.find({
      id_anziano: req.params.id_anziano
    });
    res.status(200).send(richieste);
  } catch (err) {
    res.status(500).send({ message: "Impossibile cercare le richieste d'aiuto: " + err.message });
  }
};

// Restituisce tutte le richieste d'aiuto per il futuro che sono ancora in attesa
exports.trovaRichiesteDisponibili = async (req, res) => {
  try {
    const richieste = await Richiesta.find({
      data: { $gte: new Date() },
      stato: 'in attesa'
    });
    res.status(200).send(richieste);
  } catch (err) {
    res.status(500).send({ message: "Impossibile cercare le richieste d'aiuto: " + err.message });
  }
};

// Restituisce tutte le richieste accettate da un volontario
exports.trovaRichiesteAccettate = async (req, res) => {
  try {
    const richieste = await Richiesta.find({
      id_volontario: req.params.id_volontario
    });
    res.status(200).send(richieste);
  } catch (err) {
    res.status(500).send({ message: "Impossibile cercare le richieste d'aiuto: " + err.message });
  }
};

// Accetta una richiesta d'aiuto
exports.accettaRichiesta = async (req, res) => {
  try {
    const richiesta = await Richiesta.findById(req.params.id_richiesta);
    if (!richiesta) {
      res.status(404).send({ message: 'Richiesta non trovata!' });
      return;
    }

    richiesta.stato = 'accettata';
    richiesta.id_volontario = req.id_utente;
    await richiesta.save();

    res.status(200).send({ message: 'La richiesta è stata accettata correttamente.' });
  } catch (err) {
    res.status(500).send({ message: 'Impossibile accettare la richiesta di aiuto: ' + err.message });
  }
};
