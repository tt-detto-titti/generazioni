const config = require('../config/matchmaker.config.js');

module.exports = (mongoose) => {
  return mongoose.model(
    'Richiesta',
    mongoose.Schema(
      {
        data: { type: Date, required: true },
        durata: { type: Number, required: true },
        descrizione: { type: String, required: true },
        categoria: { type: String, ref: 'CategoriaAiuto', required: true },
        stato: { type: String, enum: config.stati, default: 'in attesa' },
        id_anziano: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Utente',
          required: true
        },
        id_volontario: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Utente',
          default: null
        }
      },
      { collection: 'richieste_aiuto', timestamps: true }
    )
  );
};
