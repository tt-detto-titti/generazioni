const config = require('../config/matchmaker.config.js');

module.exports = (mongoose) => {
  return mongoose.model(
    'Offerta',
    mongoose.Schema(
      {
        data: { type: Date, required: true },
        durata: { type: Number, required: true },
        categorie: [{ type: String, ref: 'CategoriaAiuto', required: true }],
        stato: { type: String, enum: config.stati, default: 'in attesa' },
        id_volontario: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Utente',
          required: true
        }
      },
      { collection: 'offerte_aiuto', timestamps: true }
    )
  );
};
