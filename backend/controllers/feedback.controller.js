const db = require('../models');
const Feedback = db.feedback;
const Richiesta = db.richiesta;
const Utente = db.utente;

const yup = require('yup');

const schemaFeedback = yup.object().shape({
  tipologia: yup.string().required('È necessario inserire la tipologia!'),
  descrizione: yup.string().required('È necessario inserire la descrizione!')
});

exports.nuovoFeedback = async (req, res) => {
  try {
    await schemaFeedback.validate({
      tipologia: req.body.tipologia,
      descrizione: req.body.descrizione
    });

    const richiesta = await Richiesta.findById(req.params.id_richiesta);
    if (!richiesta) {
      return res.status(404).send({ message: 'Richiesta non trovata!' });
    }

    const utente = await Utente.findById(req.id_utente);
    if (!utente) {
      return res.status(404).send({ message: 'Utente non trovato!' });
    }

    const feedback = new Feedback({
      id_utente: utente._id,
      id_richiesta: richiesta._id,
      destinazione: '',
      tipologia: req.body.tipologia,
      descrizione: req.body.descrizione
    });

    if (utente.ruoli.includes('anziano')) {
      feedback.destinazione = 'per volontario';
    }
    if (utente.ruoli.includes('volontario')) {
      feedback.destinazione = 'per anziano';
    }

    await feedback.save();
    return res.status(201).send({ message: 'Feedback salvato con successo.' });
  } catch (err) {
    if (err instanceof yup.ValidationError) {
      return res.status(400).send({ message: err.message });
    }
    return res.status(500).send({ message: 'Impossibile salvare il feedback: ' + err });
  }
};
