const db = require("../models");
const Feedback = db.feedback;
const Richiesta = db.richiesta;
const Utente = db.utente;

exports.nuovoFeedback = async (req, res) => {
  try {
    const richiesta = await Richiesta.findById(req.params.id_richiesta);
    if (!richiesta) {
      res.status(404).send({ message: "Richiesta non trovata!" });
      return;
    }

    const utente = await Utente.findById(req.id_utente);
    if (!utente) {
      res.status(404).send({ message: "Utente non trovato!" });
      return;
    }

    const feedback = new Feedback({
      id_utente: utente._id,
      id_richiesta: richiesta._id,
      destinazione: "",
      tipologia: req.body.tipologia,
      descrizione: req.body.descrizione,
    });

    if (utente.ruoli.includes("anziano")) {
      feedback.destinazione = "per volontario";
    }
    if (utente.ruoli.includes("volontario")) {
      feedback.destinazione = "per anziano";
    }

    await feedback.save();
    res.status(201).send({ message: "Feedback salvato con successo." });
  } catch (err) {
    res
      .status(500)
      .send({ message: "Impossibile salvare il feedback: " + err });
  }
};
