module.exports = (mongoose) => {
  return mongoose.model(
    'Utente',
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
        anziano: {
          bio: { type: String, required: false },
          esigenze: { type: String, required: false }
        },
        ruoli: [
          {
            type: String,
            ref: 'Ruolo',
            required: true
          }
        ]
      },
      {
        collection: 'utenti'
      }
    )
  );
};
