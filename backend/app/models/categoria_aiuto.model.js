const config = require("../config/matchmaker.config.js");

module.exports = (mongoose) => {
  const CategoriaAiuto = mongoose.model(
    "categoria_aiuto",
    mongoose.Schema(
      {
        _id: {
          type: String,
          enum: config.categorie_aiuto,
        },
      },
      { collection: "categorie_aiuto" }
    )
  );

  return CategoriaAiuto;
};
