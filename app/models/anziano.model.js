module.exports = (mongoose) => {
  const Anziano = mongoose.model(
    "anziano",
    mongoose.Schema(
      {
        bio: { type: String, required: true },
        esigenze: { type: String, required: true },
        qualifica: ["anziano"], //non sono sicuro che questa parte sia giusta
      },
      {
        collection: "anziani",
        autoCreate: false,
      }
    )
  );

  return Anziano;
};
