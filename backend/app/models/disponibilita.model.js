const config = require("../config/matchmaker.config.js");

module.exports = (mongoose) => {
  const Richiesta = mongoose.model(
    "disponibilita",
    mongoose.Schema(
      {
        data: { type: Date, required: true },
        durata: { type: Number, required: true },
        categoria: [{ type: String, ref: "CategoriaAiuto", required: true }],
        stato: { type: String, enum: config.stati, default: "in attesa" },
        id_volontario: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Utente",
          default: null,
        },
      },
      { collection: "disponibilita_aiuto", timestamps: true }, //IMPORTANTE: Controllare se dsiponibilita-aiuto esiste
    ),
  );

  return Richiesta;
};
