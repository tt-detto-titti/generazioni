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

        if(req.body.ruoli === "anziano") {
            const feedback = new Feedback({
                id_utente: utente._id,
                id_richiesta: richiesta._id,
                destinazione: "per volontario",
                tipologia: req.body.tipologia,
                descrizione: req.body.descrizione,
            });
            await feedback.save();
            res.send(feedback);
        }

        if(req.body.ruoli === "volontario") {
            const feedback = new Feedback({
                id_utente: utente._id,
                id_richiesta: richiesta._id,
                destinazione: "per anziano",
                tipologia: req.body.tipologia,
                descrizione: req.body.descrizione,
            });
            await feedback.save();
            res.send(feedback);
        }

    } catch (err) {
        res.status(500).send({ message: err });
    }
}