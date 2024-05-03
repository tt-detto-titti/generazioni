module.exports = (mongoose) => {
  const Richiesta = mongoose.model(
    "richiesta",
    mongoose.Schema(
      {
        data: String,
        desc: String,
      },
      { timestamps: true }
    )
  );

  return Richiesta;
};
