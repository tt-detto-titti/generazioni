const mongoose = require("mongoose");

const db = {};
mongoose.Promise = global.Promise;
db.mongoose = mongoose;

db.url = process.env.MONGODB_URL;
db.name = process.env.MONGODB_NAME;
db.user = process.env.MONGODB_USER;
db.pass = process.env.MONGODB_PASS;

db.categoria_aiuto = require("./categoria_aiuto.model.js")(mongoose);
db.richiesta = require("./richiesta.model.js")(mongoose);
db.ruolo = require("./ruolo.model.js")(mongoose);
db.utente = require("./utente.model.js")(mongoose);

module.exports = db;
