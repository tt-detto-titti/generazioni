const db = require("../models");
const Richiesta = db.richiesta;
const Utente = db.utente;

// Crea e salva una nuova richiesta d'aiuto
exports.nuovaRichiesta = async (req, res) => {
  try {
    const utente = await Utente.findById(req.id_utente);
    if (!utente) {
      res.status(404).send({ message: "Utente non trovato!" });
      return;
    }

    const richiesta = new Richiesta({
      data: req.body.data,
      durata: req.body.durata,
      descrizione: req.body.descrizione,
      categoria: req.body.categoria,
      id_anziano: req.id_utente,
    });

    await richiesta.save();
    res.status(201).send({ message: "La richiesta è stata salvata correttamente." });
  } catch (err) {
    res
      .status(500)
      .send({ message: "Impossibile creare la richiesta: " + err });
  }
};
