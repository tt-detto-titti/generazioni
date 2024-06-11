const db = require("../models");
const Offerta = db.offerta;
const Utente = db.utente;

const yup = require('yup');

const schemaOfferta = yup.object().shape({
  data: yup
    .date()
    .min(new Date(), "La data deve essere nel futuro.")
    .required("È necessario inserire la data!"),
  ora: yup.string().required("È necessario inserire l'ora!"),
  durata: yup
    .number()
    .min(30, "La durata minima è di 30 minuti!")
    .max(180, "La durata massima è di 180 minuti!")
    .required("È necessario inserire la durata!"),
  categorie: yup
    .array()
    .of(yup.string())
    .min(1, "È necessario selezionare almeno una categoria!"),
})

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
    res
      .status(201)
      .send({ message: "L'offerta di aiuto è stata salvata correttamente." });
  } catch (err) {
    res
      .status(500)
      .send({ message: "Impossibile creare l'offerta di aiuto: " + err.message });
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
    res
      .status(500)
      .send({ message: "Impossibile cercare le offerte d'aiuto: " + err.message });
  }
};

// Restituisce tutte le offerte fatte da un volontario
exports.trovaOfferteVolontario = async (req, res) => {
  try {
    const offerte = await Offerta.find({
      id_volontario: req.params.id_volontario,
    });
    res.status(200).send(offerte);
  } catch (err) {
    res
      .status(500)
      .send({ message: "Impossibile cercare le offerte d'aiuto: " + err.message });
  }
};
