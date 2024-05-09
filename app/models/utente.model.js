module.exports = (mongoose) => {
  const Utente = mongoose.model(
    "utente",
    mongoose.Schema(
      {
        nome: { type: String, required: true },
        cognome: { type: String, required: true },
        cf: { type: String, required: true, unique: true },
        dataNascita: { type: Date, required: true },
        residenza: { type: String, required: true },
        telefono: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        qualifica: {
          type: [String],
          enum: ["utente", "anziano", "volontario", "anziano volontario"],
        },
        //Campi specifici per Anziano
        anziano: {
          bio: { type: String, required: false },
          esigenze: { type: String, required: false },
        }
      },
      {
        collection: "utenti",
        autoCreate: false,
      }
    )
  );

  return Utente;
};
