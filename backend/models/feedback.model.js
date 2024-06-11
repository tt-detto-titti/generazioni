const config = require('../config/feedback.config.js');

module.exports = (mongoose) => {
  return mongoose.model(
    'Feedback',
    mongoose.Schema(
      {
        id_utente: {
          //utente che effettua il feedback/segnalazione
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Utente',
          required: true
        },
        id_richiesta: {
          //richiesta di aiuto di cui si fa il feedback
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Richiesta',
          required: true
        },
        destinazione: {
          type: String,
          enum: config.destinazione_feedback,
          required: true
        },
        tipologia: {
          type: String,
          enum: config.tipologia_feedback,
          required: true
        },
        descrizione: { type: String, required: true }
      },
      { collection: 'feedback', timestamps: true }
    )
  );
};
