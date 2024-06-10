module.exports = {
  JWT_SECRET: process.env.JWT_SECRET,
  SCADENZA_TOKEN: process.env.SCADENZA_TOKEN,
  ruoli: ["utente", "anziano", "volontario", "supervisore", "admin"],
  ruoloDefault: "utente",
};
