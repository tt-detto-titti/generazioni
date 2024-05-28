const db = require("../models");
const Disponibilita = db.disponibilita;
const Utente = db.utente;

// Crea e salva una nuova disponibilita d'aiuto
exports.nuovaDisponibilita = async (req, res) => {
  try {
    const utente = await Utente.findById(req.id_utente);
    if (!utente) {
      res.status(404).send({ message: "Utente non trovato!" });
      return;
    }

    const disponibilita = new Disponibilita({
      data: req.body.data,
      durata: req.body.durata, //rimossa descrizione
      categoria: req.body.categoria,
      id_volontario: req.id_utente, //ATTENZIONE: Controllare se questa parte ha senso
    });

    await disponibilita.save();
    res.status(201).send("La disponibilita è stata salvata correttamente.");
  } catch (err) {
    res
      .status(500)
      .send({ message: "Impossibile creare la disponibilità: " + err });
  }
};

exports.findAll = (req, res) => {
  Disponibilita.find(true)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Qualcosa di strano è successo mentre cercavo le disponibilità.",
      });
    });
};
