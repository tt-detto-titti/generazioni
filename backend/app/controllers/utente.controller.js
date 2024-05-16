exports.testTutti = (req, res) => {
  res.status(200).send("Contenuto pubblico.");
};

exports.testUtente = (req, res) => {
  res.status(200).send("Contenuto per utenti.");
};

exports.testAnziano = (req, res) => {
  res.status(200).send("Contenuto per anziani.");
};

exports.testVolontario = (req, res) => {
  res.status(200).send("Contenuto per volontari.");
};

exports.testSupervisore = (req, res) => {
  res.status(200).send("Contenuto per supervisori.");
};

exports.testAdmin = (req, res) => {
  res.status(200).send("Contenuto per admin.");
};
