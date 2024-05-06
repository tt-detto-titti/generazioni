module.exports = (mongoose) => {
  const Utente = mongoose.model(
    "utente",
    mongoose.Schema(
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
