module.exports = (mongoose) => {
  const Utente = mongoose.model(
    "utente",
    mongoose.schema(
      {
        nome: String,
        cognome: String,
        email: String,
        password: String,
      },
      { timestamps: true }
    )
  );

  return Utente;
};
