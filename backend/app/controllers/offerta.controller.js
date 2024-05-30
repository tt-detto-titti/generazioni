const db = require("../models");
const Offerta = db.offerta;
const Utente = db.utente;

// Crea e salva una nuova offerta d'aiuto
exports.nuovaOfferta = async (req, res) => {
  try {
    const utente = await Utente.findById(req.id_utente);
    if (!utente) {
      res.status(404).send({ message: "Utente non trovato!" });
      return;
    }

    const offerta = new Offerta({
      data: req.body.data,
      durata: req.body.durata,
      categorie: req.body.categorie,
      id_volontario: req.id_utente,
    });

    await offerta.save();
    res.status(201).send({ message: "L'offerta di aiuto è stata salvata correttamente." });
  } catch (err) {
    res.status(500).send({
      message: "Impossibile creare l'offerta di aiuto: " + err.message,
    });
  }
};

// Restituisce tutte le offerte future che sono ancora in attesa
exports.trovaOfferteDisponibili = async (req, res) => {
  try {
    const offerte = await Offerta.find({
      data: { $gte: new Date() },
      stato: "in attesa",
    });
    res.status(200).send(offerte);
  } catch (err) {
    res.status(500).send({
      message: "Impossibile cercare le offerte d'aiuto: " + err.message,
    });
  }
};

// Restituisce tutte le offerte fatte da un volontario
exports.trovaOfferteVolontario = async (req, res) => {
  try {
    const offerte = await Offerta.find({ id_volontario: req.params.id_volontario });
    res.status(200).send(offerte);
  } catch (err) {
    res.status(500).send({
      message: "Impossibile cercare le offerte d'aiuto: " + err.message,
    });
  }
}