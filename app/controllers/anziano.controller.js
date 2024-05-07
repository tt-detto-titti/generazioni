const db = require("../models");
const Anziano = db.anziani;
// Crea e salva un nuovo anziano
exports.create = (req, res) => {
  const anziano = new Anziano({
    bio: req.body.bio,
    esigenze: req.body.esigenze,
    qualifica: ["anziano"],
  });

  anziano
    .save(anziano)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.statuss(500).send({
        message: "Impossibile salvare l'anziano: " + err.message,
      });
    });
};
//L'anziano crea una nuova richiesta
