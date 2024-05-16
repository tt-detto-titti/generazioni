const config = require("../config/auth.config");

module.exports = (mongoose) => {
  const Ruolo = mongoose.model(
    "ruolo",
    mongoose.Schema(
      {
        _id: {
          type: String,
          enum: config.ruoli
        }
      },
      { collection: "ruoli" }
    )
  );

  return Ruolo;
};
