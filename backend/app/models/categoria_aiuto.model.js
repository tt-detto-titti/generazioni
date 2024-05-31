const config = require("../config/matchmaker.config.js");

module.exports = (mongoose) => {
  return mongoose.model(
    "CategoriaAiuto",
    mongoose.Schema(
      {
        _id: {
          type: String,
          enum: config.categorie_aiuto,
        },
      },
      { collection: "categorie_aiuto" },
    ),
  );
};
